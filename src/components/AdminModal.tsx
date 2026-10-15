import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Download, Copy, Check, Database, RefreshCw, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { UserAnswer } from './StageQuestionnaire';

interface SubmissionData {
  sessionId: string;
  respondent: string;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string | null;
  totalQuestions: number;
  answeredCount: number;
  isComplete: boolean;
  answers: UserAnswer[];
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  localAnswers: Record<number, UserAnswer>;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  localAnswers,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'answers' | 'raw_json'>('answers');

  // Fetch submissions from backend database
  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/answers');
      if (res.ok) {
        const data = await res.json();
        if (data.submissions && Array.isArray(data.submissions)) {
          setSubmissions(data.submissions);
          if (data.submissions.length > 0 && !selectedSessionId) {
            setSelectedSessionId(data.submissions[0].sessionId);
          }
        }
      }
    } catch (e) {
      console.warn('Could not fetch server answers, using local cache:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        // Fallback check for local quick authentication
        if (username === 'admin' && (password === 'tassa2025' || password === 'tassa')) {
          setIsAuthenticated(true);
        } else {
          setErrorMsg(data.error || 'Invalid credentials. Password is: tassa');
        }
      }
    } catch {
      // Offline fallback
      if (username === 'admin' && (password === 'tassa2025' || password === 'tassa')) {
        setIsAuthenticated(true);
      } else {
        setErrorMsg('Invalid username or password. (Hint: admin / tassa)');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAutoFill = () => {
    setUsername('admin');
    setPassword('tassa');
    setErrorMsg('');
  };

  // Determine active answers to display
  const activeSubmission = submissions.find((s) => s.sessionId === selectedSessionId);
  const currentAnswers: UserAnswer[] =
    activeSubmission?.answers ||
    Object.values(localAnswers).sort((a, b) => a.questionId - b.questionId);

  // Copy summary to clipboard
  const handleCopySummary = () => {
    if (!currentAnswers || currentAnswers.length === 0) return;

    let text = `👑 KHADIJA'S BIRTHDAY REFLECTIONS - RESPONSES\n`;
    text += `Recorded: ${new Date().toLocaleString()}\n`;
    text += `Total Questions: ${currentAnswers.length} / 15\n\n`;
    text += `==============================================\n\n`;

    currentAnswers.forEach((ans) => {
      text += `Question #${ans.questionId}:\n${ans.question}\n`;
      text += `Chosen Answer: [Option ${ans.optionKey}] - ${ans.optionText}\n`;
      text += `Time: ${new Date(ans.answeredAt).toLocaleTimeString()}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download raw JSON
  const handleDownloadJSON = () => {
    const exportData = {
      title: "Khadija's Birthday Reflection Responses",
      exportedAt: new Date().toISOString(),
      activeSubmission: activeSubmission || { answers: currentAnswers },
      allSubmissions: submissions,
      localAnswersBackup: localAnswers,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `khadija_answers_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearServerData = async () => {
    if (!confirm('Are you sure you want to clear saved responses from data/answers.json?')) return;
    try {
      await fetch('/api/answers', { method: 'DELETE' });
      setSubmissions([]);
      setSelectedSessionId('');
    } catch (err) {
      console.error('Failed to clear', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg bg-zinc-950 border border-purple-900/60 rounded-3xl shadow-[0_0_50px_rgba(147,51,234,0.3)] overflow-hidden flex flex-col max-h-[92vh] text-left"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-purple-950/80 bg-gradient-to-r from-purple-950/40 via-zinc-950 to-black flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-1.5">
                <span>Creator Access & Database</span>
                {isAuthenticated && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
              </h3>
              <p className="text-[11px] font-mono text-zinc-500">
                data/answers.json
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {!isAuthenticated ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4 py-3">
              <div className="text-center space-y-1 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-800/40 text-purple-400 flex items-center justify-center mx-auto mb-2 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-cinzel text-lg font-bold text-white">
                  Enter Password
                </h4>
                <p className="text-xs text-zinc-400">
                  Access the responses that Khadija selected for her 15 birthday reflections.
                </p>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-800/80 text-purple-300 text-xs text-center font-mono">
                  {errorMsg}
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 focus:border-purple-600 focus:outline-none text-white text-sm font-mono"
                    placeholder="admin"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 focus:border-purple-600 focus:outline-none text-white text-sm font-mono"
                    placeholder="Enter password (e.g. tassa)"
                    required
                  />
                </div>
              </div>

              {/* Convenience Credentials Helper */}
              <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/60 flex items-center justify-between text-xs">
                <div className="text-zinc-400">
                  <span>Default Key: </span>
                  <span className="font-mono text-purple-400 font-semibold">admin / tassa</span>
                </div>
                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-900/40 text-purple-300 hover:bg-purple-900/60 transition text-[11px] font-mono"
                >
                  Quick Fill
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-800 to-purple-950 border border-purple-600/80 hover:border-purple-500 text-white font-cinzel text-xs tracking-widest uppercase font-bold transition shadow-[0_0_25px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Checking...</span>
                ) : (
                  <>
                    <span>Unlock Responses</span>
                    <ArrowRight className="w-4 h-4 text-purple-300" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Authenticated Answers & Database View */
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab('answers')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                      activeTab === 'answers'
                        ? 'bg-purple-900 text-white font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Question Cards
                  </button>
                  <button
                    onClick={() => setActiveTab('raw_json')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                      activeTab === 'raw_json'
                        ? 'bg-purple-900 text-white font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Raw JSON DB
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={fetchSubmissions}
                    className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                    title="Refresh from server"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={handleCopySummary}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono transition border border-zinc-800"
                    title="Copy formatted text"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleDownloadJSON}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-950 border border-purple-800/60 hover:bg-purple-900/60 text-purple-200 text-xs font-mono transition"
                    title="Download JSON"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>JSON</span>
                  </button>
                </div>
              </div>

              {/* Submissions selector if multiple sessions */}
              {submissions.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <span className="text-zinc-500 font-mono text-[11px] shrink-0">Sessions:</span>
                  {submissions.map((sub, i) => (
                    <button
                      key={sub.sessionId}
                      onClick={() => setSelectedSessionId(sub.sessionId)}
                      className={`px-2.5 py-1 rounded-lg border font-mono text-[11px] whitespace-nowrap transition ${
                        sub.sessionId === selectedSessionId
                          ? 'bg-purple-900/80 border-purple-500 text-white'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      Session #{submissions.length - i} ({sub.answeredCount}/15)
                    </button>
                  ))}
                </div>
              )}

              {/* Overview Card */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Completed</span>
                  <span className="text-base font-bold text-purple-400 font-mono">
                    {currentAnswers.length} / 15
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Person</span>
                  <span className="text-xs font-medium text-zinc-200 block truncate">
                    Khadija (tassa)
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Status</span>
                  <span className="text-xs font-medium text-emerald-400 flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Live Saved
                  </span>
                </div>
              </div>

              {/* Main Content Area */}
              {activeTab === 'answers' ? (
                <div className="space-y-3">
                  {currentAnswers.length === 0 ? (
                    <div className="text-center py-8 text-zinc-500 text-xs font-mono">
                      No answers recorded yet in this session. Once Khadija chooses an answer, it will appear here in real-time.
                    </div>
                  ) : (
                    currentAnswers.map((ans) => (
                      <div
                        key={ans.questionId}
                        className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-2 hover:border-purple-900/60 transition"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-purple-400 font-semibold">
                            Question #{ans.questionId}
                          </span>
                          <span className="text-zinc-500">
                            {ans.answeredAt ? new Date(ans.answeredAt).toLocaleTimeString() : ''}
                          </span>
                        </div>

                        <p className="text-xs text-zinc-300 font-serif leading-snug">
                          {ans.question}
                        </p>

                        <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-900/40 flex items-start gap-2.5">
                          <span className="w-6 h-6 rounded-md bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                            {ans.optionKey}
                          </span>
                          <p className="text-xs text-purple-100 font-medium leading-relaxed pt-0.5">
                            {ans.optionText}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* Raw JSON display */
                <div className="relative">
                  <pre className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-purple-300 font-mono text-[11px] overflow-x-auto max-h-[350px] leading-relaxed">
                    {JSON.stringify(
                      {
                        description: "Khadija's Birthday Reflection Responses",
                        activeSession: activeSubmission || { answers: currentAnswers },
                        allSubmissions: submissions,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              )}

              {/* Danger Zone */}
              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
                <span>Database File: <code className="text-zinc-400 font-mono">data/answers.json</code></span>
                <button
                  onClick={handleClearServerData}
                  className="flex items-center gap-1 text-zinc-500 hover:text-purple-400 transition"
                  title="Clear all stored answers"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear DB</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

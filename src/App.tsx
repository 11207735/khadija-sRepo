/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Lock, Heart } from 'lucide-react';
import { PhoneGuard } from './components/PhoneGuard';
import { AmbientBackground } from './components/AmbientBackground';
import { StageGreeting } from './components/StageGreeting';
import { StageIntroduction } from './components/StageIntroduction';
import { StageQuestionnaire, UserAnswer } from './components/StageQuestionnaire';
import { StageOutro } from './components/StageOutro';
import { AdminModal } from './components/AdminModal';

type StageType = 'greeting' | 'intro' | 'questions' | 'outro';

const STORAGE_KEY = 'khadija_birthday_reflections_v1';
const SESSION_KEY = 'khadija_birthday_session_id';

export default function App() {
  const [stage, setStage] = useState<StageType>('greeting');
  const [answers, setAnswers] = useState<Record<number, UserAnswer>>({});
  const [sessionId, setSessionId] = useState<string>('');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isSavedOnServer, setIsSavedOnServer] = useState<boolean>(false);

  // Initialize session and restore saved progress if available
  useEffect(() => {
    let existingSession = localStorage.getItem(SESSION_KEY);
    if (!existingSession) {
      existingSession = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      localStorage.setItem(SESSION_KEY, existingSession);
    }
    setSessionId(existingSession);

    const savedAnswers = localStorage.getItem(STORAGE_KEY);
    if (savedAnswers) {
      try {
        const parsed = JSON.parse(savedAnswers);
        if (parsed && typeof parsed === 'object') {
          setAnswers(parsed);
          // If all 15 already done in previous run, allow user to resume or review
          if (Object.keys(parsed).length >= 15) {
            // Keep on greeting or outro if completed
          }
        }
      } catch (e) {
        console.error('Failed to parse cached answers', e);
      }
    }
  }, []);

  // Save answer locally & sync to server database (data/answers.json)
  const handleAnswerSelected = async (answer: UserAnswer) => {
    const updated = {
      ...answers,
      [answer.questionId]: answer,
    };
    setAnswers(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Send to backend API
    try {
      const answersList = Object.values(updated).sort((a, b) => a.questionId - b.questionId);
      const res = await fetch('/api/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId || 'default_session',
          respondent: 'Khadija (tassa)',
          answers: answersList,
          totalQuestions: 15,
          completedAt: answersList.length >= 15 ? new Date().toISOString() : null,
        }),
      });

      if (res.ok) {
        setIsSavedOnServer(true);
      }
    } catch (err) {
      console.warn('Network sync pending; saved in local storage', err);
    }
  };

  return (
    <PhoneGuard>
      <div className="min-h-screen w-full bg-[#050304] text-white flex flex-col justify-between relative overflow-x-hidden select-none">
        {/* Cinematic Ambient Atmosphere */}
        <AmbientBackground />

        {/* Minimal Subtle Header with Discreet Admin Lock */}
        <header className="relative z-20 w-full px-5 py-3 flex items-center justify-between text-xs border-b border-purple-950/40 bg-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span className="font-cinzel tracking-wider text-[11px] text-zinc-300 font-semibold">
              Khadija's Reflection
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Creator / Admin Login Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-1.5 rounded-lg bg-zinc-950/80 border border-purple-950/70 hover:border-purple-600 text-zinc-400 hover:text-purple-300 transition shadow-[0_0_10px_rgba(168,85,247,0.2)]"
              title="Creator Login & Answers Database"
            >
              <Lock className="w-3.5 h-3.5 text-purple-400" />
            </button>
          </div>
        </header>

        {/* Main Stages with Fluid Page-like Transitions */}
        <main className="flex-1 flex flex-col relative z-10">
          <AnimatePresence mode="wait">
            {stage === 'greeting' && (
              <StageGreeting
                key="greeting"
                onNext={() => setStage('intro')}
              />
            )}

            {stage === 'intro' && (
              <StageIntroduction
                key="intro"
                onStart={() => setStage('questions')}
                onBack={() => setStage('greeting')}
              />
            )}

            {stage === 'questions' && (
              <StageQuestionnaire
                key="questions"
                answers={answers}
                onAnswerSelected={handleAnswerSelected}
                onComplete={() => setStage('outro')}
                onExit={() => setStage('intro')}
              />
            )}

            {stage === 'outro' && (
              <StageOutro
                key="outro"
                answers={answers}
                onOpenAdmin={() => setIsAdminOpen(true)}
                onReviewAnswers={() => setStage('questions')}
              />
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Intimate Signature */}
        <footer className="relative z-10 w-full py-2.5 px-4 text-center border-t border-purple-950/30 bg-black/50 text-[10px] text-zinc-600 font-mono flex items-center justify-between">
          <span className="text-zinc-500">tassa • birthday special</span>
          <span className="flex items-center gap-1 text-purple-400/80">
            <span>crafted with deep emotion</span>
            <Heart className="w-2.5 h-2.5 fill-purple-500 text-purple-500 inline" />
          </span>
        </footer>

        {/* Admin / Creator Database JSON Modal */}
        <AdminModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          localAnswers={answers}
        />
      </div>
    </PhoneGuard>
  );
}

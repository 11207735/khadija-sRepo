import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, CheckCheck, Copy, Check } from 'lucide-react';
import { UserAnswer } from './StageQuestionnaire';

interface StageOutroProps {
  answers: Record<number, UserAnswer>;
  onOpenAdmin?: () => void;
  onReviewAnswers?: () => void;
}

export const StageOutro: React.FC<StageOutroProps> = ({
  answers,
}) => {
  const [isCandleBlown, setIsCandleBlown] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const totalAnswered = Object.keys(answers).length;

  const handleBlowCandle = () => {
    if (!isCandleBlown) {
      setIsCandleBlown(true);
    }
  };

  const getFormattedAnswers = () => {
    const sorted = Object.values(answers).sort((a, b) => a.questionId - b.questionId);
    let text = `👑 Khadija's Birthday Reflection Answers (October 16):\n\n`;
    sorted.forEach((item) => {
      text += `Q${item.questionId}: ${item.question}\n`;
      text += `Chosen: [${item.optionKey}] ${item.optionText}\n\n`;
    });
    text += `~ on_abdelilah ~`;
    return text;
  };

  const handleCopyAnswers = async () => {
    const text = getFormattedAnswers();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-1 flex flex-col justify-between py-8 px-5 sm:px-6 max-w-md mx-auto w-full text-center relative z-10 min-h-[92vh] overflow-hidden"
    >
      {/* Deep royal purple atmospheric tint and edge gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050208]/85 via-[#23063f]/30 to-[#050208]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15)_0%,transparent_60%,#050208_90%)]" />
      </div>

      {/* Top Status Indicator */}
      <div className="pt-2 flex flex-col items-center relative z-10">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-purple-300 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/60 backdrop-blur-md flex items-center gap-1.5 shadow-[0_0_15px_rgba(147,51,234,0.3)]">
          <CheckCheck className="w-3.5 h-3.5 text-purple-300" />
          <span>{isCandleBlown ? 'Completed' : 'Final Moment'}</span>
        </span>
      </div>

      {/* Center Section: Candle in the middle */}
      <div className="my-auto py-6 flex flex-col items-center justify-center relative z-10 w-full">
        {/* The Birthday Candle */}
        <div
          className="relative mb-6 cursor-pointer select-none flex flex-col items-center"
          onClick={handleBlowCandle}
        >
          <div className="w-24 h-32 flex flex-col items-center justify-end relative">
            {/* Candle Flame with Purple/Amber Aura */}
            <AnimatePresence>
              {!isCandleBlown ? (
                <div className="w-6 h-9 rounded-full bg-gradient-to-t from-purple-600 via-amber-300 to-amber-100 animate-flame mb-1 relative">
                  <div className="absolute inset-0 rounded-full bg-amber-300 blur-[2px] opacity-80" />
                  <div className="absolute -inset-2.5 rounded-full bg-purple-500/35 blur-[10px]" />
                </div>
              ) : (
                <div className="w-1.5 h-8 bg-purple-300/50 blur-[1px] rounded-full mb-1 opacity-70 transition-opacity duration-1000" />
              )}
            </AnimatePresence>

            {/* Candle Wick */}
            <div className="w-0.5 h-2.5 bg-zinc-800" />

            {/* Candle Body */}
            <div className="w-12 h-20 rounded-t-sm rounded-b-md bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 border border-purple-700/60 shadow-[0_0_25px_rgba(147,51,234,0.4)] relative overflow-hidden flex flex-col justify-between p-1.5">
              <div className="w-full h-1 bg-purple-500/40 rounded-full" />
              <div className="text-[9px] font-mono tracking-widest text-purple-300/90 uppercase text-center font-semibold">
                KHADIJA
              </div>
              <div className="w-full h-1 bg-purple-950/80 rounded-full" />
            </div>

            {/* Candle Dish */}
            <div className="w-20 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 -mt-1 shadow-lg" />
          </div>

          {/* If candle not blown yet: show prompt and primary blow button */}
          {!isCandleBlown && (
            <div className="flex flex-col items-center mt-5 space-y-3">
              <p className="font-playfair italic text-xs text-purple-300/80 tracking-wide">
                Make a silent wish for your new year...
              </p>

              <button
                onClick={handleBlowCandle}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-800 via-purple-900 to-black border border-purple-500/70 hover:border-purple-400 text-white font-cinzel text-xs tracking-widest uppercase font-semibold transition-all duration-200 active:scale-98 shadow-[0_0_25px_rgba(147,51,234,0.45)] flex items-center gap-2 cursor-pointer"
              >
                <Wind className="w-4 h-4 text-purple-300" />
                <span>Tap to blow out candle</span>
              </button>
            </div>
          )}
        </div>

        {/* Revealed ONLY after she taps to blow out the candle */}
        <AnimatePresence>
          {isCandleBlown && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
              className="space-y-4 max-w-sm mt-2"
            >
              {/* The requested message */}
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-fuchsia-300 leading-relaxed px-1 drop-shadow-[0_2px_15px_rgba(147,51,234,0.5)]">
                "That's it, Khadija. I know it's not a gift, but I needed to know some facts haha"
              </h2>

              <div className="w-14 h-0.5 bg-gradient-to-r from-transparent via-purple-600 to-transparent mx-auto" />

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light drop-shadow-sm px-2">
                Thank you for answering every question so honestly. Every response has been preserved as a quiet keepsake of this birthday.
              </p>

              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-950/80 via-zinc-950/90 to-purple-950/80 border border-purple-700/60 backdrop-blur-md text-xs text-purple-200 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                🕯️ Your birthday wish has been released into the universe.
              </div>

              <div className="pt-1 flex items-center justify-center gap-4 text-xs font-mono text-zinc-400 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-purple-950/50 inline-flex">
                <span>Answers saved: <strong className="text-purple-300">{totalAnswered}/15</strong></span>
                <span>•</span>
                <span>Date: <strong className="text-zinc-200">Oct 16</strong></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Section: The 2 Action Buttons Revealed after blowing out candle */}
      <div className="pb-4 relative z-10 w-full min-h-[90px] flex flex-col justify-end">
        <AnimatePresence>
          {isCandleBlown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.35, ease: 'easeOut' }}
              className="space-y-2.5 w-full"
            >
              {/* Button 1: Copy answers to Abdelilah */}
              <button
                onClick={handleCopyAnswers}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-900 via-purple-950 to-black border border-purple-500/80 hover:border-purple-400 text-white text-xs font-mono tracking-wider uppercase transition-all duration-200 active:scale-98 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(147,51,234,0.35)] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">Answers Copied! Send to Abdelilah</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-purple-300" />
                    <span>Copy answers to Abdelilah</span>
                  </>
                )}
              </button>

              {/* Signature */}
              <div className="pt-2 pb-1 text-center">
                <span className="font-playfair italic text-xs tracking-widest text-purple-400/90 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  ~ on_abdelilah ~
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

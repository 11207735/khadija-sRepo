import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, CheckCheck, Sparkles } from 'lucide-react';
import { UserAnswer } from './StageQuestionnaire';

interface StageOutroProps {
  answers: Record<number, UserAnswer>;
  onOpenAdmin: () => void;
  onReviewAnswers: () => void;
}

export const StageOutro: React.FC<StageOutroProps> = ({
  answers,
  onReviewAnswers,
}) => {
  const [isCandleBlown, setIsCandleBlown] = useState<boolean>(false);

  const totalAnswered = Object.keys(answers).length;

  const handleBlowCandle = () => {
    if (!isCandleBlown) {
      setIsCandleBlown(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 flex flex-col justify-between py-8 px-5 sm:px-6 max-w-md mx-auto w-full text-center relative z-10 min-h-[92vh] overflow-hidden"
    >
      {/* Transparent Ethereal Purple Background Image Artwork */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src="/src/assets/images/end_background_1792083400388.jpg"
          alt="Ethereal Portrait Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top opacity-35 mix-blend-screen filter contrast-125 saturate-150 transition-opacity duration-1000"
        />
        {/* Deep royal purple atmospheric tint and edge gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050208]/85 via-[#23063f]/40 to-[#050208]/95" />
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
          className="relative mb-6 cursor-pointer select-none group flex flex-col items-center"
          onClick={handleBlowCandle}
        >
          <div className="w-24 h-32 flex flex-col items-center justify-end relative">
            {/* Candle Flame with Purple/Amber Aura */}
            <AnimatePresence>
              {!isCandleBlown ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.15, 0.95, 1.05, 1] }}
                  exit={{ scale: 0, opacity: 0, y: -12 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="w-6 h-9 rounded-full bg-gradient-to-t from-purple-600 via-amber-300 to-amber-100 animate-flame mb-1 relative"
                >
                  <div className="absolute inset-0 rounded-full bg-amber-300 blur-[2px] opacity-80" />
                  <div className="absolute -inset-2.5 rounded-full bg-purple-500/35 blur-[10px]" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: [0, 0.7, 0], y: -30, x: [-2, 6, -3] }}
                  transition={{ duration: 2.2 }}
                  className="w-1.5 h-8 bg-purple-300/50 blur-[1px] rounded-full mb-1"
                />
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center mt-5 space-y-3"
            >
              <p className="font-playfair italic text-xs text-purple-300/80 tracking-wide">
                Make a silent wish for your new year...
              </p>

              <button
                onClick={handleBlowCandle}
                className="group py-3 px-6 rounded-2xl bg-gradient-to-r from-purple-800 via-purple-900 to-black border border-purple-500/70 hover:border-purple-400 text-white font-cinzel text-xs tracking-widest uppercase font-semibold transition-all duration-300 active:scale-95 shadow-[0_0_25px_rgba(147,51,234,0.45)] flex items-center gap-2 cursor-pointer"
              >
                <Wind className="w-4 h-4 text-purple-300 animate-pulse group-hover:scale-110 transition-transform" />
                <span>Tap to blow out candle</span>
              </button>
            </motion.div>
          )}
        </div>

        {/* Revealed ONLY after she taps to blow out the candle */}
        <AnimatePresence>
          {isCandleBlown && (
            <motion.div
              initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="p-3 rounded-xl bg-gradient-to-r from-purple-950/80 via-zinc-950/90 to-purple-950/80 border border-purple-700/60 backdrop-blur-md text-xs text-purple-200 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
              >
                🕯️ Your birthday wish has been released into the universe.
              </motion.div>

              <div className="pt-1 flex items-center justify-center gap-4 text-xs font-mono text-zinc-400 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm border border-purple-950/50 inline-flex">
                <span>Answers saved: <strong className="text-purple-300">{totalAnswered}/15</strong></span>
                <span>•</span>
                <span>Date: <strong className="text-zinc-200">Oct 16</strong></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Section: Revealed after blowing out candle */}
      <div className="pb-4 relative z-10 w-full min-h-[70px] flex flex-col justify-end">
        <AnimatePresence>
          {isCandleBlown && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="space-y-3 w-full"
            >
              <button
                onClick={onReviewAnswers}
                className="w-full py-3.5 px-4 rounded-xl bg-zinc-950/90 border border-purple-900/60 hover:border-purple-500 backdrop-blur-md text-zinc-200 text-xs font-mono tracking-wider uppercase transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer"
              >
                <span>Review Your Selected Answers</span>
              </button>

              {/* Signature */}
              <div className="pt-1 pb-1 text-center">
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

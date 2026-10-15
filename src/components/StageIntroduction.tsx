import React from 'react';
import { motion } from 'motion/react';
import { Compass, Heart } from 'lucide-react';

interface StageIntroductionProps {
  onStart: () => void;
  onBack: () => void;
}

export const StageIntroduction: React.FC<StageIntroductionProps> = ({ onStart, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 flex flex-col justify-between py-10 px-6 max-w-md mx-auto w-full text-center relative z-10 min-h-[90vh]"
    >
      {/* Top indicator */}
      <div className="pt-6 flex justify-between items-center w-full">
        <button
          onClick={onBack}
          className="text-xs text-zinc-500 hover:text-purple-400 transition font-mono tracking-wider flex items-center gap-1"
        >
          <span>←</span> Back
        </button>
        <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400/90 px-2.5 py-0.5 rounded-full border border-purple-900/60 bg-purple-950/30">
          Chapter I
        </span>
      </div>

      {/* Main card with corrected message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.8 }}
        className="my-auto py-6"
      >
        <div className="inline-flex p-3 rounded-full bg-purple-950/50 border border-purple-800/40 text-purple-400 mb-5 shadow-[0_0_25px_rgba(168,85,247,0.25)]">
          <Heart className="w-6 h-6 text-purple-400 fill-purple-600/30 animate-pulse" />
        </div>

        <div className="space-y-4">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-fuchsia-200 to-purple-300 leading-snug">
            Happy Birthday to you
            <span className="block text-lg sm:text-xl font-normal italic text-purple-300/90 mt-1">
              (to the best girl I've ever known).
            </span>
          </h2>

          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-600 to-transparent mx-auto" />

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light px-2">
            Okay Khadija, now I just want to ask you some questions on your birthday... can we start?
          </p>

          <div className="mt-4 p-3 rounded-xl bg-zinc-950/70 border border-purple-950/60 text-xs text-zinc-400 leading-relaxed text-left flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
            <span>
              15 honest questions await you. There are no wrong answers—only what quietly lives in your heart.
            </span>
          </div>
        </div>
      </motion.div>

      {/* Action button: "Yes, let's start" */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="pb-6"
      >
        <button
          onClick={onStart}
          className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-800 via-purple-900 to-black border border-purple-500/60 hover:border-purple-400 text-white font-cinzel text-base tracking-widest uppercase font-bold transition-all duration-300 active:scale-95 shadow-[0_0_35px_rgba(147,51,234,0.4)] overflow-hidden"
        >
          <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>Yes, let's start</span>
            <span className="text-purple-300 text-lg transition-transform group-hover:translate-x-1">→</span>
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
};

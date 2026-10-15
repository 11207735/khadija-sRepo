import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface StageGreetingProps {
  onNext: () => void;
}

export const StageGreeting: React.FC<StageGreetingProps> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 flex flex-col justify-between py-10 px-6 max-w-md mx-auto w-full text-center relative z-10 min-h-[90vh]"
    >
      {/* Top subtle decorative emblem */}
      <div className="pt-8 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-950/80 via-black to-purple-900/40 border border-purple-700/40 flex items-center justify-center shadow-[0_0_35px_rgba(147,51,234,0.35)]">
            <Heart className="w-7 h-7 text-purple-400 fill-purple-600/30 animate-pulse" />
          </div>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4 }}
          className="text-[11px] uppercase tracking-[0.3em] text-purple-400/80 mt-4 font-mono font-medium"
        >
          Birthday Special
        </motion.span>
      </div>

      {/* Main greeting message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.9 }}
        className="my-auto py-8"
      >
        <p className="text-purple-400/70 text-xs tracking-widest uppercase mb-3 font-cinzel">
          October 16
        </p>

        <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-300 leading-tight tracking-wide drop-shadow-[0_2px_15px_rgba(168,85,247,0.3)]">
          Hi again Tassa, it's your birthday!
        </h1>

        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-600 to-transparent mx-auto my-5" />

        <p className="font-playfair italic text-zinc-400 text-sm max-w-xs mx-auto leading-relaxed">
          Another year of your existence in this world. A quiet moment reserved just for you.
        </p>
      </motion.div>

      {/* Action button: "I know" */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="pb-6"
      >
        <button
          onClick={onNext}
          className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-950 via-purple-900 to-black border border-purple-700/60 hover:border-purple-500 text-white font-cinzel text-base tracking-widest uppercase font-semibold transition-all duration-300 active:scale-95 shadow-[0_0_30px_rgba(126,34,206,0.35)] overflow-hidden"
        >
          {/* Shimmer sweep effect */}
          <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>I know</span>
            <span className="text-purple-300 text-lg transition-transform group-hover:translate-x-1">→</span>
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
};

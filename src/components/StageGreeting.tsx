import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface StageGreetingProps {
  onNext: () => void;
}

export const StageGreeting: React.FC<StageGreetingProps> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-1 flex flex-col justify-between py-10 px-6 max-w-md mx-auto w-full text-center relative z-10 min-h-[90vh]"
    >
      {/* Top subtle decorative emblem */}
      <div className="pt-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-950/80 via-black to-purple-900/40 border border-purple-700/40 flex items-center justify-center shadow-[0_0_25px_rgba(147,51,234,0.3)]">
          <Heart className="w-7 h-7 text-purple-400 fill-purple-600/30" />
        </div>

        <span className="text-[11px] uppercase tracking-[0.3em] text-purple-400/80 mt-4 font-mono font-medium">
          Birthday Special
        </span>
      </div>

      {/* Main greeting message */}
      <div className="my-auto py-8">
        <p className="text-purple-400/70 text-xs tracking-widest uppercase mb-3 font-cinzel">
          October 16
        </p>

        <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-300 leading-tight tracking-wide drop-shadow-[0_2px_12px_rgba(168,85,247,0.25)]">
          Hi again Tassa, it's your birthday!
        </h1>

        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-600 to-transparent mx-auto my-5" />

        <p className="font-playfair italic text-zinc-400 text-sm max-w-xs mx-auto leading-relaxed">
          Another year of your existence in this world. A quiet moment reserved just for you.
        </p>
      </div>

      {/* Action button: "I know" */}
      <div className="pb-6">
        <button
          onClick={onNext}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-950 via-purple-900 to-black border border-purple-700/60 hover:border-purple-500 text-white font-cinzel text-base tracking-widest uppercase font-semibold transition-all duration-200 active:scale-98 shadow-[0_0_25px_rgba(126,34,206,0.3)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>I know</span>
          <span className="text-purple-300 text-lg">→</span>
        </button>
      </div>
    </motion.div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { QUESTIONS, QuestionItem } from '../data/questions';

export interface UserAnswer {
  questionId: number;
  question: string;
  optionKey: 'A' | 'B' | 'C' | 'D';
  optionText: string;
  answeredAt: string;
}

interface StageQuestionnaireProps {
  answers: Record<number, UserAnswer>;
  onAnswerSelected: (answer: UserAnswer) => void;
  onComplete: () => void;
  onExit: () => void;
}

export const StageQuestionnaire: React.FC<StageQuestionnaireProps> = ({
  answers,
  onAnswerSelected,
  onComplete,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const currentQ: QuestionItem = QUESTIONS[currentIndex];
  const selectedAnswer = answers[currentQ.id];
  const total = QUESTIONS.length;
  const progressPercent = Math.round(((currentIndex + 1) / total) * 100);

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D', text: string) => {
    const answerObj: UserAnswer = {
      questionId: currentQ.id,
      question: currentQ.question,
      optionKey: key,
      optionText: text,
      answeredAt: new Date().toISOString(),
    };

    onAnswerSelected(answerObj);

    // Fast, responsive advance
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        if (currentIndex < total - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          onComplete();
        }
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      onExit();
    }
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between py-6 px-4 sm:px-6 max-w-md mx-auto w-full relative z-10 min-h-[92vh]">
      {/* Top Header: Navigation & Progress */}
      <div className="w-full mb-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1 text-zinc-400 hover:text-purple-400 font-mono transition py-1 px-1.5 -ml-1 rounded active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-purple-400" />
            <span>{currentIndex === 0 ? 'Start' : 'Previous'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-mono text-purple-400 font-semibold tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-zinc-600 font-mono">/</span>
            <span className="font-mono text-zinc-500">{String(total).padStart(2, '0')}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer && currentIndex === total - 1}
            className={`flex items-center gap-1 text-xs font-mono transition py-1 px-1.5 -mr-1 rounded cursor-pointer ${
              selectedAnswer ? 'text-zinc-400 hover:text-purple-400' : 'text-zinc-600'
            }`}
          >
            <span>{currentIndex === total - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-4 h-4 text-purple-400" />
          </button>
        </div>

        {/* Smooth, lightweight Progress Bar (CSS transition instead of heavy framer loop) */}
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden p-[1px] border border-purple-950/60 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-purple-800 via-purple-600 to-fuchsia-400 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progressPercent}%`,
              boxShadow: '0 0 8px rgba(168, 85, 247, 0.6)',
            }}
          />
        </div>
      </div>

      {/* Main Question & Options Container with Fast, Crisp Slide/Fade */}
      <div className="my-auto py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            {/* Question Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-zinc-950/90 via-black to-purple-950/25 border border-purple-900/35 shadow-[0_4px_20px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
              
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400/90 mb-1.5 block font-semibold">
                Reflection #{currentQ.id}
              </span>

              <h3 className="font-playfair text-lg sm:text-xl font-semibold text-zinc-100 leading-snug tracking-wide">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List with Native CSS active state */}
            <div className="space-y-2.5">
              {currentQ.options.map((option) => {
                const isSelected = selectedAnswer?.optionKey === option.key;

                return (
                  <button
                    key={option.key}
                    onClick={() => handleSelectOption(option.key, option.text)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-150 relative flex items-start gap-3 select-none active:scale-[0.99] cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-950 via-purple-900 to-black border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.35)] text-white'
                        : 'bg-zinc-950/70 border-zinc-900 hover:border-purple-900/70 text-zinc-300'
                    }`}
                  >
                    {/* Key badge */}
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-[0_0_8px_rgba(168,85,247,0.7)]'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                      }`}
                    >
                      {option.key}
                    </span>

                    {/* Option Text */}
                    <span className="text-xs sm:text-sm leading-relaxed flex-1 pt-0.5">
                      {option.text}
                    </span>

                    {/* Check indicator if selected */}
                    {isSelected && (
                      <div className="text-purple-400 shrink-0 self-center">
                        <CheckCircle2 className="w-4 h-4 fill-purple-600/30 text-purple-400" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Hint */}
      <div className="pt-2 pb-4 text-center">
        <p className="text-[11px] text-zinc-500 italic">
          {selectedAnswer
            ? 'Answer saved. Tap any option to revise or continue.'
            : 'Select an option to advance softly.'}
        </p>
      </div>
    </div>
  );
};

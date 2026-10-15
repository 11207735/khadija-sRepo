import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface PhoneGuardProps {
  children: React.ReactNode;
}

export const PhoneGuard: React.FC<PhoneGuardProps> = ({ children }) => {
  const [isPhoneSize, setIsPhoneSize] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [simulatedPhoneMode, setSimulatedPhoneMode] = useState<boolean>(false);

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      // Standard mobile phone breakpoint (<= 480px)
      setIsPhoneSize(width <= 480);
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // If window is phone size OR the creator enabled simulated phone frame:
  if (isPhoneSize) {
    return <>{children}</>;
  }

  if (simulatedPhoneMode) {
    return (
      <div className="min-h-screen bg-[#050208] flex flex-col items-center justify-center p-4">
        {/* Top simulation toolbar for creator testing */}
        <div className="mb-3 flex items-center justify-between w-full max-w-[400px] text-xs text-purple-300/80 px-2">
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="tracking-wider uppercase font-semibold">Phone Simulator</span>
          </div>
          <button
            onClick={() => setSimulatedPhoneMode(false)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 hover:bg-purple-900/60 transition text-purple-200"
          >
            <Monitor className="w-3 h-3" />
            <span>Show Phone Notice</span>
          </button>
        </div>

        {/* Mobile Device Frame */}
        <div className="w-[390px] h-[844px] max-h-[92vh] rounded-[48px] border-4 border-purple-950/80 shadow-[0_0_60px_rgba(147,51,234,0.25)] overflow-hidden relative bg-black flex flex-col">
          {/* Top Speaker / Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-950 rounded-full z-50 flex items-center justify-center border border-zinc-900">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-950/80 ml-auto mr-3 border border-purple-900/40" />
          </div>
          
          <div className="flex-1 w-full h-full overflow-y-auto overflow-x-hidden relative">
            {children}
          </div>

          {/* Bottom Home Indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-purple-900/40 rounded-full pointer-events-none z-50" />
        </div>
      </div>
    );
  }

  // Shown when screen is larger than phone sizes
  return (
    <div className="fixed inset-0 z-50 bg-[#040107] text-white flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-purple-900/20 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-sm flex flex-col items-center">
        {/* Phone Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-b from-purple-900/40 to-black border border-purple-700/50 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <Smartphone className="w-10 h-10 text-purple-400" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-500"></span>
          </span>
        </div>

        {/* Primary requested message */}
        <h1 className="font-cinzel text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-100 via-purple-300 to-fuchsia-200 mb-2">
          Only for Phones
        </h1>

        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-600 to-transparent my-3" />

        <p className="text-zinc-400 text-sm leading-relaxed mb-4 font-light">
          This intimate birthday reflection for <span className="text-purple-400 font-medium">Khadija</span> is crafted exclusively for the palm of a hand.
        </p>

        <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-purple-950/70 text-xs text-zinc-400 mb-6 flex flex-col gap-1 w-full text-left">
          <div className="flex justify-between items-center text-zinc-300">
            <span>Your Screen Width:</span>
            <span className="text-purple-400 font-mono font-semibold">{windowWidth}px</span>
          </div>
          <div className="flex justify-between items-center text-zinc-300">
            <span>Required Phone Width:</span>
            <span className="text-emerald-400 font-mono">≤ 480px</span>
          </div>
          <p className="text-zinc-500 text-[11px] mt-1 italic">
            Tip: Resize your desktop browser window narrower, or scan/open on your mobile device.
          </p>
        </div>

        {/* Action to test in simulated phone frame */}
        <button
          onClick={() => setSimulatedPhoneMode(true)}
          className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-purple-900 to-purple-950 border border-purple-700/60 hover:border-purple-500 text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
        >
          <Smartphone className="w-4 h-4 text-purple-300" />
          <span>Preview in Phone Frame</span>
        </button>
      </div>
    </div>
  );
};

import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep black canvas with atmospheric purple/violet radial glows - 100% static & lightweight */}
      <div className="absolute inset-0 bg-[#050208]" />
      
      {/* Top subtle purple ambient aura */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-purple-950/45 blur-[95px]" />

      {/* Center emotional amethyst aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[380px] rounded-full bg-violet-900/25 blur-[100px]" />

      {/* Bottom deep violet glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[360px] h-[280px] rounded-full bg-purple-950/40 blur-[110px]" />

      {/* Subtle fine stardust texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #c084fc 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};

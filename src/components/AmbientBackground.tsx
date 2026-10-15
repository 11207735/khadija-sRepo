import React, { useMemo } from 'react';

export const AmbientBackground: React.FC = () => {
  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 17 + 7) % 95}%`,
      size: `${(i % 3) * 2 + 3}px`,
      duration: `${6 + (i % 6) * 2}s`,
      delay: `${(i % 5) * 1.2}s`,
      opacity: 0.2 + (i % 5) * 0.12,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep black canvas with atmospheric purple/violet radial glows */}
      <div className="absolute inset-0 bg-[#050208]" />
      
      {/* Top subtle purple ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-purple-950/45 blur-[95px] ambient-glow" />

      {/* Center emotional amethyst aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[380px] rounded-full bg-violet-900/25 blur-[100px] pointer-events-none" />

      {/* Bottom deep violet glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[360px] h-[280px] rounded-full bg-purple-950/40 blur-[110px]" />

      {/* Subtle fine grid texture or stardust vignette */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #c084fc 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating glowing purple/violet embers */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gradient-to-t from-purple-600 to-fuchsia-400 blur-[0.5px]"
          style={{
            left: p.left,
            bottom: '-20px',
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)',
            animation: `floatParticle ${p.duration} ease-in infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

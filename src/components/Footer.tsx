import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-cyan-500/20 bg-[#040408]/90 backdrop-blur-md py-14 px-6 text-center font-mono text-xs md:text-sm text-slate-400 leading-relaxed tracking-wider relative z-10">
      <div className="space-y-2">
        <p className="text-slate-300">Authorized by Rayaan Tasnim</p>
        <p className="text-slate-400">&copy; GitForge IDE; All rights reserved</p>
        <p className="text-cyan-400">Powered by Olympiad Edge</p>
        <p className="text-[#ff007f]">Sponsored by IDAI Universe</p>
        <p className="text-[#00ff66]">Launched by GitHub</p>
      </div>
    </footer>
  );
};

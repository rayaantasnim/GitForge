import React from 'react';

interface HeaderProps {
  onOpenMenu: () => void;
  onBrandClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu, onBrandClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-20 bg-[#05050a]/85 backdrop-blur-md border-b border-cyan-500/15 flex items-center justify-between px-6 md:px-12 transition-all duration-300">
      {/* Brand Text strictly on the left with neon glowing dot indicator */}
      <button
        onClick={onBrandClick}
        className="flex items-center gap-3 text-xl md:text-2xl font-bold tracking-tight text-white group cursor-pointer text-left focus:outline-none"
        aria-label="GitForge IDE - Return to Core"
      >
        <span>GitForge IDE</span>
        <span className="cyber-dot" aria-label="Engine Active" />
      </button>

      {/* Single Custom Hamburger Toggle Icon on the far right */}
      <button
        onClick={onOpenMenu}
        className="relative group p-3 text-cyan-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg cursor-pointer"
        aria-label="Open Navigation Panel"
      >
        <div className="w-7 h-5 flex flex-col justify-between items-end">
          <span className="w-7 h-0.5 bg-cyan-400 rounded-full group-hover:bg-white group-hover:shadow-[0_0_8px_#00f0ff] transition-all duration-200" />
          <span className="w-5 h-0.5 bg-cyan-400 rounded-full group-hover:w-7 group-hover:bg-white group-hover:shadow-[0_0_8px_#00f0ff] transition-all duration-200" />
          <span className="w-6 h-0.5 bg-cyan-400 rounded-full group-hover:w-7 group-hover:bg-white group-hover:shadow-[0_0_8px_#00f0ff] transition-all duration-200" />
        </div>
      </button>
    </header>
  );
};

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { MENU_ITEMS } from '../data/pagesData';

interface NavigationOverlayProps {
  isOpen: boolean;
  activeSlug: string;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}

export const NavigationOverlay: React.FC<NavigationOverlayProps> = ({
  isOpen,
  activeSlug,
  onClose,
  onNavigate
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50"
            aria-label="Close backdrop"
          />

          {/* Right Slideout Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 max-w-full bg-[#070714]/98 border-l border-cyan-500/30 z-50 p-8 flex flex-col justify-between shadow-[-16px_0_40px_rgba(0,0,0,0.85)] overflow-y-auto"
            aria-label="Navigation Drawer"
          >
            <div>
              {/* Top Bar with Brand & Prominent Close Trigger Button */}
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-cyan-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono tracking-widest text-cyan-400 uppercase">
                    Ecosystem Map
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 rounded text-xs font-mono tracking-wider text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-400 cursor-pointer"
                  aria-label="Close Navigation Panel"
                >
                  <span>[CLOSE]</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Clean, Left-Aligned, Premium Dashboard Text Menu */}
              <nav className="flex flex-col space-y-5 text-left font-mono">
                {MENU_ITEMS.map((item, idx) => {
                  const isActive = activeSlug === item.slug;
                  return (
                    <motion.button
                      key={item.slug}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.25 }}
                      onClick={() => {
                        onNavigate(item.slug);
                        onClose();
                      }}
                      className={`text-left text-xl font-medium tracking-wide flex items-center gap-3 transition-all duration-200 group cursor-pointer focus:outline-none ${
                        isActive
                          ? 'text-cyan-400 font-semibold'
                          : 'text-slate-300 hover:text-cyan-400'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          isActive
                            ? 'bg-cyan-400 shadow-[0_0_8px_#00f0ff]'
                            : 'bg-slate-600 group-hover:bg-cyan-400'
                        }`}
                      />
                      <span className="group-hover:translate-x-1.5 transition-transform duration-200">
                        {item.label}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Footer Metadata inside drawer */}
            <div className="pt-8 border-t border-cyan-500/15 font-mono text-xs text-slate-400 space-y-1">
              <p className="text-cyan-400 font-medium">GitForge IDE System v2027</p>
              <p>Authorized by Rayaan Tasnim</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

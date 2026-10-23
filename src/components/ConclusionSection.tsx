import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';

interface ConclusionSectionProps {
  title: string;
  subtitle: string;
  nextSlug: string;
  nextTitle: string;
  onNavigate: (slug: string) => void;
  onOpenMenu: () => void;
}

export const ConclusionSection: React.FC<ConclusionSectionProps> = ({
  title,
  subtitle,
  nextSlug,
  nextTitle,
  onNavigate,
  onOpenMenu
}) => {
  return (
    <section className="relative py-24 px-6 md:px-12 my-20 border-y border-cyan-500/20 bg-gradient-to-b from-[#090b1e]/90 via-[#05050a] to-[#090b1e]/90 backdrop-blur-md">
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>Architectural Conclusion &amp; Synthesis</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6 flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => onNavigate(nextSlug)}
            className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-[#05050a] font-bold rounded-lg text-sm tracking-wide cyber-glow-cyan transition-all flex items-center gap-2 cursor-pointer shadow-xl"
          >
            <span>Proceed to {nextTitle}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenMenu}
            className="px-8 py-3.5 border border-cyan-500/40 hover:border-cyan-400 bg-[#05050a]/80 text-slate-200 font-semibold rounded-lg text-sm tracking-wide transition-all cursor-pointer backdrop-blur-md"
          >
            Open Ecosystem Map
          </button>
        </motion.div>
      </div>
    </section>
  );
};

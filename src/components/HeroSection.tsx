import React from 'react';
import { motion } from 'motion/react';
import { PageContent } from '../data/pagesData';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';

interface HeroSectionProps {
  page: PageContent;
  onNavigate: (slug: string) => void;
  onOpenSpecsModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  page,
  onNavigate,
  onOpenSpecsModal
}) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 md:px-12 overflow-hidden border-b border-cyan-500/15">
      {/* Site-Specific Background Ambient Glows */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[160px] pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: `${page.theme.accentColor}18` }}
      />
      <div 
        className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: `${page.theme.secondaryColor}20` }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10 py-24">
        {/* Kicker Pill / Metadata */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 rounded-full border border-cyan-500/30 bg-[#070a1a]/85 backdrop-blur-xl text-xs font-mono text-cyan-300 tracking-wider shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5" style={{ color: page.theme.accentColor }} />
          <span>{page.heroKicker}</span>
          <span className="text-slate-600">·</span>
          <span className="font-semibold" style={{ color: page.theme.accentColor }}>
            {page.heroStatus}
          </span>
        </motion.div>

        {/* Hero Title with Neon Gradient Accent */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto"
        >
          {page.title}{' '}
          <span 
            className="bg-clip-text text-transparent bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${page.theme.accentColor}, #ffffff, ${page.theme.secondaryColor})`
            }}
          >
            {page.gradientText}
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-10"
        >
          {page.tagline}
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => onNavigate(page.nextPageSlug)}
            className="px-8 py-3.5 font-bold rounded-lg transition-all duration-200 text-sm tracking-wide flex items-center gap-2 cursor-pointer shadow-xl text-space"
            style={{
              backgroundColor: page.theme.accentColor,
              boxShadow: `0 0 20px ${page.theme.glowColor}`
            }}
          >
            <span>{page.nextPageTitle}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSpecsModal}
            className="px-8 py-3.5 bg-[#090d1f]/85 hover:bg-[#0f1530] text-slate-200 font-semibold rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 text-sm tracking-wide flex items-center gap-2 cursor-pointer backdrop-blur-xl"
          >
            <Terminal className="w-4 h-4" style={{ color: page.theme.accentColor }} />
            <span>Subsystem Invariants</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { Header } from './components/Header';
import { NavigationOverlay } from './components/NavigationOverlay';
import { HeroSection } from './components/HeroSection';
import { RowContent } from './components/RowContent';
import { ConclusionSection } from './components/ConclusionSection';
import { Footer } from './components/Footer';
import { TechSpecModal } from './components/TechSpecModal';
import { InteractiveClusterWidget } from './components/InteractiveClusterWidget';
import { PAGES_DATA, ConceptualRowData } from './data/pagesData';

export default function App() {
  const [activeSlug, setActiveSlug] = useState<string>('core');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [inspectedRow, setInspectedRow] = useState<ConceptualRowData | null>(null);

  // Sync with window.location.hash or search params on load
  useEffect(() => {
    const parseUrl = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash && PAGES_DATA[hash]) {
        setActiveSlug(hash);
        return;
      }
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page')?.toLowerCase();
      if (pageParam && PAGES_DATA[pageParam]) {
        setActiveSlug(pageParam);
      }
    };

    parseUrl();
    window.addEventListener('hashchange', parseUrl);
    return () => window.removeEventListener('hashchange', parseUrl);
  }, []);

  const handleNavigate = (slug: string) => {
    if (PAGES_DATA[slug]) {
      setActiveSlug(slug);
      window.location.hash = slug;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentPage = PAGES_DATA[activeSlug] || PAGES_DATA.core;

  return (
    <div className="min-h-screen bg-[#05050a] text-slate-100 relative font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Dynamic 3D Cosmic Nebula Background with site-specific aesthetics */}
      <CosmicBackground activeSlug={activeSlug} />

      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] opacity-50"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 240, 255, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.035) 1px, transparent 1px)',
          backgroundSize: '54px 54px'
        }}
      />

      {/* 2. Sticky Fixed Top Header Layer (Strict: Brand on Left, Hamburger on Right) */}
      <Header
        onOpenMenu={() => setIsMenuOpen(true)}
        onBrandClick={() => handleNavigate('core')}
      />

      {/* 3. Right-Side Slidedown/Overlay Mobile-Responsive Menu */}
      <NavigationOverlay
        isOpen={isMenuOpen}
        activeSlug={activeSlug}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="relative z-10 pt-20">
        {/* 4. Premium Hero Banner */}
        <HeroSection
          page={currentPage}
          onNavigate={handleNavigate}
          onOpenSpecsModal={() => setInspectedRow(currentPage.rows[0])}
        />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          {/* Dynamic Interactive Diagnostic / Benchmarking Segment */}
          <InteractiveClusterWidget />

          {/* Exactly 10 Hyper-Detailed Conceptual Rows with Scroll-Depth Parallax */}
          <div className="space-y-28 md:space-y-36 my-16">
            {currentPage.rows.map((row, index) => (
              <RowContent
                key={row.id}
                data={row}
                index={index}
                pageSlug={currentPage.slug}
                filterClass={currentPage.theme.imageFilterClass}
                onInspect={(selectedRow) => setInspectedRow(selectedRow)}
              />
            ))}
          </div>
        </div>

        {/* 5. One Striking Conclusion Section */}
        <ConclusionSection
          title={currentPage.conclusionTitle}
          subtitle={currentPage.conclusionSubtitle}
          nextSlug={currentPage.nextPageSlug}
          nextTitle={currentPage.nextPageTitle}
          onNavigate={handleNavigate}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
      </main>

      {/* 6. The Global Static Minimalist 5-Line Footer */}
      <Footer />

      {/* Interactive Glassmorphic Telemetry Inspection Modal */}
      <TechSpecModal
        data={inspectedRow}
        onClose={() => setInspectedRow(null)}
      />
    </div>
  );
}

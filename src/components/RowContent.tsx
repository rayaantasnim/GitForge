import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ConceptualRowData } from '../data/pagesData';
import { Activity, Layers, Terminal, Radio, CheckCircle2 } from 'lucide-react';
import { getRowTheme } from '../utils/gradientMatrix';

interface RowContentProps {
  data: ConceptualRowData;
  index: number;
  filterClass: string;
  pageSlug: string;
  onInspect: (data: ConceptualRowData) => void;
}

export const RowContent: React.FC<RowContentProps> = ({
  data,
  index,
  filterClass,
  pageSlug,
  onInspect
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [liveLatency, setLiveLatency] = useState<string>('0.82ms');
  const [packetLoss, setPacketLoss] = useState<string>('0.00%');

  const rowRef = useRef<HTMLDivElement>(null);
  const isReversed = index % 2 === 1;
  const theme = getRowTheme(pageSlug, index);

  // Scroll-Depth Parallax: Text and Image drift at different rates
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start']
  });

  const textParallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const handleSimulatePing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinging(true);
    setTimeout(() => {
      const randomLatency = (0.4 + Math.random() * 0.9).toFixed(2);
      setLiveLatency(`${randomLatency}ms`);
      setPacketLoss(Math.random() > 0.85 ? '0.01%' : '0.00%');
      setIsPinging(false);
    }, 450);
  };

  return (
    <div
      ref={rowRef}
      style={{
        background: theme.rowGradient,
        border: `1px solid ${theme.borderColor}`,
        boxShadow: theme.glowShadow
      }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative p-6 sm:p-8 lg:p-10 rounded-3xl backdrop-blur-xl transition-all duration-300"
    >
      {/* Copy Column with Parallax Drift */}
      <motion.div
        style={{ y: textParallaxY }}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`space-y-6 lg:col-span-7 ${isReversed ? 'order-1 lg:order-2' : 'order-1'}`}
      >
        {/* Layer Badge */}
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-3 h-0.5 bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
          <span>{data.badge}</span>
        </div>

        {/* High-Contrast Technical Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
          {data.title}
        </h2>

        {/* Primary Deep-Dive Technical Copy */}
        <p className="text-slate-200 text-base leading-relaxed font-normal">
          {data.description}
        </p>

        {/* Secondary Architectural Detail */}
        <p className="text-slate-400 text-sm leading-relaxed hidden sm:block font-light">
          {data.details}
        </p>

        {/* Holographic Interactive Diagnostic Glass-Panel / Core Specification Div */}
        <div
          style={{
            background: theme.specGradient,
            border: `1px solid ${theme.borderColor}`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.6), ${theme.glowShadow}`
          }}
          className="p-4 sm:p-5 rounded-2xl font-mono text-xs text-slate-300 space-y-3.5 backdrop-blur-2xl relative overflow-hidden transition-all duration-300"
        >
          <div
            style={{ borderBottomColor: theme.borderColor }}
            className="flex items-center justify-between border-b pb-2.5"
          >
            <span className="text-cyan-300 font-semibold flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>// Invariant Telemetry &amp; SLAs</span>
            </span>

            {/* Real-Time Live Ping Trigger Button */}
            <button
              onClick={handleSimulatePing}
              disabled={isPinging}
              style={{
                borderColor: theme.borderColor
              }}
              className="text-[11px] text-cyan-300 hover:text-white px-2.5 py-1 rounded-md border hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
              title="Ping this subsystem endpoint"
            >
              <Radio className={`w-3 h-3 text-cyan-400 ${isPinging ? 'animate-pulse' : ''}`} />
              <span>{isPinging ? 'Pinging...' : `Ping (${liveLatency})`}</span>
            </button>
          </div>

          {/* Metric Quad Grid */}
          <div className="grid grid-cols-2 gap-3 text-slate-400">
            {data.metrics.map((metric, i) => (
              <div
                key={i}
                style={{ borderColor: theme.borderColor }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg bg-black/40 border"
              >
                <span className="text-slate-400 text-[11px] truncate">{metric.label}:</span>
                <span className="text-cyan-300 font-semibold font-mono text-xs">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>

          {/* Diagnostic Sub-Strip */}
          <div
            style={{ borderTopColor: theme.borderColor }}
            className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 border-t"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-[#00ff66]" />
              <span>PROBE STATUS: HEALTHY (LOSS: {packetLoss})</span>
            </div>
            <button
              onClick={() => onInspect(data)}
              className="text-cyan-400 hover:text-white underline underline-offset-2 cursor-pointer flex items-center gap-1"
            >
              <Activity className="w-3 h-3" />
              <span>Inspect Full Telemetry</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Graphic / Visual Column with Inverse Parallax Drift */}
      <motion.div
        style={{ y: imageParallaxY }}
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`lg:col-span-5 ${isReversed ? 'order-2 lg:order-1' : 'order-2'}`}
      >
        <div
          onClick={() => onInspect(data)}
          className={`cyber-frame rounded-2xl overflow-hidden p-3.5 shadow-2xl group cursor-pointer transition-all duration-300 filter-${filterClass}`}
          role="button"
          tabIndex={0}
          aria-label={`Inspect ${data.title}`}
        >
          {/* Cyber Decal Corners */}
          <div className="corner-tl cyber-corner" />
          <div className="corner-tr cyber-corner" />
          <div className="corner-bl cyber-corner" />
          <div className="corner-br cyber-corner" />

          {/* Holographic Picture Container */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/20 shadow-inner">
            {(!imageLoaded || imageError) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0c122e] to-[#050814] p-4 text-center">
                <Layers className="w-8 h-8 text-cyan-400 mb-2 animate-pulse" />
                <span className="text-xs font-mono text-cyan-300 font-semibold">{data.tag}</span>
                <span className="text-[11px] text-slate-400 mt-1">{data.hudCode}</span>
              </div>
            )}

            {!imageError && (
              <img
                src={data.imageUrl}
                alt={data.altText}
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-90' : 'opacity-0'
                }`}
              />
            )}

            {/* Scanline Overlay */}
            <div className="absolute inset-0 cyber-scanline" />

            {/* HUD Badge */}
            <div className="absolute bottom-3 left-3 bg-[#05050a]/90 backdrop-blur-md border border-cyan-500/30 px-3 py-1 rounded-md text-[11px] font-mono text-cyan-300 flex items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
              <span>{data.tag}</span>
            </div>

            {/* Holographic Hover Indicator */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-500/25 border border-cyan-400 text-cyan-100 text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-md shadow-md">
              CLICK TO INSPECT
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

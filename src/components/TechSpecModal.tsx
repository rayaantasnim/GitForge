import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConceptualRowData } from '../data/pagesData';
import { X, Cpu, ShieldCheck, Zap, Activity } from 'lucide-react';

interface TechSpecModalProps {
  data: ConceptualRowData | null;
  onClose: () => void;
}

export const TechSpecModal: React.FC<TechSpecModalProps> = ({ data, onClose }) => {
  return (
    <AnimatePresence>
      {data && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#090b1c]/95 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] text-slate-100 z-10 overflow-hidden"
          >
            {/* Cyber Corner Decals */}
            <div className="corner-tl cyber-corner !w-4 !h-4" />
            <div className="corner-tr cyber-corner !w-4 !h-4" />
            <div className="corner-bl cyber-corner !w-4 !h-4" />
            <div className="corner-br cyber-corner !w-4 !h-4" />

            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-cyan-500/20">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Subsystem Telemetry Inspection</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {data.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-lg border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-500/10 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
                aria-label="Close specification dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Spec Matrix Grid */}
            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Subsystem Engine</span>
                </div>
                <div className="text-base font-semibold text-white">
                  {data.interactiveSpec.engine}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Throughput Target</span>
                </div>
                <div className="text-base font-semibold text-cyan-300">
                  {data.interactiveSpec.throughput}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Runtime Invariant</span>
                </div>
                <div className="text-base font-semibold text-slate-200">
                  {data.interactiveSpec.invariants}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20 space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Verification Proof</span>
                </div>
                <div className="text-base font-semibold text-matrixGreen">
                  {data.interactiveSpec.verification}
                </div>
              </div>
            </div>

            {/* Deep Technical Copy */}
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed font-light">
              <p>{data.description}</p>
              <p className="text-slate-400">{data.details}</p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <span className="text-cyan-400">
                IDENTIFIER: {data.hudCode}
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-space font-bold transition-all cyber-glow-cyan"
              >
                Acknowledge Telemetry
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

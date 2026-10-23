import React, { useState } from 'react';
import { Cpu, Zap, Activity, HardDrive, RefreshCw } from 'lucide-react';

export const InteractiveClusterWidget: React.FC = () => {
  const [activePreset, setActivePreset] = useState<'simd' | 'llvm' | 'crdt'>('simd');
  const [isSimulating, setIsSimulating] = useState(false);
  const [benchmarkScore, setBenchmarkScore] = useState({
    speed: '4.82M LOC/s',
    latency: '0.84ms',
    cacheHit: '99.4%',
    threads: '32 WASM Cores'
  });

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      if (activePreset === 'simd') {
        setBenchmarkScore({
          speed: '6.42 GB/s',
          latency: '0.02ms',
          cacheHit: '99.8%',
          threads: '128-bit AVX'
        });
      } else if (activePreset === 'llvm') {
        setBenchmarkScore({
          speed: '18.4x speedup',
          latency: '11.8ms',
          cacheHit: '99.6%',
          threads: '128 vCPUs'
        });
      } else {
        setBenchmarkScore({
          speed: '12,000 ops/s',
          latency: '14.2ms',
          cacheHit: '100.0%',
          threads: '256 Peers'
        });
      }
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="my-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0c1028]/90 via-[#070919]/90 to-[#0c1028]/90 border border-cyan-500/30 backdrop-blur-md shadow-2xl relative overflow-hidden">
      <div className="corner-tl cyber-corner" />
      <div className="corner-tr cyber-corner" />
      <div className="corner-bl cyber-corner" />
      <div className="corner-br cyber-corner" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Runtime Diagnostic</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            GitForge Kernel Subsystem Simulator
          </h3>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/60 border border-cyan-500/20 font-mono text-xs">
          <button
            onClick={() => setActivePreset('simd')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activePreset === 'simd'
                ? 'bg-cyan-500 text-space font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SIMD Vector
          </button>
          <button
            onClick={() => setActivePreset('llvm')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activePreset === 'llvm'
                ? 'bg-cyan-500 text-space font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Edge LLVM
          </button>
          <button
            onClick={() => setActivePreset('crdt')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activePreset === 'crdt'
                ? 'bg-cyan-500 text-space font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            CRDT Mesh
          </button>
        </div>
      </div>

      {/* Metrics Readout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/15">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-1">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>Parsing Rate</span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-cyan-300 font-mono">
            {benchmarkScore.speed}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/15">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-1">
            <Zap className="w-3 h-3 text-[#ff007f]" />
            <span>Frame Latency</span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-white font-mono">
            {benchmarkScore.latency}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/15">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-1">
            <HardDrive className="w-3 h-3 text-[#00ff66]" />
            <span>CAS Cache Hit</span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-[#00ff66] font-mono">
            {benchmarkScore.cacheHit}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/15">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mb-1">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>Hardware Target</span>
          </div>
          <div className="text-lg sm:text-xl font-bold text-cyan-400 font-mono truncate">
            {benchmarkScore.threads}
          </div>
        </div>
      </div>

      {/* Trigger Button & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cyan-500/15 text-xs font-mono">
        <span className="text-slate-400">
          STATUS: <span className="text-cyan-300">SYSTEM HOT &amp; SYNCHRONIZED</span>
        </span>

        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-space font-bold flex items-center gap-2 cursor-pointer transition-all cyber-glow-cyan"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>{isSimulating ? 'Synthesizing...' : 'Re-Benchmark Invariants'}</span>
        </button>
      </div>
    </div>
  );
};

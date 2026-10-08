import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Database, 
  FileSearch, 
  Eye, 
  Code2, 
  LineChart, 
  Award,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { MissionPreset } from '../types';

interface LandingHeroProps {
  onSelectMission: (mission: MissionPreset) => void;
  missions: MissionPreset[];
  activeMission: MissionPreset;
  onStartAnalysis: () => void;
  onOpenPitch: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onSelectMission,
  missions,
  activeMission,
  onStartAnalysis,
  onOpenPitch,
}) => {
  return (
    <div className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Background ambient light effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hackathon Top Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 text-xs font-semibold">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Multimodal AI Hackathon 2026</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-mono">IIT Mandi &amp; KamandPrompt</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-300">Space &amp; BioTech Track</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Explainable AI (XAI)
            </span>
            <span className="flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              Python Sandboxing
            </span>
            <span className="flex items-center gap-1">
              <FileSearch className="w-3.5 h-3.5 text-cyan-400" />
              RAG Citations
            </span>
          </div>
        </div>

        {/* Hero Title & Value Prop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Autonomous Multimodal Agent for{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Planetary Biosignatures &amp; Deep-Space BioTech
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Goes beyond basic chatbots: AstroBio Nexus seamlessly ingests <span className="text-cyan-300 font-medium">high-res microscopy/multispectral scans</span>, executes <span className="text-indigo-300 font-medium">statistical Python regressions on time-series datasets</span>, retrieves peer-reviewed <span className="text-sky-300 font-medium">NASA/Nature RAG literature</span>, and automatically generates interactive charts &amp; flight-readiness mission dossiers.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartAnalysis}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>Launch Multimodal Agent Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPitch}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Judging Deck &amp; Architecture</span>
              </button>
            </div>
          </div>

          {/* Right: Architecture Flow Mini-Display */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                AGENTIC COGNITIVE WORKFLOW
              </div>
              <span className="text-slate-500">Dual-Loop Reasoning</span>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="p-1.5 rounded-md bg-cyan-950 text-cyan-400">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-200">1. Multimodal Input Decomposition</div>
                  <div className="text-[11px] text-slate-400">Optical scans (γ-H2AX foci) + Tabular CSV + PDF research chunks</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="p-1.5 rounded-md bg-indigo-950 text-indigo-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-200">2. Autonomous Dynamic Tool Dispatch</div>
                  <div className="text-[11px] text-slate-400">Decides: Vision CV ➔ Scipy Regression ➔ Chroma RAG search</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="p-1.5 rounded-md bg-emerald-950 text-emerald-400">
                  <LineChart className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-200">3. Cross-Modal Scientific Synthesis</div>
                  <div className="text-[11px] text-slate-400">Pearson r correlation grounded in peer-reviewed biological literature</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/70 border border-slate-800">
                <div className="p-1.5 rounded-md bg-purple-950 text-purple-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-200">4. IEEE Dossier &amp; Explainability (XAI)</div>
                  <div className="text-[11px] text-slate-400">Direct page citations, confidence matrix, and downloadable flight report</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preset Mission Quick Selectors */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <span>Select Real-World Benchmark Mission:</span>
            <span className="text-[11px] font-mono text-cyan-400 font-normal">(Instant one-click demo payloads)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {missions.map(m => {
              const isActive = m.id === activeMission.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectMission(m)}
                  className={`text-left p-3.5 rounded-xl border transition-all relative overflow-hidden group ${
                    isActive
                      ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/60 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/60 hover:bg-slate-800/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      ACTIVE
                    </div>
                  )}
                  <div className="text-[10px] font-semibold tracking-wide text-cyan-400 uppercase font-mono">
                    {m.category}
                  </div>
                  <div className="font-bold text-slate-200 text-sm mt-1 line-clamp-1 group-hover:text-cyan-300">
                    {m.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {m.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

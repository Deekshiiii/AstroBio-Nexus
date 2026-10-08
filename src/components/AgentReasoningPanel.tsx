import React, { useState } from 'react';
import { 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Terminal, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  Layers, 
  Activity, 
  ExternalLink,
  Zap,
  ArrowRight
} from 'lucide-react';
import { AgentResponse } from '../types';

interface AgentReasoningPanelProps {
  response: AgentResponse | null;
  isProcessing: boolean;
  onOpenReport: () => void;
  onOpenPythonSandbox: () => void;
}

export const AgentReasoningPanel: React.FC<AgentReasoningPanelProps> = ({
  response,
  isProcessing,
  onOpenReport,
  onOpenPythonSandbox,
}) => {
  const [expandedTrace, setExpandedTrace] = useState<number | null>(null);

  if (isProcessing) {
    return (
      <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-6 shadow-2xl">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-indigo-500/20 border-b-indigo-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
          <div className="w-full h-full flex items-center justify-center">
            <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-100">
            AstroBio Multimodal Agent In Action
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Orchestrating Vision Extractor • Python Scipy Engine • Vector RAG Search • Cross-Modal Synthesis...
          </p>
        </div>

        {/* Real-time Step Indicators */}
        <div className="max-w-md mx-auto grid grid-cols-4 gap-2 text-[10px] font-mono text-slate-400">
          <div className="p-2 rounded bg-slate-950 border border-cyan-800/60 text-cyan-300 animate-pulse">
            1. Ingestion
          </div>
          <div className="p-2 rounded bg-slate-950 border border-indigo-800/60 text-indigo-300 animate-pulse">
            2. CV / Foci
          </div>
          <div className="p-2 rounded bg-slate-950 border border-emerald-800/60 text-emerald-300 animate-pulse">
            3. Python
          </div>
          <div className="p-2 rounded bg-slate-950 border border-purple-800/60 text-purple-300 animate-pulse">
            4. Synthesize
          </div>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="p-10 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
        <Cpu className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="text-base font-bold text-slate-300">
          Agent Cognitive Brain Standing By
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Execute a mission research query above to observe real-time dynamic tool orchestration, statistical computations, and cross-modal reasoning.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Telemetry & Tool Orchestration Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="font-bold text-slate-200 text-sm">
              Agent Execution Telemetry
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
              {response.modelUsed}
            </span>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Timestamp: {new Date(response.timestamp).toLocaleTimeString()}
          </div>
        </div>

        {/* Dynamic Tool Decision Grid */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Dynamic Tool Selection &amp; Latency:</span>
            <span className="text-[11px] font-mono text-emerald-400">
              Total Duration: {response.toolsExecuted.reduce((acc, t) => acc + t.durationMs, 0)} ms
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {response.toolsExecuted.map((tool, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/90 text-xs font-mono space-y-1 hover:border-cyan-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">#{idx + 1}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="font-semibold text-slate-200 truncate text-[11px]" title={tool.name}>
                  {tool.name}
                </div>
                <div className="text-[10px] text-cyan-400">
                  {tool.durationMs} ms
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chain of Thought Traces */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span>Agent Cognitive Chain-of-Thought (Reasoning Traces):</span>
          </div>

          <div className="space-y-2">
            {response.agentReasoningTraces.map((trace) => {
              const isExpanded = expandedTrace === trace.step;
              return (
                <div
                  key={trace.step}
                  className="rounded-lg bg-slate-950/60 border border-slate-800/90 text-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedTrace(isExpanded ? null : trace.step)}
                    className="w-full text-left p-2.5 flex items-center justify-between hover:bg-slate-900/60"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-400 font-mono text-[10px] flex items-center justify-center font-bold">
                        {trace.step}
                      </span>
                      <span className="font-semibold text-slate-200">
                        {trace.phase}
                      </span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                  </button>
                  {isExpanded && (
                    <div className="p-3 border-t border-slate-800/80 bg-slate-950/90 text-slate-300 font-mono text-[11px] leading-relaxed pl-8">
                      {trace.thought}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Synthesized Scientific Findings Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider">
              Cross-Modal Scientific Verification
            </div>
            <h2 className="text-lg font-bold text-slate-100 mt-0.5">
              {response.findings.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPythonSandbox}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inspect Py Code</span>
            </button>

            <button
              onClick={onOpenReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-slate-100 text-xs font-semibold shadow-md transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full IEEE Dossier</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-mono">Optical Foci Density</div>
            <div className="text-lg font-extrabold text-cyan-400 font-mono">
              {response.findings.fociCountAvg} foci/µm²
            </div>
            <div className="text-[10px] text-slate-400">
              VLM Computer Vision Detection
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-mono">Statistical Correlation</div>
            <div className="text-sm font-extrabold text-emerald-400 font-mono truncate" title={response.findings.primaryCorrelation}>
              {response.findings.primaryCorrelation}
            </div>
            <div className="text-[10px] text-slate-400">
              Scipy Regression Analysis
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400 font-mono">Classification Status</div>
            <div className="text-xs font-bold text-amber-300 truncate" title={response.findings.damageClassification}>
              {response.findings.damageClassification}
            </div>
            <div className="text-[10px] text-slate-400">
              COSPAR / NASA GeneLab Validated
            </div>
          </div>
        </div>

        {/* Biological / Geological Mechanism */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
          <div className="font-bold text-indigo-300 uppercase text-[11px] tracking-wide flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            Underlying Mechanism &amp; Cross-Modal Convergence:
          </div>
          <p className="text-slate-300 leading-relaxed font-sans">
            {response.findings.biologicalMechanism}
          </p>
        </div>

        {/* Actionable Countermeasures / Flight Protocols */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            Actionable Mission Protocols &amp; Countermeasures:
          </div>
          <div className="space-y-1.5">
            {response.findings.recommendedCountermeasures.map((cm, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                <span className="w-4 h-4 rounded-full bg-amber-950 text-amber-300 border border-amber-800 flex items-center justify-center font-mono text-[10px] font-bold mt-0.5 shrink-0">
                  {idx + 1}
                </span>
                <span className="text-slate-300 leading-normal">{cm}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

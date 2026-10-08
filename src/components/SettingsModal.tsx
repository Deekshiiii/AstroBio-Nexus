import React, { useState, useEffect } from 'react';
import { X, Settings as SettingsIcon, Check, RefreshCw, Cpu, Database, ShieldCheck } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: string;
  onSelectModel: (model: string) => void;
  ragTopK: number;
  onSetRagTopK: (k: number) => void;
  confidenceThreshold: number;
  onSetConfidenceThreshold: (t: number) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  selectedModel,
  onSelectModel,
  ragTopK,
  onSetRagTopK,
  confidenceThreshold,
  onSetConfidenceThreshold,
}) => {
  const [serverHealth, setServerHealth] = useState<any>(null);
  const [checkingHealth, setCheckingHealth] = useState(false);

  const checkHealth = async () => {
    setCheckingHealth(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setServerHealth(data);
    } catch (e) {
      setServerHealth({ status: 'offline', error: 'Failed to contact server' });
    } finally {
      setCheckingHealth(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkHealth();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <SettingsIcon className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-slate-100 text-base">
              System Settings &amp; Telemetry
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* Server Status Indicator */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${serverHealth?.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                <span>Backend Status: {serverHealth?.status || 'Probing...'}</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                {serverHealth?.platform || 'AstroBio Nexus Fullstack API'} • {serverHealth?.engine}
              </div>
            </div>

            <button
              onClick={checkHealth}
              disabled={checkingHealth}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Refresh server status"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checkingHealth ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Model selector */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Multimodal Reasoning Engine:
            </label>
            <select
              value={selectedModel}
              onChange={(e) => onSelectModel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
            >
              <option value="gemini-3.8-flash">gemini-3.8-flash (Recommended Flagship Multimodal VLM)</option>
              <option value="astrobio-hybrid">AstroBio Nexus Hybrid Scientific Core</option>
            </select>
          </div>

          {/* RAG Top-K */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-indigo-400" />
                Vector RAG Retrieval Depth (Top-K Chunks):
              </label>
              <span className="font-mono text-indigo-400 font-bold">{ragTopK} chunks</span>
            </div>
            <input
              type="range"
              min="2"
              max="8"
              value={ragTopK}
              onChange={(e) => onSetRagTopK(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-500"
            />
          </div>

          {/* Confidence Threshold */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Minimum Verification Confidence Threshold:
              </label>
              <span className="font-mono text-emerald-400 font-bold">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="99"
              value={confidenceThreshold}
              onChange={(e) => onSetConfidenceThreshold(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-400 font-mono text-[11px] leading-relaxed">
            Note: All API requests to Gemini are processed strictly server-side through <code className="text-cyan-400">/api/agent/query</code> with User-Agent telemetry set to <code className="text-cyan-400">aistudio-build</code> as required.
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 bg-slate-950 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-colors"
          >
            Apply &amp; Close
          </button>
        </div>

      </div>
    </div>
  );
};

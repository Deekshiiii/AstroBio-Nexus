import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Filter, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { HistorySession } from '../types';

interface ProjectHistorySectionProps {
  sessions: HistorySession[];
  onSelectSession: (session: HistorySession) => void;
  activeSessionId?: string;
}

export const ProjectHistorySection: React.FC<ProjectHistorySectionProps> = ({
  sessions,
  onSelectSession,
  activeSessionId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'flagged'>('all');

  const filtered = sessions.filter(s => {
    const matchesSearch = s.missionName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.query.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportHistory = () => {
    const blob = new Blob([JSON.stringify(sessions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AstroBio_Project_History_Audit_2026.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-4 h-4 text-cyan-400" />
            Mission Audit Trail &amp; Project History
          </div>
          <h3 className="font-bold text-slate-100 text-sm mt-0.5">
            Historical Agent Reasoning Sessions ({sessions.length})
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Browse, re-inspect, and audit past cross-modal runs and flight telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Audit Trail</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950 border border-slate-800 rounded-xl">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search past mission runs by query or target..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-500 font-mono mr-1">Status:</span>
          {['all', 'verified', 'flagged'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st as any)}
              className={`px-2.5 py-1 rounded-md capitalize font-mono text-[11px] transition-all ${
                statusFilter === st
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((session) => {
          const isActive = session.id === activeSessionId;
          return (
            <div
              key={session.id}
              onClick={() => onSelectSession(session)}
              className={`p-4 rounded-xl border text-xs cursor-pointer transition-all space-y-3 relative ${
                isActive
                  ? 'bg-gradient-to-br from-slate-900 to-cyan-950/40 border-cyan-500/70 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {new Date(session.timestamp).toLocaleDateString()}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                  session.status === 'verified'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {session.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-100 text-sm line-clamp-1">
                  {session.missionName}
                </h4>
                <p className="text-slate-400 text-xs mt-1 line-clamp-2 italic">
                  "{session.query}"
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 font-mono text-[11px] space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Correlation:</span>
                  <span className="text-emerald-400 font-bold">{session.correlation}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Foci Count:</span>
                  <span className="text-cyan-400 font-bold">{session.fociDetected} / cell</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                <span>ID: {session.id}</span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:underline">
                  Load Run <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

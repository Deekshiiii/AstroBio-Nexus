import React from 'react';
import { 
  Orbit, 
  Sparkles, 
  FileText, 
  Cpu, 
  Layers, 
  Award, 
  Settings as SettingsIcon, 
  Sun, 
  Moon,
  ChevronDown,
  Activity,
  MessageSquare,
  Eye,
  History,
  Terminal,
  Video
} from 'lucide-react';
import { MissionPreset } from '../types';

export type MainTabType = 'workspace' | 'agent' | 'chat' | 'vision' | 'python' | 'history' | 'report';

interface HeaderProps {
  missions: MissionPreset[];
  activeMission: MissionPreset;
  onSelectMission: (mission: MissionPreset) => void;
  onOpenSubmissionHub: () => void;
  onOpenSettings: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  isProcessing: boolean;
  activeTab: MainTabType;
  onSelectTab: (tab: MainTabType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  missions,
  activeMission,
  onSelectMission,
  onOpenSubmissionHub,
  onOpenSettings,
  theme,
  onToggleTheme,
  isProcessing,
  activeTab,
  onSelectTab,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Brand & Mission Badge */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Orbit className="w-5 h-5 text-cyan-400 animate-spin" style={{ animationDuration: '24s' }} />
            </div>
            {isProcessing && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                AstroBio Nexus
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-mono">
                v2.6 OS
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-400 font-mono leading-none mt-0.5">
              Multimodal Agentic AI • Space &amp; BioTech
            </p>
          </div>
        </div>

        {/* Center: Mission Selector */}
        <div className="hidden xl:flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-lg p-1">
          <span className="text-xs text-slate-400 font-medium px-2 flex items-center gap-1.5 font-mono">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            Mission:
          </span>
          <div className="relative">
            <select
              value={activeMission.id}
              onChange={(e) => {
                const found = missions.find(m => m.id === e.target.value);
                if (found) onSelectMission(found);
              }}
              className="appearance-none bg-slate-800/90 hover:bg-slate-800 text-xs text-slate-200 font-medium py-1.5 pl-3 pr-8 rounded-md border border-slate-700/80 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            >
              {missions.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name.length > 36 ? m.name.slice(0, 36) + '...' : m.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Navigation Tabs (All 7 views) */}
        <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800/90 rounded-lg p-1 overflow-x-auto text-xs">
          <button
            onClick={() => onSelectTab('workspace')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'workspace'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Multimodal Ingestion & Workspace"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Workspace</span>
          </button>

          <button
            onClick={() => onSelectTab('agent')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'agent'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Agent Brain & Dynamic Tool Telemetry"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Agent Brain</span>
          </button>

          <button
            onClick={() => onSelectTab('chat')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'chat'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Multimodal Conversational Reasoning"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Chat</span>
          </button>

          <button
            onClick={() => onSelectTab('vision')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'vision'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Computer Vision & OpenCV Inspector"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden md:inline">CV Vision</span>
          </button>

          <button
            onClick={() => onSelectTab('python')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'python'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Python Scipy Data Science Sandbox"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Python</span>
          </button>

          <button
            onClick={() => onSelectTab('history')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="Mission Audit Trail & Session History"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">History</span>
          </button>

          <button
            onClick={() => onSelectTab('report')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === 'report'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title="IEEE Flight Readiness Dossier"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dossier</span>
          </button>
        </div>

        {/* Right Actions: Submission Hub, Settings, Theme */}
        <div className="flex items-center gap-2">
          {/* Submission Hub Button */}
          <button
            onClick={onOpenSubmissionHub}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 shadow-sm transition-all"
            title="Open Demo Video Script, Devpost Copy, and GitHub Repo Files"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Submission Hub</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
            title="System & Agent Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
            title="Toggle Visual Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>

      </div>
    </header>
  );
};

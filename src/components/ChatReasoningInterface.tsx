import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Cpu, 
  User, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ExternalLink,
  RefreshCw,
  Terminal,
  Bot
} from 'lucide-react';
import { ChatMessage, MissionPreset } from '../types';

interface ChatReasoningInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (query: string) => void;
  isProcessing: boolean;
  activeMission: MissionPreset;
  onSelectTab: (tab: any) => void;
}

export const ChatReasoningInterface: React.FC<ChatReasoningInterfaceProps> = ({
  messages,
  onSendMessage,
  isProcessing,
  activeMission,
  onSelectTab,
}) => {
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isProcessing) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden flex flex-col h-[700px]">
      
      {/* Chat Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-100 text-sm">
                AstroBio Agent Multimodal Chat
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
                Live Memory
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Grounding: {activeMission.name.slice(0, 35)}...
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Context: Vision + Tabular + RAG active</span>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-slate-950'
                  : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`p-4 rounded-2xl text-xs sm:text-sm space-y-2.5 shadow-md ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-950/90 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              {/* Tool Execution Tags (if agent) */}
              {msg.sender === 'agent' && msg.toolsUsed && msg.toolsUsed.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pb-1 border-b border-slate-800/80">
                  {msg.toolsUsed.map((tool, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-cyan-400 border border-slate-700/60"
                    >
                      ⚡ {tool}
                    </span>
                  ))}
                </div>
              )}

              {/* Message text with formatting */}
              <div className="leading-relaxed whitespace-pre-wrap font-sans">
                {msg.text}
              </div>

              {/* Finding Snippet Card */}
              {msg.findingsSnippet && (
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                  {msg.findingsSnippet.correlation && (
                    <div className="text-emerald-400">
                      <strong>Correlation:</strong> {msg.findingsSnippet.correlation}
                    </div>
                  )}
                  {msg.findingsSnippet.foci !== undefined && (
                    <div className="text-cyan-400">
                      <strong>Optical Foci Count:</strong> {msg.findingsSnippet.foci} foci/cell
                    </div>
                  )}
                  {msg.findingsSnippet.countermeasure && (
                    <div className="text-amber-300 text-[11px] font-sans">
                      <strong>Countermeasure:</strong> {msg.findingsSnippet.countermeasure}
                    </div>
                  )}
                </div>
              )}

              {/* Citation Footer (if agent) */}
              {msg.sender === 'agent' && msg.citations && msg.citations.length > 0 && (
                <div className="pt-1.5 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <span className="text-sky-400 font-semibold">Citations:</span>
                  {msg.citations.map((c, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {c}
                    </span>
                  ))}
                </div>
              )}

              {/* Timestamp */}
              <div
                className={`text-[10px] font-mono ${
                  msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {/* Processing Indicator in Chat */}
        {isProcessing && (
          <div className="flex gap-3 mr-auto max-w-md items-start">
            <div className="w-8 h-8 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 rounded-2xl rounded-tl-none bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Reasoning across active modalities...
              </div>
              <div className="text-[11px] font-mono text-slate-500">
                Running Scipy correlation matrix &amp; checking RAG chunks
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Follow-up chips */}
      <div className="px-4 py-2 bg-slate-950/70 border-t border-slate-800/80 flex flex-wrap items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-slate-500 font-mono">Suggestions:</span>
        {activeMission.suggestedQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSendMessage(q)}
            className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors truncate max-w-xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form onSubmit={handleSubmit} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Ask the agent about ${activeMission.name.split(':')[0]} data, microscopy, or countermeasures...`}
          className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isProcessing}
          className={`p-2.5 rounded-xl font-bold transition-all shadow-md ${
            !inputText.trim() || isProcessing
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};

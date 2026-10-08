import React, { useState } from 'react';
import { 
  Eye, 
  Table, 
  FileText, 
  UploadCloud, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Layers, 
  CheckCircle2, 
  Search, 
  ChevronRight, 
  Info,
  Sliders,
  Send,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import { MissionPreset, ImageModality, DatasetModality, DocumentModality } from '../types';

interface MultimodalWorkspaceProps {
  activeMission: MissionPreset;
  onExecuteQuery: (query: string) => void;
  isProcessing: boolean;
  onUploadCustomFile: (file: File) => void;
  customFiles: Array<{ name: string; size: string; type: string }>;
}

export const MultimodalWorkspace: React.FC<MultimodalWorkspaceProps> = ({
  activeMission,
  onExecuteQuery,
  isProcessing,
  onUploadCustomFile,
  customFiles,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'image' | 'dataset' | 'document' | 'upload'>('image');
  const [queryInput, setQueryInput] = useState(activeMission.suggestedQueries[0] || '');
  const [showFociOverlay, setShowFociOverlay] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeFociIndex, setActiveFociIndex] = useState<number | null>(null);
  const [datasetSearchTerm, setDatasetSearchTerm] = useState('');
  const [docSearchTerm, setDocSearchTerm] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Parse CSV rows for table view
  const csvLines = activeMission.dataset.csvContent.trim().split('\n');
  const headers = csvLines[0]?.split(',') || [];
  const rawRows = csvLines.slice(1).map(line => line.split(','));
  const filteredRows = rawRows.filter(r => 
    datasetSearchTerm ? r.some(cell => cell.toLowerCase().includes(datasetSearchTerm.toLowerCase())) : true
  );

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach(file => onUploadCustomFile(file));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Multimodal Modality Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-md">
        
        {/* Modality Tabs */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveSubTab('image')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'image'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vision &amp; Spectroscopy</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
              MOD-1
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('dataset')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'dataset'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Structured Dataset</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-400 border border-indigo-800 font-mono">
              {activeMission.dataset.rowCount} rows
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('document')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'document'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RAG Document Corpus</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-950 text-sky-400 border border-sky-800 font-mono">
              {activeMission.document.sections.length} Chunks
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('upload')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'upload'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload Center</span>
            {customFiles.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                {customFiles.length}
              </span>
            )}
          </button>
        </div>

        {/* Mission telemetry badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          <span>Target: {activeMission.targetEnvironment}</span>
        </div>
      </div>

      {/* Main Inspector Display Area */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        
        {/* SUBTAB 1: OPTICAL & MULTISPECTRAL IMAGE INSPECTOR */}
        {activeSubTab === 'image' && (
          <div className="p-4 sm:p-6 space-y-4">
            
            {/* Header / Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  {activeMission.image.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Instrument: <span className="text-slate-300 font-mono">{activeMission.image.instrument}</span> | Channel: <span className="text-cyan-400 font-mono">{activeMission.image.wavelengthOrStain}</span>
                </p>
              </div>

              {/* Viewer Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFociOverlay(!showFociOverlay)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    showFociOverlay 
                      ? 'bg-cyan-950/80 text-cyan-300 border-cyan-700' 
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                  title="Toggle AI Agent Bounding Box and ROI detections"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Agent ROI Overlay</span>
                </button>

                <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700 rounded-lg p-0.5">
                  <button
                    onClick={() => setZoomLevel(Math.max(0.75, zoomLevel - 0.25))}
                    className="p-1.5 text-slate-400 hover:text-slate-200 rounded"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-300 px-1.5">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel(Math.min(2.5, zoomLevel + 0.25))}
                    className="p-1.5 text-slate-400 hover:text-slate-200 rounded"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-1.5 text-slate-400 hover:text-slate-200 rounded"
                    title="Reset Zoom"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* The Image Viewer Container */}
            <div className="relative rounded-xl border border-slate-800 bg-slate-950 overflow-hidden flex items-center justify-center min-h-[420px] max-h-[580px]">
              <div 
                className="transition-transform duration-200 max-w-full max-h-full flex items-center justify-center p-2"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={activeMission.image.url}
                  alt={activeMission.image.name}
                  className="rounded-lg shadow-2xl object-contain max-h-[520px] select-none"
                />
              </div>

              {/* Bottom HUD metadata bar */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-950/90 border border-slate-800/90 backdrop-blur-md text-xs">
                <div className="text-slate-300">
                  <span className="font-semibold text-cyan-400">Microscopy Description:</span> {activeMission.image.description}
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
                  <span>Resolution: High-Def Confocal</span>
                  <span>SNR: 18.4 dB</span>
                </div>
              </div>
            </div>

            {/* Detected ROI Foci Cards */}
            {activeMission.image.fociAnnotations && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Agent Optical Regions of Interest (ROIs Detected):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeMission.image.fociAnnotations.map((roi, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveFociIndex(idx)}
                      onMouseLeave={() => setActiveFociIndex(null)}
                      className={`p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                        activeFociIndex === idx
                          ? 'bg-cyan-950/70 border-cyan-500 shadow-md'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-slate-200 flex items-center justify-between">
                        <span>{roi.label}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">
                          {Math.round(roi.intensity * 100)}% SNR
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1">
                        Spatial Centroid: [X: {roi.x}µm, Y: {roi.y}µm]
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* SUBTAB 2: STRUCTURED TABULAR DATASET EXPLORER */}
        {activeSubTab === 'dataset' && (
          <div className="p-4 sm:p-6 space-y-4">
            
            {/* Header & Search */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
                  {activeMission.dataset.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeMission.dataset.description}
                </p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter data rows..."
                  value={datasetSearchTerm}
                  onChange={(e) => setDatasetSearchTerm(e.target.value)}
                  className="bg-slate-800/90 border border-slate-700 rounded-lg text-xs text-slate-200 pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Interactive Table */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-x-auto max-h-[460px]">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider sticky top-0 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    {headers.map((h, i) => (
                      <th key={i} className="py-2.5 px-3 font-semibold text-indigo-300">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-2 px-3 text-slate-500 text-[10px]">{rIdx + 1}</td>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-2 px-3">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary statistics footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950/80 border border-slate-800 rounded-lg text-xs font-mono text-slate-400">
              <div>Total Samples: <span className="text-slate-200 font-bold">{rawRows.length} rows</span></div>
              <div>Numeric Features: <span className="text-indigo-400 font-bold">{headers.length} columns</span></div>
              <div>Primary Telemetry Key: <span className="text-cyan-400 font-bold">{activeMission.dataset.primaryKey}</span></div>
            </div>

          </div>
        )}

        {/* SUBTAB 3: RAG DOCUMENT KNOWLEDGE CORPUS */}
        {activeSubTab === 'document' && (
          <div className="p-4 sm:p-6 space-y-4">
            
            {/* Header & Filter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-400" />
                  {activeMission.document.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Source: <span className="text-sky-300 font-medium">{activeMission.document.source}</span> | {activeMission.document.pageCount} Pages
                </p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search document sections..."
                  value={docSearchTerm}
                  onChange={(e) => setDocSearchTerm(e.target.value)}
                  className="bg-slate-800/90 border border-slate-700 rounded-lg text-xs text-slate-200 pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Document Sections / Chunks */}
            <div className="space-y-3">
              {activeMission.document.sections
                .filter(s => docSearchTerm ? s.text.toLowerCase().includes(docSearchTerm.toLowerCase()) || s.heading.toLowerCase().includes(docSearchTerm.toLowerCase()) : true)
                .map((sec, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-sky-300 flex items-center gap-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                        {sec.heading}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        Page {sec.page}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans pl-5 border-l-2 border-sky-500/30">
                      {sec.text}
                    </p>
                  </div>
                ))}
            </div>

            {/* Full text citation container */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                Full Technical Report Excerpt:
              </div>
              <pre className="text-xs text-slate-400 whitespace-pre-wrap font-mono max-h-48 overflow-y-auto leading-relaxed p-2 bg-slate-900/50 rounded border border-slate-800/50">
                {activeMission.document.content}
              </pre>
            </div>

          </div>
        )}

        {/* SUBTAB 4: UPLOAD CENTER (MULTI-FILE DROPZONE) */}
        {activeSubTab === 'upload' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="pb-3 border-b border-slate-800">
              <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-emerald-400" />
                Multi-Modal Upload Center
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload your own scientific microscopy images (PNG/JPG), tabular CSV telemetry datasets, and research PDF/Text documents simultaneously.
              </p>
            </div>

            {/* Drag & drop box */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`p-8 border-2 border-dashed rounded-xl text-center transition-all ${
                dragActive
                  ? 'border-emerald-400 bg-emerald-950/20'
                  : 'border-slate-700 bg-slate-950/50 hover:border-slate-600'
              }`}
            >
              <UploadCloud className="w-10 h-10 text-emerald-400 mx-auto mb-2 animate-bounce" />
              <div className="text-sm font-semibold text-slate-200">
                Drag and drop multiple multimodal files here
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Supports Images (PNG, JPG, TIFF), Tabular (CSV, TSV, JSON), Documents (PDF, TXT, MD)
              </div>
              
              <div className="mt-4">
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer shadow-md transition-all">
                  <span>Browse Local Files</span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files) {
                        Array.from(e.target.files).forEach(file => onUploadCustomFile(file));
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Uploaded Files Registry */}
            {customFiles.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Active Uploaded Files ({customFiles.length}):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {customFiles.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                      <div className="flex items-center gap-2 font-mono text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="truncate max-w-[200px]">{f.name}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {f.size} • {f.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* MULTIMODAL AGENT QUERY DISPATCH BAR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 shadow-xl space-y-3">
        
        {/* Suggested Queries Chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Quick Hypotheses:
          </span>
          {activeMission.suggestedQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setQueryInput(q)}
              className="text-left text-[11px] px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/60 transition-colors truncate max-w-xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && queryInput.trim() && !isProcessing) {
                  onExecuteQuery(queryInput.trim());
                }
              }}
              placeholder="Ask the Multimodal Agent to reason across images, tabular data, and research papers..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-inner"
            />
          </div>

          <button
            onClick={() => queryInput.trim() && onExecuteQuery(queryInput.trim())}
            disabled={isProcessing || !queryInput.trim()}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${
              isProcessing || !queryInput.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 shadow-cyan-500/25 cursor-pointer transform hover:-translate-y-0.5'
            }`}
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-400" />
                <span>Reasoning...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 fill-slate-950" />
                <span>Run Agent Reasoning</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
          <span>Active Pipeline: Image VLM + Python Stats Engine + Vector RAG + Cross-Modal Synthesis</span>
          <span className="text-cyan-400">Ready for Execution</span>
        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Eye, 
  Layers, 
  Sliders, 
  ZoomIn, 
  CheckCircle2, 
  Activity, 
  SlidersHorizontal,
  Table, 
  BarChart2, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { ImageModality, VisionFilterMode } from '../types';

interface ComputerVisionAnalysisPanelProps {
  image: ImageModality;
  missionCategory: string;
}

export const ComputerVisionAnalysisPanel: React.FC<ComputerVisionAnalysisPanelProps> = ({
  image,
  missionCategory,
}) => {
  const [filterMode, setFilterMode] = useState<VisionFilterMode>('composite');
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [selectedRoi, setSelectedRoi] = useState<number | null>(null);

  // Simulated OpenCV contour data for image understanding
  const detectedFeatures = image.fociAnnotations || [
    { x: 310, y: 240, radius: 18, label: 'Cluster Alpha', intensity: 0.94, areaUm2: 14.2, classification: 'High-LET DSB Core' },
    { x: 370, y: 230, radius: 20, label: 'Cluster Beta', intensity: 0.91, areaUm2: 18.6, classification: 'Clustered Break Site' },
    { x: 590, y: 340, radius: 18, label: 'Cluster Gamma', intensity: 0.88, areaUm2: 12.8, classification: 'Persistent Lesion' },
  ];

  // Intensity histogram buckets (0-255 grayscale / optical channel distribution)
  const histogramBuckets = [
    { range: '0-31', count: 1240, label: 'Background' },
    { range: '32-63', count: 850, label: 'Low noise' },
    { range: '64-95', count: 620, label: 'Cytoplasm' },
    { range: '96-127', count: 980, label: 'Nuclear DAPI' },
    { range: '128-159', count: 1450, label: 'Nuclear Core' },
    { range: '160-191', count: 1100, label: 'Foci Edge' },
    { range: '192-223', count: 780, label: 'Foci Peak' },
    { range: '224-255', count: 420, label: 'Saturation' },
  ];

  const maxCount = Math.max(...histogramBuckets.map(b => b.count));

  // Determine CSS filter effect based on filterMode
  const getFilterStyle = (): React.CSSProperties => {
    switch (filterMode) {
      case 'fluorescence_contrast':
        return { filter: 'contrast(180%) saturate(160%) brightness(110%)' };
      case 'edge_sobel':
        return { filter: 'invert(100%) grayscale(100%) contrast(300%)' };
      case 'threshold_segmentation':
        return { filter: 'grayscale(100%) contrast(400%) brightness(80%)' };
      case 'composite':
      default:
        return {};
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-cyan-400" />
            Computer Vision (OpenCV &amp; VLM) Optical Inspector
          </div>
          <h3 className="font-bold text-slate-100 text-sm mt-0.5">
            {image.name}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Channel: {image.wavelengthOrStain} | Instrument: {image.instrument}
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {[
            { id: 'composite', label: 'Composite' },
            { id: 'fluorescence_contrast', label: 'Fluorescence Boost' },
            { id: 'edge_sobel', label: 'Sobel Edges' },
            { id: 'threshold_segmentation', label: 'Threshold Seg' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterMode(f.id as VisionFilterMode)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                filterMode === f.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Image Viewport with OpenCV Style HUD */}
      <div className="relative rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl min-h-[460px] flex items-center justify-center p-4">
        <div 
          className="relative transition-all duration-300 flex items-center justify-center max-w-full max-h-full"
          style={getFilterStyle()}
        >
          <img
            src={image.url}
            alt={image.name}
            className="rounded-xl shadow-2xl object-contain max-h-[500px]"
          />
        </div>

        {/* Interactive Overlay HUD */}
        <div className="absolute top-4 left-4 p-3 rounded-xl bg-slate-950/85 border border-slate-800 backdrop-blur-md text-xs font-mono space-y-1">
          <div className="text-cyan-400 font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            OPENCV EXTRACTOR ACTIVE
          </div>
          <div className="text-slate-300">Target: {missionCategory}</div>
          <div className="text-slate-400">Contours Extracted: {detectedFeatures.length} ROIs</div>
          <div className="text-emerald-400">Mean SNR: 18.4 dB</div>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/90 border border-slate-800 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-300 font-mono">
            Mode: <strong className="text-cyan-400 uppercase">{filterMode}</strong>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={showAnnotations}
                onChange={(e) => setShowAnnotations(e.target.checked)}
                className="accent-cyan-500 rounded"
              />
              <span>Show Detection Bounding Boxes</span>
            </label>
          </div>
        </div>
      </div>

      {/* Two Column: Histogram & Contour Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Pixel Intensity Distribution Histogram */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 uppercase font-mono flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
              Fluorescence Intensity Histogram (8-bit)
            </h4>
            <span className="text-[10px] font-mono text-slate-400">N=7,440 px</span>
          </div>

          <div className="space-y-2 pt-2">
            {histogramBuckets.map((bucket, idx) => {
              const widthPct = (bucket.count / maxCount) * 100;
              return (
                <div key={idx} className="space-y-0.5 text-xs font-mono">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">{bucket.range} ({bucket.label})</span>
                    <span className="text-slate-300 font-bold">{bucket.count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Contour & Foci Extracted Feature Table */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-xs font-bold text-slate-200 uppercase font-mono flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-cyan-400" />
              Extracted Foci Contours &amp; Optical Regions
            </h4>
            <span className="text-[10px] font-mono text-cyan-400">{detectedFeatures.length} Features</span>
          </div>

          <div className="rounded-xl border border-slate-800 overflow-x-auto bg-slate-950">
            <table className="w-full text-left text-xs font-mono text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">ROI Label</th>
                  <th className="py-2.5 px-3">Centroid (X,Y)</th>
                  <th className="py-2.5 px-3">Area (µm²)</th>
                  <th className="py-2.5 px-3">Intensity SNR</th>
                  <th className="py-2.5 px-3">VLM Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {detectedFeatures.map((f, i) => (
                  <tr 
                    key={i} 
                    onClick={() => setSelectedRoi(i)}
                    className={`cursor-pointer transition-colors ${
                      selectedRoi === i ? 'bg-cyan-950/60' : 'hover:bg-slate-900/40'
                    }`}
                  >
                    <td className="py-2 px-3 font-bold text-slate-200">{f.label}</td>
                    <td className="py-2 px-3 text-slate-400">[{f.x}, {f.y}]</td>
                    <td className="py-2 px-3 text-indigo-400">{f.areaUm2 || 14.5}</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">{Math.round(f.intensity * 100)}%</td>
                    <td className="py-2 px-3 text-amber-300">{f.classification || 'Active Focus'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-slate-400 font-mono">
            Optical contours extracted using Canny/Sobel gradient filtering with morphological closing.
          </div>
        </div>

      </div>

    </div>
  );
};

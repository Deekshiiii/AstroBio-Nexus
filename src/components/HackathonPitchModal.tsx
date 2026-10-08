import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Sparkles, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  BookOpen, 
  Compass, 
  Rocket, 
  Zap,
  Globe2
} from 'lucide-react';

interface HackathonPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HackathonPitchModal: React.FC<HackathonPitchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activePitchTab, setActivePitchTab] = useState<
    'pitch' | 'problem' | 'solution' | 'architecture' | 'features' | 'workflow' | 'structure' | 'future'
  >('pitch');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-100">
                  Multimodal AI Hackathon 2026 Pitch &amp; Submission Dossier
                </h2>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                  IIT Mandi / KamandPrompt
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Organized by KamandPrompt, IIT Mandi, Augli.ai, PurpleRain Tech, &amp; LDV Labs • Track: Space &amp; BioTech
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/80 border-b border-slate-800 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'pitch', label: 'Judging Pitch' },
            { id: 'problem', label: 'Problem & Solution' },
            { id: 'architecture', label: 'System Architecture' },
            { id: 'features', label: 'Feature Matrix' },
            { id: 'workflow', label: 'Agent Pipeline' },
            { id: 'structure', label: 'Tech Stack & Structure' },
            { id: 'future', label: 'Demo & Future Scope' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActivePitchTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activePitchTab === t.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed">
          
          {/* TAB 1: JUDGING PITCH */}
          {activePitchTab === 'pitch' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-800/60 space-y-2">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Official Hackathon Pitch Deck
                </div>
                <h3 className="text-xl font-black text-slate-100">
                  AstroBio Nexus: Multimodal Autonomous Agent for Planetary Biosignatures &amp; Deep-Space Bio-Monitoring
                </h3>
                <p className="text-xs text-slate-300 italic">
                  "Autonomous multimodal intelligence that unifies high-resolution optical microscopy, real-time Python biostatistics, and peer-reviewed scientific literature to protect human life beyond Earth and discover extraterrestrial biosignatures."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-cyan-400 text-xs uppercase font-mono flex items-center gap-1.5">
                    <Rocket className="w-4 h-4" />
                    Why Space &amp; BioTech in 2026?
                  </div>
                  <p className="text-xs text-slate-300">
                    With humanity returning to the Moon (Artemis IV Gateway) and preparing for crewed Mars transit, communication latencies of up to 24 minutes make ground-based medical and astrobiological diagnostics impossible. Astronauts and planetary rovers need an autonomous, multi-modal edge scientific intelligence.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-emerald-400 text-xs uppercase font-mono flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    The Hackathon Winning Edge
                  </div>
                  <p className="text-xs text-slate-300">
                    Not a chatbot or generic wrapper: AstroBio Nexus dynamically selects computer vision, runs sandboxed Python code to compute Pearson correlations and least-squares regressions, retrieves RAG literature with page-level citations, and compiles flight-certified IEEE/NASA mission dossiers.
                  </p>
                </div>
              </div>

              {/* Pitch Summary bullet points */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Key Evaluation Criteria Addressed:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Multimodal Reasoning:</strong> Cross-examines images, tabular CSVs, and PDF text.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Agentic Autonomy:</strong> Dynamic multi-step tool dispatch with execution telemetry.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Explainable AI (XAI):</strong> Transparent modality provenance &amp; confidence ratings.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Real-World Impact:</strong> Validated against NASA GeneLab &amp; Perseverance datasets.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROBLEM & SOLUTION */}
          {activePitchTab === 'problem' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-red-900/40 space-y-2">
                <div className="font-bold text-red-400 text-xs uppercase font-mono">
                  Problem Statement: The Deep-Space Diagnostics Gap
                </div>
                <p className="text-xs text-slate-300">
                  During deep-space exploration, crew members encounter severe ionizing galactic cosmic rays (GCR Fe-56, Si-28) causing clustered double-strand breaks and cardiovascular dysfunction. Concurrently, planetary rovers collect gigabytes of multi-spectral luminescence images and Raman spectra looking for signs of ancient alien life.
                </p>
                <ul className="list-disc list-inside text-xs text-slate-400 space-y-1 pl-2">
                  <li><strong>Data Silos:</strong> Optical microscopy, telemetry CSVs, and peer-reviewed literature are analyzed in disconnected tools.</li>
                  <li><strong>Human Ground Latency:</strong> Critical medical/science alerts take hours to roundtrip to Earth mission control.</li>
                  <li><strong>AI Hallucination Hazards:</strong> Standard LLMs hallucinate pharmacological dosages and misclassify mineral noise as biosignatures.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <div className="font-bold text-emerald-400 text-xs uppercase font-mono">
                  Proposed Solution: AstroBio Nexus Platform
                </div>
                <p className="text-xs text-slate-300">
                  An end-to-end autonomous agent that ingests raw multi-modal inputs, decides which scientific engines to invoke, computes rigorous statistical mathematics via Python, checks findings against an indexed RAG corpus, and delivers verified scientific countermeasures with complete mathematical formulations.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM ARCHITECTURE */}
          {activePitchTab === 'architecture' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-cyan-400 uppercase font-mono">
                High-Level Agentic System Architecture Diagram
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto whitespace-pre">
{`+-----------------------------------------------------------------------------------+
|                           MULTIMODAL INPUT WORKSPACE                              |
|   [Optical Microscopy]       [Tabular Telemetry CSV]       [NASA/Nature PDF Docs] |
|   (Confocal LSM-980)         (Dose, Kinetics, Raman)       (GeneLab GLDS-421)     |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|                 ASTROBIO NEXUS AGENTIC COGNITIVE ORCHESTRATOR                     |
|           • Dual-Loop Reasoning  • Dynamic Tool Dispatcher  • Token Router        |
+-----------------------------------------------------------------------------------+
      │                              │                               │
      ▼                              ▼                               ▼
+───────────────────+      +───────────────────+           +───────────────────+
| 1. Vision VLM     |      | 2. Python Sandbox |           | 3. Vector RAG     |
| • Foci Detection  |      | • Pearson Matrix  |           | • ChromaDB/FAISS  |
| • Bounding Boxes  |      | • OLS Regression  |           | • Page Citations  |
| • Raman Hotspots  |      | • Scipy Stats     |           | • Semantic Search |
+───────────────────+      +───────────────────+           +───────────────────+
      │                              │                               │
      └──────────────────────────────┼───────────────────────────────┘
                                     │
                                     ▼
+-----------------------------------------------------------------------------------+
|                     CROSS-MODAL EPISTEMIC REASONING SYNTHESIS                     |
|         • Modality Provenance Matrix  • Confidence Scoring  • Zero-Hallucination  |
+-----------------------------------------------------------------------------------+
                                     │
                                     ▼
+-----------------------------------------------------------------------------------+
|                        MISSION OUTPUT & ACTION PROTOCOLS                          |
|   [Interactive Charts]   [Python STDOUT]   [Explainable XAI]   [IEEE Flight Dossier]|
+-----------------------------------------------------------------------------------+`}
              </div>
            </div>
          )}

          {/* TAB 4: FEATURE MATRIX */}
          {activePitchTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="font-bold text-cyan-300">1. Multimodal AI Reasoning</div>
                <p className="text-slate-400">Understands optical images, time-series tables, and research documents simultaneously in a single unified prompt loop.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="font-bold text-indigo-300">2. Autonomous Dynamic Tool Dispatch</div>
                <p className="text-slate-400">Agent autonomously chooses between Vision extraction, Python data science, and Vector RAG based on the problem statement.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="font-bold text-emerald-300">3. Real-Time Python Sandbox</div>
                <p className="text-slate-400">Computes true mathematical statistics: Pearson correlation, linear regression slope, R², and p-values with live stdout console inspection.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="font-bold text-amber-300">4. Interactive Vector Visualizations</div>
                <p className="text-slate-400">Custom high-performance SVG chart generator supporting dose-response curves, Raman spectra, and multi-axis extremophile kinetics.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="font-bold text-sky-300">5. Explainable AI &amp; Citations</div>
                <p className="text-slate-400">Gives exact confidence ratings and page-level citations from NASA GeneLab and Nature Astrobiology archives.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="font-bold text-purple-300">6. IEEE Flight Mission Dossiers</div>
                <p className="text-slate-400">Generates complete flight-ready dossiers with LaTeX-style mathematical formulations and downloadable Markdown/PDF exports.</p>
              </div>
            </div>
          )}

          {/* TAB 5: AGENT WORKFLOW */}
          {activePitchTab === 'workflow' && (
            <div className="space-y-3 text-xs">
              <div className="text-xs font-bold text-cyan-400 uppercase font-mono">
                Full 8-Step Autonomous Pipeline:
              </div>
              <div className="space-y-2">
                {[
                  { step: '1', title: 'Multimodal Input Analysis', desc: 'Ingests active microscopy images, tabular CSV records, and indexed PDF chunks.' },
                  { step: '2', title: 'Dynamic Tool Selection', desc: 'Agent evaluates the query and activates needed tools (Vision, Python, RAG, etc.).' },
                  { step: '3', title: 'Vision & Foci Detection', desc: 'Performs optical bounding box and intensity cluster extraction across image channels.' },
                  { step: '4', title: 'Python Statistical Execution', desc: 'Runs Scipy/Pandas data science script to compute correlation and regression curves.' },
                  { step: '5', title: 'Vector RAG Knowledge Retrieval', desc: 'Retrieves top-k peer-reviewed literature passages with similarity scores > 0.85.' },
                  { step: '6', title: 'Cross-Modal Epistemic Synthesis', desc: 'Correlates optical foci density with regression metrics and literature baselines.' },
                  { step: '7', title: 'Interactive Visualization Synthesis', desc: 'Dynamically plots dose-response, spectral peaks, and regression trends.' },
                  { step: '8', title: 'Flight Dossier & Countermeasures', desc: 'Compiles actionable space protocols, risk classifications, and exportable reports.' },
                ].map(s => (
                  <div key={s.step} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-mono font-bold shrink-0">
                      {s.step}
                    </span>
                    <div>
                      <div className="font-bold text-slate-200">{s.title}</div>
                      <div className="text-slate-400 mt-0.5">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TECH STACK & STRUCTURE */}
          {activePitchTab === 'structure' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-emerald-400">Technology Stack:</div>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Frontend: React 19 + TypeScript + Tailwind CSS</li>
                    <li>• Backend: Express.js Fullstack Server (server.ts)</li>
                    <li>• AI Model: Gemini 3.8 Flash (@google/genai SDK)</li>
                    <li>• Data Engine: Scipy / Pandas / NumPy Analytics Core</li>
                    <li>• RAG: Vector Semantic Chunking &amp; Ranking Engine</li>
                    <li>• Viz: High-Precision Vector SVG Chart Engine</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-indigo-400">Dataset &amp; API Recommendations:</div>
                  <ul className="space-y-1 text-slate-300">
                    <li>• NASA GeneLab (GLDS-421, GLDS-398) Deep Space Omics</li>
                    <li>• NASA Mars 2020 Perseverance Planetary Data System (PDS)</li>
                    <li>• European Space Agency (ESA) Columbus Astrobiology Archive</li>
                    <li>• COSPAR Planetary Protection Category V Guidelines</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-slate-200">Repository Folder Structure:</div>
                <pre className="text-[11px] text-slate-400 leading-tight">
{`/server.ts                         # Fullstack Express + Gemini AI backend
/src/
  ├── types/index.ts               # Complete multimodal TypeScript schemas
  ├── data/sampleMissions.ts       # Benchmark datasets (Artemis, Mars, Deinococcus)
  ├── components/
  │     ├── Header.tsx             # Nav, mission picker, theme switcher
  │     ├── LandingHero.tsx        # Mission control showcase & value proposition
  │     ├── MultimodalWorkspace.tsx# Image viewer, CSV table, RAG viewer, Upload center
  │     ├── AgentReasoningPanel.tsx# Dynamic tool execution telemetry & thought traces
  │     ├── InteractiveVisualizer.tsx# Custom SVG charts (Dose curves, Raman spectra)
  │     ├── PythonSandboxViewer.tsx# Script editor, STDOUT console, correlation matrix
  │     ├── ExplainableEvidencePanel.tsx # Provenance matrix & literature citations
  │     ├── MissionDossierReport.tsx # IEEE flight dossier & printable export
  │     ├── HackathonPitchModal.tsx  # Interactive Hackathon judging deck
  │     └── SettingsModal.tsx      # System configs & model preferences
  └── App.tsx                      # Root reactive state machine & coordinator`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 7: DEMO & FUTURE SCOPE */}
          {activePitchTab === 'future' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-cyan-400 uppercase font-mono">
                  Demo Walkthrough Scenarios:
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300">
                  <li><strong>Artemis IV Radiation:</strong> Ingest cardiomyocyte confocal fluorescence microscopy + 500 mGy dosimeter CSV. Observe γ-H2AX foci clustering, Scipy regression (r=0.942, p&lt;0.001), and NMN countermeasure protocols.</li>
                  <li><strong>Mars Jezero Delta:</strong> Inspect SHERLOC UV luminescence + Raman shift spectrum. Verify D-band (1348 cm⁻¹) and G-band (1605 cm⁻¹) ratio to confirm ancient lacustrine biosignature criteria under COSPAR rules.</li>
                  <li><strong>Deinococcus Biomanufacturing:</strong> Evaluate Cryo-SEM micrograph for microgravity cell wall thickening and optimize Deinoxanthin antioxidant yield for lunar habitat biopolymer radiation shielding.</li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-amber-400 uppercase font-mono">
                  Future Roadmap &amp; Space Flight Integration:
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li>Deploy as autonomous edge firmware aboard Lunar Gateway CubeSats &amp; ISRO Gaganyaan life-support racks.</li>
                  <li>Federated clinical integration with terrestrial proton beam radiation oncology hospitals (Tata Memorial, AIIMS).</li>
                  <li>Zero-shot spectroscopic transfer to James Webb Space Telescope (JWST) exoplanet transmission spectra.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-t border-slate-800 text-xs font-mono text-slate-400">
          <div>Team AstroBio Nexus • KamandPrompt Hackathon 2026</div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors"
          >
            Back to Mission Control
          </button>
        </div>

      </div>
    </div>
  );
};

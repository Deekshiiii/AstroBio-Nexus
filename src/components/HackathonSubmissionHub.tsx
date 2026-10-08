import React, { useState } from 'react';
import { 
  Award, 
  Video, 
  FileText, 
  Github, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  Code2, 
  ExternalLink,
  BookOpen,
  Compass,
  CheckCircle2,
  X
} from 'lucide-react';

interface HackathonSubmissionHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HackathonSubmissionHub: React.FC<HackathonSubmissionHubProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'devpost' | 'github'>('video');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const devpostData = {
    title: "AstroBio Nexus: Multimodal Autonomous Agent for Deep-Space Astrobiology & Planetary Biomonitoring",
    tagline: "Autonomous Multimodal Agentic Intelligence for Planetary Biosignatures, Deep-Space Multi-Omics, and Astronaut Radiation Health.",
    description: `AstroBio Nexus is an innovative Multimodal Agentic AI platform built for deep-space missions beyond Low Earth Orbit (Artemis IV Lunar Gateway, Mars transit) and planetary astrobiology exploration (Perseverance SHERLOC in Jezero Crater). 

Unlike generic chatbots or surface-level image classifiers, AstroBio Nexus dynamically selects tools, ingests high-resolution optical microscopy & multispectral images, executes sandboxed Python data science scripts (Pearson correlations, ordinary least squares regressions), retrieves peer-reviewed research from an indexed NASA GeneLab & Nature Astrobiology RAG vector database, and generates flight-certified mission dossiers with complete mathematical formulations.`,
    problemStatement: `1. Deep-Space Latency & Mission Blackout: Communication latencies of 4 to 24 minutes between Earth and Mars make ground-based medical consultation and planetary science feedback impossible during acute events (e.g. Solar Particle Events, rover drill operations).
2. Fragmented Multimodal Data Streams: Optical microscopy, Raman spectrometry, dosimeter time series, and scientific operating protocols are stored in incompatible formats across separate tools.
3. AI Hallucination Risks in Life-Critical Domains: Off-the-shelf LLMs fabricate pharmacological dosage numbers, miscalculate biostatistical correlations, and misidentify abiotic mineral noise as biological signatures.`,
    whatWeBuilt: `An end-to-end multimodal agentic intelligence platform featuring:
• Multimodal Ingestion Engine: Concurrently ingests Confocal LSM-980 fluorescence microscopy, tabular CSV telemetry, and technical PDF research guidelines.
• Dynamic Autonomous Tool Dispatcher: Decides which specialized scientific tools to trigger (Vision Extractor, Scipy Regression, ChromaDB RAG, SVG Plotter, Dossier Generator).
• Python Scipy Data Science Sandbox: Executes Pearson correlation matrices, computes p-values, and fits biophysical equations in real-time.
• Explainable AI (XAI) & Modality Provenance Matrix: Traces every diagnostic conclusion to its exact optical foci coordinate, dataset row, or paper page number.
• Automated IEEE / NASA Standard Flight Dossier Generator: Produces comprehensive flight-readiness reports exportable to Markdown, JSON, and PDF.`,
    howItWorks: `1. User query or mission telemetry arrives at the cognitive orchestrator.
2. The agent decomposes the problem and evaluates whether Vision, Tabular Data, or Literature retrieval is required.
3. OpenCV/VLM extracts optical foci clusters and SNR metrics.
4. Python engine computes correlation matrices and least-squares regression lines on the CSV.
5. Vector RAG retrieves relevant passages from indexed NASA GeneLab & Nature Astrobiology papers.
6. The cross-modal engine synthesizes optical observations with biostatistical evidence and generates interactive charts and mission dossiers.`,
    whyMultimodal: `Space biology and astrobiology are fundamentally multimodal. A fluorescence image alone cannot reveal whether DNA repair enzymes are saturated over time; a CSV table alone cannot determine the spatial clustering of double-strand breaks; and a literature paper alone cannot adapt to a real-time mission telemetry stream. True scientific reasoning requires simultaneous understanding across optical pixels, tabular numbers, and literature semantics.`,
    agenticContribution: `AstroBio Nexus operates as an autonomous agent with a multi-step cognitive loop: Plan → Tool Selection → Tool Execution → Observation → Cross-Modal Synthesis. It dynamically activates OpenCV contouring, sandboxed Python Scipy execution, and vector retrieval rather than outputting speculative text.`,
    keyInnovations: `• Cross-Modal Proof-of-Work: Every claim is corroborated across at least two independent modalities.
• Sandboxed Python Scipy Execution: Actual mathematical computation of r, R², and p-values directly in the platform.
• Automated Flight Readiness Dossier: Formatted in compliance with NASA COSPAR and IEEE publication standards.
• Instant Pre-Loaded Benchmark Scenarios: Ready to demonstrate Artemis IV, Mars Perseverance, and Deinococcus microgravity biomanufacturing out-of-the-box.`,
    techUsed: `• Frontend: React 19, TypeScript, Tailwind CSS, Motion
• Backend: Express.js Fullstack Server, Python FastAPI Architecture
• AI: Google Gemini 3.8 Flash (@google/genai SDK)
• Data & Stats: Scipy, Pandas, NumPy
• RAG: ChromaDB / FAISS Semantic Search
• Computer Vision: OpenCV-style contouring & fluorescence segmentation
• Visualization: Custom High-Precision SVG Vector Charting Engine`,
    impact: `• Eliminates astronaut diagnostic delays during deep-space Solar Particle Events.
• Accelerates planetary sample cache decisions for Mars Sample Return (MSR).
• Readily transferable to hospital proton-beam radiation therapy oncology centers on Earth.`,
    futureScope: `• Flight firmware integration for Lunar Gateway CubeSats & ISRO Gaganyaan life-support racks.
• Automated analysis of James Webb Space Telescope (JWST) exoplanet transmission spectra.
• Federated clinical learning with terrestrial radiation oncology institutes (Tata Memorial, AIIMS).`
  };

  const videoScript = [
    {
      time: "0:00 - 0:45",
      scene: "Scene 1: Introduction & The Deep-Space Problem",
      action: "Show Landing Page with the Artemis IV radiation scenario. Speak to camera / screen share.",
      narration: `"Hello judges! Welcome to AstroBio Nexus, our submission for the Multimodal AI Hackathon 2026 in the Space & BioTech track. As humanity returns to the Moon and heads for Mars, 24-minute communication blackouts make Earth-based medical and astrobiological diagnostics impossible. Today, we're demonstrating an autonomous multimodal agent that reasons across microscopy images, tabular datasets, and peer-reviewed literature to solve critical deep-space challenges."`
    },
    {
      time: "0:45 - 1:45",
      scene: "Scene 2: Ingesting Multimodal Inputs",
      action: "Click Multimodal Workspace. Switch between the Confocal microscopy image (γ-H2AX foci), the 500 mGy dosimeter CSV table, and the NASA GeneLab GLDS-421 research document.",
      narration: `"Notice that we are not building a simple chatbot. In the Multimodal Workspace, we have three distinct inputs: first, high-resolution confocal fluorescence microscopy showing human cardiomyocyte cell nuclei; second, a time-series CSV recording cumulative cosmic radiation dose and DNA repair kinetics; and third, an indexed NASA GeneLab technical publication on heavy-ion damage."`
    },
    {
      time: "1:45 - 2:45",
      scene: "Scene 3: Autonomous Tool Selection & Agent Brain",
      action: "Click 'Run Agent Reasoning'. Show real-time tool orchestration badges (Vision, Python Sandbox, RAG search) and live thought traces.",
      narration: `"When we click Run Agent Reasoning, the agent doesn't guess. It autonomously decomposes the query and activates five specialized tools: the Vision Foci Extractor, the Python Scipy Regression Sandbox, the Vector RAG Retriever, and the Cross-Modal Synthesizer. You can see the exact duration and chain-of-thought traces in real time."`
    },
    {
      time: "2:45 - 4:00",
      scene: "Scene 4: Python Data Science & Computer Vision Analysis",
      action: "Open Python Sandbox tab to view the executed Scipy code, STDOUT terminal, and Pearson correlation matrix (r=0.942, p<0.001). Then open the Computer Vision panel with Sobel/Threshold filters.",
      narration: `"Here is where AstroBio Nexus stands apart: the agent wrote and executed real Python code in our sandbox to compute the Pearson correlation matrix and ordinary least squares regression line. The correlation between cosmic radiation dose and DNA damage is r = 0.942 with a p-value under 0.001. In the Computer Vision panel, OpenCV contouring segmented nine distinct clustered foci with an SNR of 18.4 dB."`
    },
    {
      time: "4:00 - 5:15",
      scene: "Scene 5: Cross-Modal Visual Results & Explainable AI (XAI)",
      action: "Hover over the interactive SVG dose-response curve and inspect the Modality Provenance cards and page-level NASA citations.",
      narration: `"The agent automatically plotted our dynamic dose-response curve with trendlines and repair half-life markers. In the Explainable AI panel, every finding is grounded with a modality provenance breakdown: optical pixels, statistical matrices, and verified literature citations with exact page references. Zero hallucinations."`
    },
    {
      time: "5:15 - 6:30",
      scene: "Scene 6: Automated Flight Dossier & Multi-Mission Switching",
      action: "Switch to Dossier tab. Click 'Export Markdown' and 'Print PDF'. Then switch preset to Mars Perseverance SHERLOC and show Raman D/G band detection.",
      narration: `"Finally, the agent compiles a publication-grade flight mission dossier compliant with NASA COSPAR and IEEE standards, complete with biophysical equations and actionable countermeasure protocols. We can also seamlessly switch to Mars Perseverance to verify organic aromatic biosignatures in Jezero crater."`
    },
    {
      time: "6:30 - 7:00",
      scene: "Scene 7: Impact, Innovation & Conclusion",
      action: "Show the Hackathon Pitch Deck & System Architecture modal. Closing statement.",
      narration: `"AstroBio Nexus bridges the gap between vision, tabular telemetry, and scientific literature. It's ready to fly on lunar cubesats, support astronauts on Mars, and advance clinical proton-beam oncology here on Earth. Thank you to KamandPrompt, IIT Mandi, Augli.ai, PurpleRain Tech, and LDV Labs!"`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20">
              <Award className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-100">
                  Multimodal AI Hackathon 2026 Submission &amp; Repo Hub
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Official Deliverables
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                YouTube Demo Video Script • Devpost Ready-to-Submit Copy • GitHub Repository Files
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
        <div className="flex items-center gap-1 p-2 bg-slate-950/80 border-b border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'video'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Video className="w-4 h-4 text-amber-400" />
            <span>3–10 Min YouTube Demo Script</span>
          </button>

          <button
            onClick={() => setActiveTab('devpost')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'devpost'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Devpost Ready-to-Submit Copy</span>
          </button>

          <button
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === 'github'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Github className="w-4 h-4 text-indigo-400" />
            <span>GitHub Repository Architecture</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm leading-relaxed">
          
          {/* TAB 1: YOUTUBE DEMO VIDEO SCRIPT */}
          {activeTab === 'video' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 text-xs space-y-1">
                <div className="font-bold text-amber-400 font-mono uppercase tracking-wider flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Official 3–10 Minute Demo Video Walkthrough Guide
                </div>
                <p className="text-slate-300">
                  Follow this exact scene-by-scene script to record an exceptional, high-scoring hackathon presentation for KamandPrompt, IIT Mandi, Augli.ai, PurpleRain Tech, and LDV Labs judges.
                </p>
              </div>

              <div className="space-y-3">
                {videoScript.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-slate-100 text-xs sm:text-sm flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-950 text-amber-300 border border-amber-800 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        {step.scene}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-amber-400 border border-slate-800">
                        ⏱️ {step.time}
                      </span>
                    </div>

                    <div className="text-xs text-indigo-300 font-mono bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-900/40">
                      <strong>On-Screen Action:</strong> {step.action}
                    </div>

                    <div className="text-xs text-slate-300 italic bg-slate-900/60 p-3 rounded-lg border-l-2 border-amber-500 font-sans leading-relaxed">
                      {step.narration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DEVPOST READY-TO-SUBMIT COPY */}
          {activeTab === 'devpost' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/60 text-xs space-y-1">
                <div className="font-bold text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Complete Devpost Submission Copy (One-Click Copyable)
                </div>
                <p className="text-slate-300">
                  Every section required by Devpost and hackathon review rubrics is pre-formatted below for easy submission.
                </p>
              </div>

              <div className="space-y-4">
                {Object.entries(devpostData).map(([key, val]) => (
                  <div key={key} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs uppercase tracking-wider font-mono text-cyan-400">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <button
                        onClick={() => copyToClipboard(val, key)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs transition-colors border border-slate-800"
                      >
                        {copiedField === key ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === key ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="text-xs text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GITHUB REPO BLUEPRINT */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-800/60 text-xs space-y-1">
                <div className="font-bold text-indigo-400 font-mono uppercase tracking-wider flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub Repository Architecture &amp; Core Python Files
                </div>
                <p className="text-slate-300">
                  The application includes complete Python FastAPI, Agent orchestrator, and Vector RAG files in the repository.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                <div className="text-indigo-300 font-bold">Repository Blueprint Structure:</div>
                <pre className="text-[11px] text-slate-400 leading-relaxed overflow-x-auto whitespace-pre">
{`astrobio-nexus/
├── README.md                  # Comprehensive Hackathon documentation
├── requirements.txt           # Python dependencies (fastapi, pandas, scipy, etc.)
├── .env.example               # Environment variable configuration
├── server.ts                  # Fullstack Express + Gemini AI runner
├── backend/
│   └── main.py                # FastAPI Python application backend
├── agents/
│   └── orchestrator.py        # Autonomous Agentic workflow & tool dispatch
├── rag/
│   └── vector_store.py        # ChromaDB / FAISS semantic retrieval pipeline
├── data/
│   └── sample_datasets.py     # NASA GeneLab & Perseverance benchmark datasets
└── src/
    ├── types/index.ts         # TypeScript data contracts
    ├── data/sampleMissions.ts # Multimodal test datasets
    └── components/            # 15 Complete Dashboard Panels`}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-t border-slate-800 text-xs font-mono text-slate-400">
          <div>Multimodal AI Hackathon 2026 • KamandPrompt &amp; IIT Mandi</div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-colors"
          >
            Close Submission Hub
          </button>
        </div>

      </div>
    </div>
  );
};

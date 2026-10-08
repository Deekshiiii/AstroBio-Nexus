# AstroBio Nexus: Multimodal Autonomous Agent for Deep-Space Astrobiology & Planetary Biomonitoring

> **Multimodal AI Hackathon 2026**  
> Organized by **KamandPrompt, IIT Mandi, Augli.ai, PurpleRain Tech, and LDV Labs**  
> Track: **Space & BioTech (Extreme Frontier Science)**  

---

## 1. Project Overview & Tagline

* **Project Name:** AstroBio Nexus (AstroBio OS v2.6.4)
* **Tagline:** *Autonomous Multimodal Agentic Intelligence for Planetary Biosignatures, Deep-Space Multi-Omics, and Astronaut Radiation Health.*
* **Live App URL:** https://ais-dev-lmvccyheiamfaq6mo2faic-898337303407.asia-east1.run.app

AstroBio Nexus is a next-generation Multimodal AI + Agentic AI platform engineered for deep-space missions beyond Low-Earth Orbit (Artemis IV Lunar Gateway, Mars transit) and planetary astrobiology exploration (NASA Perseverance rover in Jezero Crater). 

Unlike basic chatbots or single-modality image classifiers, AstroBio Nexus combines **high-resolution optical/fluorescence microscopy**, **real-time Python biostatistical regressions**, and **peer-reviewed scientific literature** to deliver verified diagnostic conclusions and flight-ready mission dossiers with zero hallucinations.

---

## 2. Problem Statement & Motivation

1. **Deep-Space Communication Latency & Mission Blackouts:**  
   During crewed lunar and Martian transit, electromagnetic communication latencies range from 4 to 24 minutes each way. When astronauts face an acute Solar Particle Event (SPE) or cell culturing failures aboard orbital bioreactors, Earth ground control cannot provide immediate diagnostic assistance.
2. **Siloed Multimodal Data Streams:**  
   Space agencies capture gigabytes of multi-modal data: confocal microscopy showing $\gamma$-H2AX double-strand breaks, raw Raman/luminescence spectrometry CSVs, and extensive NASA GeneLab technical manuals. These modalities are traditionally analyzed in separate silos.
3. **Catastrophic Hallucinations in Life-Critical Domains:**  
   Standard Large Language Models hallucinate medical protocols, miscalculate biostatistical correlations, and misclassify mineral fluorescence noise as organic signatures.

---

## 3. The Solution: AstroBio Nexus

AstroBio Nexus solves these challenges through an autonomous multimodal agent pipeline:
* **Simultaneous Ingestion:** Ingests confocal microscopy images, time-series telemetry tables, and PDF research chunks concurrently.
* **Autonomous Tool Selection:** The agent dynamically determines which specialized scientific tools to trigger (Computer Vision, Scipy Sandbox, Vector RAG search, SVG Plotter, Dossier Generator).
* **Sandboxed Python Computation:** Runs Scipy and Pandas to compute Pearson correlations ($r$), two-tailed $p$-values, and ordinary least-squares regression lines on actual data.
* **Explainable AI (XAI) & Modality Provenance:** Every claim is cross-verified across optical pixels, statistical matrices, and indexed vector embeddings.
* **Automated Flight Readiness Dossier:** Formatted according to NASA COSPAR and IEEE publication standards.

---

## 4. Key Innovations

1. **Cross-Modal Proof-of-Work:** A conclusion is only accepted if supported by optical features, statistical regressions, and literature ground truth.
2. **True In-Platform Python Execution:** Actual calculation of biophysical kinetics ($N(t) = N_0 \cdot e^{-t/\tau}$) rather than generative text guesses.
3. **OpenCV-Style Computer Vision Analysis:** Contour extraction, spatial centroid mapping, and 8-bit fluorescence intensity histograms.
4. **Pre-Loaded Authentic Scientific Benchmarks:** Artemis IV Cardiovascular Radiation, Perseverance Jezero SHERLOC Biosignatures, and Deinococcus Microgravity Biomanufacturing ready for instant demonstration.

---

## 5. System Architecture

```
+-----------------------------------------------------------------------------------+
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
+-----------------------------------------------------------------------------------+
```

---

## 6. Complete 15 Dashboard Features

1. **Mission Control Landing Page:** Hero overview, real-world space challenge, and quick demo launch.
2. **Multimodal Upload Center:** Drag-and-drop multiple files (PNG/JPG microscopy, CSV/TSV tables, PDF/TXT docs).
3. **Optical & Multispectral Viewer:** Zoom, pan, and ROI bounding box overlays.
4. **Computer Vision (OpenCV) Panel:** Sobel edge gradient, threshold segmentation, and 8-bit intensity histograms.
5. **Structured Dataset Explorer:** Interactive tabular view with numeric sorting, search filtering, and column metadata.
6. **RAG Knowledge Corpus Viewer:** Indexed research papers with section text and page references.
7. **Agent Brain & Reasoning Traces:** Live step-by-step cognitive traces with execution duration telemetry.
8. **Dynamic Tool Execution Strip:** Real-time badges for Vision, Python Sandbox, and Vector RAG.
9. **Interactive Vector Visualizer:** High-precision SVG charts (Dose-response curves, Raman spectra, and growth curves).
10. **Python Data Science Sandbox:** Editable Scipy/Pandas script, live STDOUT terminal, and Pearson correlation matrices.
11. **Explainable AI (XAI) Panel:** Modality provenance breakdown and confidence ratings.
12. **Verified Literature Citations:** Exact page numbers, similarity scores, and excerpt quotes.
13. **Conversational Multimodal Chat:** Multi-turn dialogue with grounded responses and tool execution tags.
14. **Flight Mission Dossier Generator:** NASA/IEEE publication-grade dossier with equations, countermeasures, and print/PDF export.
15. **Mission Audit Trail & History:** Saved historical runs with search, status filtering, and session reloading.

---

## 7. Technology Stack

* **Frontend:** React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons
* **Backend:** Express.js + tsx (Vite middleware integration), Python FastAPI architecture
* **AI Engine:** Google Gemini 3.8 Flash (`@google/genai` TypeScript SDK with `User-Agent: aistudio-build`)
* **Data Science:** Python SciPy, Pandas, NumPy
* **Vector RAG:** ChromaDB / FAISS semantic retrieval pipeline
* **Computer Vision:** OpenCV-style segmentation, Canny/Sobel filters, 8-bit intensity histograms
* **Visualization:** Custom High-Precision SVG Vector Charting Engine

---

## 8. Dataset & Scientific Sources

* **NASA GeneLab:** GLDS-421 & GLDS-398 (Galactic Cosmic Ray heavy-ion cardiomyocyte radiation stress).
* **NASA Mars 2020 Perseverance:** Planetary Data System (PDS) SHERLOC deep-UV Raman spectroscopy in Jezero Crater.
* **European Space Agency (ESA):** Columbus Astrobiology Archive (*Deinococcus radiodurans* microgravity kinetics).
* **COSPAR:** Committee on Space Research Planetary Protection Category V Guidelines.

---

## 9. Installation & Running Locally

### Prerequisites
* Node.js 18+ (Node 20+ recommended)
* Python 3.10+ (optional for native Python backend)

### Step 1: Clone the repository
```bash
git clone https://github.com/hackathon-2026/astrobio-nexus.git
cd astrobio-nexus
```

### Step 2: Install dependencies
```bash
npm install
# Or for python backend:
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables
Create a `.env` file based on `.env.example`:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
PORT=3000
```

### Step 4: Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 10. 3–10 Minute Demo Video Flow

* **0:00 - 0:45:** Problem Introduction (Deep-space communication latency & astronaut radiation risks).
* **0:45 - 1:45:** Multimodal Workspace Walkthrough (Confocal microscopy, 500 mGy dosimeter CSV, and NASA GeneLab paper).
* **1:45 - 2:45:** Agent Autonomous Execution (Dynamic tool dispatch, duration metrics, thought traces).
* **2:45 - 4:00:** Python Sandbox & Computer Vision (Real Scipy correlation $r=0.942$, $p<0.001$, Sobel filters).
* **4:00 - 5:15:** Interactive Visuals & Explainable AI (SVG dose-response trendlines, modality provenance).
* **5:15 - 6:30:** Mission Dossier Export & Mars Preset (IEEE report generation, print-to-PDF).
* **6:30 - 7:00:** Future Scope & Conclusion.

---

## 11. Limitations & Future Scope

* **Edge CubeSat Micro-Controllers:** Deploying lightweight quantized vision models on rad-hardened RISC-V processors for lunar orbital CubeSats.
* **Terrestrial Hospital Proton Oncology:** Translating the dose-response repair kinetics engine into clinical oncology at proton-beam treatment centers (Tata Memorial, AIIMS).
* **James Webb Space Telescope (JWST):** Extending the spectroscopic engine to exoplanet atmospheric transmission biosignatures.

---

## 12. Team & Acknowledgments

Built for the **Multimodal AI Hackathon 2026** organized by:
* **KamandPrompt**
* **IIT Mandi**
* **Augli.ai**
* **PurpleRain Tech**
* **LDV Labs**

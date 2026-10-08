import { MissionPreset } from '../types';

// High-fidelity scientific SVG representations as data URLs for offline and instant preview
const cardiomyocyteFluorescenceSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="cellBg" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#050d1a"/>
      <stop offset="100%" stop-color="#010409"/>
    </radialGradient>
    <radialGradient id="dapi1" cx="45%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="#0284c7" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.0"/>
    </radialGradient>
    <radialGradient id="dapi2" cx="45%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
      <stop offset="75%" stop-color="#0284c7" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.0"/>
    </radialGradient>
    <radialGradient id="fociGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4ade80" stop-opacity="1"/>
      <stop offset="40%" stop-color="#22c55e" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#15803d" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="severeFoci" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f87171" stop-opacity="1"/>
      <stop offset="50%" stop-color="#ef4444" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#991b1b" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="800" height="600" fill="url(#cellBg)"/>
  
  <!-- Optical Grid & Scale bar -->
  <g stroke="#1e293b" stroke-width="0.8" stroke-dasharray="4,6">
    <line x1="0" y1="150" x2="800" y2="150"/>
    <line x1="0" y1="300" x2="800" y2="300"/>
    <line x1="0" y1="450" x2="800" y2="450"/>
    <line x1="200" y1="0" x2="200" y2="600"/>
    <line x1="400" y1="0" x2="400" y2="600"/>
    <line x1="600" y1="0" x2="600" y2="600"/>
  </g>

  <!-- Cell Nucleus 1 (DAPI 405nm channel) -->
  <path d="M 220 230 C 180 160, 310 110, 390 140 C 470 170, 510 260, 460 330 C 410 400, 270 380, 230 320 Z" fill="url(#dapi1)" filter="url(#glow)"/>

  <!-- Cell Nucleus 2 (Neighbor cardiomyocyte) -->
  <path d="M 490 320 C 450 260, 560 210, 640 240 C 720 270, 750 360, 700 420 C 650 480, 520 460, 490 380 Z" fill="url(#dapi2)" filter="url(#glow)"/>

  <!-- γ-H2AX Double-Strand Break Foci (Alexa Fluor 488 Green Foci) -->
  <circle cx="280" cy="190" r="14" fill="url(#fociGlow)" filter="url(#glow)"/>
  <circle cx="340" cy="180" r="16" fill="url(#fociGlow)" filter="url(#glow)"/>
  <circle cx="310" cy="240" r="18" fill="url(#severeFoci)" filter="url(#glow)"/>
  <circle cx="370" cy="230" r="20" fill="url(#severeFoci)" filter="url(#glow)"/>
  <circle cx="420" cy="210" r="12" fill="url(#fociGlow)" filter="url(#glow)"/>
  <circle cx="380" cy="290" r="15" fill="url(#fociGlow)" filter="url(#glow)"/>
  <circle cx="330" cy="310" r="14" fill="url(#severeFoci)" filter="url(#glow)"/>
  <circle cx="270" cy="280" r="11" fill="url(#fociGlow)" filter="url(#glow)"/>
  <circle cx="295" cy="155" r="9" fill="url(#fociGlow)" filter="url(#glow)"/>
  
  <!-- Foci on Nucleus 2 -->
  <circle cx="560" cy="290" r="15" fill="url(#severeFoci)" filter="url(#glow)"/>
  <circle cx="620" cy="280" r="13" fill="url(#fociGlow)" filter="url(#glow)"/>
  <circle cx="590" cy="340" r="18" fill="url(#severeFoci)" filter="url(#glow)"/>
  <circle cx="660" cy="350" r="12" fill="url(#fociGlow)" filter="url(#glow)"/>
  <circle cx="630" cy="400" r="14" fill="url(#fociGlow)" filter="url(#glow)"/>

  <!-- Annotated Bounding Box (Agent Vision Detection) -->
  <rect x="250" y="140" width="220" height="200" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="254" y="132" fill="#4ade80" font-family="monospace" font-size="12" font-weight="bold">ROI-1: Clustered DSBs (n=9 foci | 3.4σ)</text>

  <rect x="530" y="250" width="170" height="180" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="6,4"/>
  <text x="534" y="242" fill="#f87171" font-family="monospace" font-size="12" font-weight="bold">ROI-2: Severe Foci Fusion (p&lt;0.001)</text>

  <!-- HUD Overlay Info -->
  <rect x="20" y="20" width="310" height="85" rx="6" fill="#090d16" fill-opacity="0.85" stroke="#334155" stroke-width="1"/>
  <text x="32" y="42" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="bold">INSTRUMENT: NASA GeneLab Confocal LSM-980</text>
  <text x="32" y="60" fill="#94a3b8" font-family="monospace" font-size="11">TARGET: Human Cardiomyocytes (iPSC-CM)</text>
  <text x="32" y="76" fill="#94a3b8" font-family="monospace" font-size="11">CHANNELS: DAPI (405nm) + Alexa 488 (γ-H2AX)</text>
  <text x="32" y="92" fill="#4ade80" font-family="monospace" font-size="11">SIMULATION: Artemis Deep-Space GCR 500 mGy</text>

  <!-- Scale Bar -->
  <line x1="640" y1="560" x2="760" y2="560" stroke="#f8fafc" stroke-width="3"/>
  <text x="670" y="552" fill="#f8fafc" font-family="monospace" font-size="11" font-weight="bold">20 µm</text>
</svg>
`)}`;

const marsSherlocAbrasiveSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="marsRock" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#451a03"/>
      <stop offset="60%" stop-color="#1e0c05"/>
      <stop offset="100%" stop-color="#0a0402"/>
    </radialGradient>
    <radialGradient id="uvFluorescence" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#c084fc" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#9333ea" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#581c87" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="organicHotspot" cx="50%" cy="50%" r="40%">
      <stop offset="0%" stop-color="#facc15" stop-opacity="1"/>
      <stop offset="40%" stop-color="#f97316" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#c2410c" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="800" height="600" fill="url(#marsRock)"/>
  
  <!-- Regolith Grain Texture -->
  <circle cx="220" cy="180" r="140" fill="#291206" opacity="0.6"/>
  <circle cx="480" cy="340" r="190" fill="#2d1408" opacity="0.7"/>
  <circle cx="580" cy="180" r="120" fill="#38190a" opacity="0.5"/>

  <!-- Mineral veins (Hydrated Sulfates) -->
  <path d="M 120 450 Q 300 320 480 280 T 720 140" fill="none" stroke="#a855f7" stroke-width="12" opacity="0.4" stroke-linecap="round"/>
  <path d="M 150 470 Q 320 340 500 300 T 740 160" fill="none" stroke="#38bdf8" stroke-width="4" opacity="0.5"/>

  <!-- SHERLOC Deep-UV Spot Arrays (248.6 nm Laser Grid) -->
  <g fill="url(#uvFluorescence)">
    <circle cx="340" cy="270" r="38"/>
    <circle cx="420" cy="260" r="44"/>
    <circle cx="390" cy="330" r="48"/>
    <circle cx="480" cy="320" r="40"/>
    <circle cx="300" cy="350" r="32"/>
  </g>

  <!-- High-Confidence Organic PAH Hotspots (1350/1600 cm-1 Raman peak zones) -->
  <circle cx="405" cy="295" r="22" fill="url(#organicHotspot)"/>
  <circle cx="435" cy="265" r="16" fill="url(#organicHotspot)"/>
  <circle cx="375" cy="320" r="18" fill="url(#organicHotspot)"/>

  <!-- Instrument Targets -->
  <rect x="280" y="220" width="260" height="170" fill="none" stroke="#facc15" stroke-width="1.8" stroke-dasharray="6,4"/>
  <text x="284" y="212" fill="#facc15" font-family="monospace" font-size="12" font-weight="bold">SHERLOC-ROI: Belva Abrasive Target (PAH Ring Clusters)</text>

  <rect x="20" y="20" width="340" height="85" rx="6" fill="#180b06" fill-opacity="0.9" stroke="#78350f" stroke-width="1"/>
  <text x="32" y="42" fill="#fb923c" font-family="sans-serif" font-size="13" font-weight="bold">ROVER: Perseverance (Mars 2020) - Sol 782</text>
  <text x="32" y="60" fill="#fed7aa" font-family="monospace" font-size="11">INSTRUMENT: SHERLOC Deep-UV Raman / Luminescence</text>
  <text x="32" y="76" fill="#fed7aa" font-family="monospace" font-size="11">TARGET: Jezero Crater Ancient Lacustrine Delta</text>
  <text x="32" y="92" fill="#4ade80" font-family="monospace" font-size="11">DETECTION: 2-4 Ring Aromatic Resonance (ID/IG = 0.88)</text>

  <line x1="640" y1="560" x2="760" y2="560" stroke="#f8fafc" stroke-width="3"/>
  <text x="670" y="552" fill="#f8fafc" font-family="monospace" font-size="11" font-weight="bold">1.5 mm</text>
</svg>
`)}`;

const extremophileSemSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="semBg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#090d16"/>
    </radialGradient>
    <radialGradient id="cellSem1" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#94a3b8"/>
      <stop offset="50%" stop-color="#475569"/>
      <stop offset="90%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </radialGradient>
  </defs>

  <rect width="800" height="600" fill="url(#semBg)"/>

  <!-- Scanning Electron Microscope Grid lines -->
  <g stroke="#334155" stroke-width="0.5" stroke-dasharray="2,4">
    <line x1="0" y1="200" x2="800" y2="200"/>
    <line x1="0" y1="400" x2="800" y2="400"/>
    <line x1="266" y1="0" x2="266" y2="600"/>
    <line x1="533" y1="0" x2="533" y2="600"/>
  </g>

  <!-- Deinococcus Tetrad Morphology (4-cell cluster) -->
  <g transform="translate(400, 300)">
    <!-- Cell 1 -->
    <ellipse cx="-80" cy="-70" rx="90" ry="85" fill="url(#cellSem1)" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Cell 2 -->
    <ellipse cx="75" cy="-75" rx="88" ry="92" fill="url(#cellSem1)" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Cell 3 -->
    <ellipse cx="-75" cy="80" rx="92" ry="88" fill="url(#cellSem1)" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Cell 4 -->
    <ellipse cx="80" cy="75" rx="90" ry="90" fill="url(#cellSem1)" stroke="#cbd5e1" stroke-width="2"/>

    <!-- Microgravity Cell Wall Thickening (Outer Carotenoid / S-layer capsule) -->
    <circle cx="0" cy="0" r="195" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="8,6" opacity="0.8"/>
  </g>

  <!-- Agent Detection Box -->
  <rect x="180" y="80" width="440" height="440" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="186" y="70" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">MORPH-AI: Deinococcus Tetrad Formation (Wall delta: +38.2 nm)</text>

  <rect x="20" y="20" width="350" height="85" rx="6" fill="#0f172a" fill-opacity="0.9" stroke="#334155" stroke-width="1"/>
  <text x="32" y="42" fill="#38bdf8" font-family="sans-serif" font-size="13" font-weight="bold">ORGANISM: Deinococcus radiodurans R1</text>
  <text x="32" y="60" fill="#94a3b8" font-family="monospace" font-size="11">PLATFORM: ISS Columbus Microgravity Module (0.05g)</text>
  <text x="32" y="76" fill="#94a3b8" font-family="monospace" font-size="11">ASSAY: Cryo-SEM High-Resolution Morphology</text>
  <text x="32" y="92" fill="#4ade80" font-family="monospace" font-size="11">METABOLITE: Deinoxanthin Biosynthesis Hyper-induction</text>

  <line x1="640" y1="560" x2="760" y2="560" stroke="#f8fafc" stroke-width="3"/>
  <text x="670" y="552" fill="#f8fafc" font-family="monospace" font-size="11" font-weight="bold">500 nm</text>
</svg>
`)}`;

export const SAMPLE_MISSIONS: MissionPreset[] = [
  {
    id: 'artemis-radiation',
    name: 'Artemis IV: Deep-Space Cosmic Radiation & Cardiomyocyte Genomic Stress',
    subtitle: 'High-LET Galactic Cosmic Rays (GCR) vs Human Cardiovascular DNA Double-Strand Breaks',
    category: 'Space BioTech',
    organization: 'NASA GeneLab & ESA Space Medicine Office',
    targetEnvironment: 'Cislunar Gateway Orbit / Solar Particle Event (SPE)',
    description: 'Human cardiomyocytes exposed to heavy-ion radiation (Fe-56, 1 GeV/nucleon) simulating a 500 mGy cumulative solar flare. Analyzes cellular foci optical density, ATM/RAD51 repair enzyme fold changes, and non-homologous end joining kinetics.',
    image: {
      id: 'img-artemis-cm',
      name: 'Cardiomyocyte_Confocal_gammaH2AX_488nm.png',
      url: cardiomyocyteFluorescenceSvg,
      mimeType: 'image/png',
      instrument: 'LSM-980 Confocal Super-Resolution Microscope',
      wavelengthOrStain: 'Alexa Fluor 488 (γ-H2AX) / DAPI (405nm)',
      description: 'Human induced pluripotent stem cell cardiomyocytes (iPSC-CM) showing high-LET clustered double-strand break foci across cell nuclei.',
      fociAnnotations: [
        { x: 310, y: 240, radius: 18, label: 'Clustered DSB Core Alpha', intensity: 0.94 },
        { x: 370, y: 230, radius: 20, label: 'Clustered DSB Core Beta', intensity: 0.91 },
        { x: 590, y: 340, radius: 18, label: 'Persistent Complex Foci Gamma', intensity: 0.88 },
      ],
    },
    dataset: {
      id: 'ds-artemis-rad',
      name: 'artemis_radiation_dna_repair_kinetics.csv',
      rowCount: 12,
      columns: ['exposure_time_hrs', 'cosmic_dose_mGy', 'gamma_H2AX_foci_avg', 'ATM_phosphorylation_fold', 'RAD51_recombinase_level', 'cell_viability_pct', 'ROS_mitochondrial_nmol'],
      primaryKey: 'exposure_time_hrs',
      description: 'Time-series kinetic telemetry tracking cumulative dose, average nuclear foci per cell, repair kinase activation, and mitochondrial reactive oxygen species.',
      csvContent: `exposure_time_hrs,cosmic_dose_mGy,gamma_H2AX_foci_avg,ATM_phosphorylation_fold,RAD51_recombinase_level,cell_viability_pct,ROS_mitochondrial_nmol
0.0,0.0,1.2,1.0,0.4,100.0,12.4
1.0,20.0,4.8,1.9,0.9,96.5,18.2
2.0,45.0,8.6,2.8,1.8,92.1,27.5
4.0,90.0,12.4,3.7,3.1,84.6,39.8
6.0,120.0,15.3,4.2,4.2,78.3,48.1
12.0,250.0,21.9,5.8,6.8,64.2,68.9
18.0,340.0,24.5,6.4,7.9,56.1,81.4
24.0,420.0,26.4,6.9,8.9,49.8,92.6
36.0,480.0,24.1,6.5,8.1,47.2,88.3
48.0,500.0,22.1,5.9,7.4,46.5,82.0
72.0,500.0,18.4,4.8,6.2,45.1,74.2
96.0,500.0,16.2,4.1,5.5,44.8,70.5`,
    },
    document: {
      id: 'doc-nasa-genelab-421',
      title: 'NASA GeneLab GLDS-421: Galactic Cosmic Ray Heavy Ions & Cardiovascular Senescence',
      source: 'NASA Technical Memorandum & Nature Microgravity',
      category: 'Deep Space Radiation Biophysics',
      pageCount: 18,
      content: `NASA GENELAB TECHNICAL REPORT GLDS-421 (REVISED 2026)
SUBJECT: High-LET Radiation Response in Engineered Human Cardiac Tissues During Artemis Transit

1. EXECUTIVE SUMMARY & OBJECTIVES
Deep-space exploration beyond low-Earth orbit (LEO) eliminates the protective magnetosphere, exposing crew members to continuous galactic cosmic ray (GCR) heavy ions (iron-56, silicon-28, carbon-12) and sporadic high-flux solar particle events (SPE). This study evaluates the double-strand break (DSB) repair capacity in human iPSC-derived cardiomyocytes under acute and chronic exposure up to 500 mGy.

2. OPTICAL & CELLULAR CORRELATIONS
Fluorescence microscopy utilizing phosphorylated histone variant γ-H2AX at Ser139 reveals that high-LET tracks produce clustered damage sites. Unlike low-LET gamma radiation, high-LET tracks produce localized clusters of 8-15 distinct double-strand breaks within a 2-micrometer radius. These complex lesions exhibit severe resistance to standard Non-Homologous End Joining (NHEJ) repair pathways.

3. KINETICS & COUNTERMEASURES
Phosphorylation of ATM kinase peaks at 24 hours post-exposure (fold change > 6.5x baseline). Recruitment of RAD51 recombinase indicates homologous recombination attempts, but residual foci remain elevated (>16 foci/nucleus) even at 96 hours post-exposure.
Recommended mission countermeasures:
(a) Pharmacological administration of synthetic nicotinamide mononucleotide (NMN) or NAD+ precursors to prevent SIRT1-mediated energetic collapse.
(b) Radioprotective peptide RP-42 administration within 4 hours of SPE onset.
(c) Localized hydrogen-rich water supplementation to quench mitochondrial reactive oxygen species.`,
      sections: [
        {
          heading: '1. Executive Summary',
          page: 1,
          text: 'Deep-space exploration beyond LEO exposes crew members to continuous GCR heavy ions and sporadic high-flux solar particle events (SPE). Clustered lesions exhibit resistance to standard repair pathways.',
        },
        {
          heading: '2. Optical & Cellular Correlations',
          page: 4,
          text: 'High-LET heavy ions generate clustered damage sites with 8-15 distinct DSBs within a 2-micron radius, inducing ATM autophosphorylation and persistent γ-H2AX foci.',
        },
        {
          heading: '3. Biophysical Kinetics & Countermeasures',
          page: 9,
          text: 'Residual foci persist beyond 96 hours. NAD+ precursors (NMN), peptide RP-42, and intra-vehicular active magnetic shielding provide optimal multi-layer defense.',
        },
      ],
    },
    suggestedQueries: [
      'Correlate cosmic radiation dose with γ-H2AX foci count and calculate repair kinetics half-life.',
      'Identify optical clustered foci in the fluorescence scan and assess ATM kinase autophosphorylation.',
      'Formulate verified astronaut countermeasure protocols based on NASA GeneLab GLDS-421 findings.',
    ],
  },
  {
    id: 'mars-jezero',
    name: 'Mars Perseverance: SHERLOC Deep-UV Biosignature & Aromatic Carbon Verification',
    subtitle: 'Raman Spectral Resonance & Mineral Matrix Cross-Validation in Jezero Crater Delta',
    category: 'Planetary Astrobiology',
    organization: 'NASA Mars 2020 Science Team / LDV Labs Astrobiology',
    targetEnvironment: 'Jezero Crater Lacustrine Delta, Mars (Sol 782)',
    description: 'Scanning Habitable Environments with Raman & Luminescence for Organics and Chemicals (SHERLOC) investigation of abrasive rock target "Belva". Cross-examines deep-UV fluorescence imagery with Raman shift peaks and peer-reviewed abiotic vs biotic criteria.',
    image: {
      id: 'img-mars-sherloc',
      name: 'SHERLOC_Belva_Abrasive_Patch_UV_Fluorescence.png',
      url: marsSherlocAbrasiveSvg,
      mimeType: 'image/png',
      instrument: 'SHERLOC Deep-UV (248.6 nm) Native Fluorescence Imager',
      wavelengthOrStain: 'Deep-UV Luminescence false-color (250-380nm emission)',
      description: 'Abrasive target Belva showing spatial co-localization of aromatic organic ring clusters inside hydrated sulfate mineral veins.',
      fociAnnotations: [
        { x: 405, y: 295, radius: 22, label: 'Polycyclic Aromatic Core A1', intensity: 0.96 },
        { x: 435, y: 265, radius: 16, label: 'Aromatic Ring Cluster B2', intensity: 0.89 },
        { x: 375, y: 320, radius: 18, label: 'Sulfate Hydration Boundary', intensity: 0.82 },
      ],
    },
    dataset: {
      id: 'ds-mars-sherloc',
      name: 'sherloc_jezero_raman_spectral_peaks.csv',
      rowCount: 12,
      columns: ['wavelength_nm', 'raman_shift_cm1', 'normalized_intensity_au', 'baseline_continuum', 'signal_to_noise_ratio', 'organic_confidence_score'],
      primaryKey: 'raman_shift_cm1',
      description: 'High-resolution deep-UV Raman shift spectrum (cm⁻¹) capturing characteristic aromatic ring breathing (D-band) and stretching (G-band) vibrations.',
      csvContent: `wavelength_nm,raman_shift_cm1,normalized_intensity_au,baseline_continuum,signal_to_noise_ratio,organic_confidence_score
248.6,0.0,0.02,0.01,1.1,0.05
251.2,420.0,0.18,0.08,3.2,0.12
254.8,980.0,0.45,0.12,6.8,0.34
257.4,1150.0,0.58,0.14,8.4,0.48
259.9,1348.0,0.89,0.15,14.6,0.88
262.1,1420.0,0.41,0.16,5.9,0.41
263.8,1520.0,0.62,0.15,9.2,0.67
265.2,1605.0,1.05,0.15,18.2,0.94
268.0,1850.0,0.22,0.14,3.1,0.21
271.4,2250.0,0.15,0.12,2.0,0.15
278.2,2850.0,0.38,0.11,5.4,0.52
280.0,2920.0,0.44,0.10,6.2,0.61`,
    },
    document: {
      id: 'doc-nature-astro-2025',
      title: 'Peer-Reviewed Astrobiological Criteria for Mars Biosignature Verification',
      source: 'Nature Astronomy & Astrobiology Journal 2025',
      category: 'Planetary Biosignature Science',
      pageCount: 14,
      content: `NATURE ASTRONOMY PEER-REVIEWED SPECIAL PUBLICATION
TITLE: Disentangling Abiotic Fischer-Tropsch Synthesis from Ancient Biogenic Organic Signatures on Mars

1. INTRODUCTION & RAMAN SPECTROSCOPY CRITERIA
The detection of carbonaceous matter by the SHERLOC deep-UV Raman instrument in Jezero crater requires stringent multi-criteria verification. Purely abiotic processes (serpentinization, meteorite accretion, Fischer-Tropsch-type reactions) generate disordered carbonaceous macromolecules. In contrast, ancient biogenic precursors in lacustrine mudstones exhibit distinct 2-to-4 ring condensed polycyclic aromatic hydrocarbon (PAH) vibrational resonance.

2. KEY SPECTRAL FINGERPRINTS
- The D-band (disordered aromatic ring vibration) appears at 1345-1355 cm⁻¹.
- The G-band (sp² carbon in-plane stretching mode) centers at 1600-1610 cm⁻¹.
- The intensity ratio ID/IG between 0.75 and 0.95 indicates moderately organized aromatic carbon structures, consistent with kerogen-like material formed in aqueous depositional settings.

3. MINERAL CONTEXT & PLANETARY PROTECTION
Spatial association between aromatic fluorescence and hydrous magnesium/iron sulfates indicates preservation within an ancient lacustrine evaporite basin. Under COSPAR Planetary Protection guidelines, samples exhibiting ID/IG > 0.85 co-localized with hydrated sulfates warrant priority containment for Mars Sample Return (MSR).`,
      sections: [
        {
          heading: '1. Raman Diagnostic Criteria',
          page: 2,
          text: 'Abiotic reactions generate disordered carbon, whereas preserved biogenic precursors exhibit 2-to-4 ring aromatic resonance with D-band at ~1350 cm⁻¹ and G-band at ~1605 cm⁻¹.',
        },
        {
          heading: '2. Quantitative ID/IG Ratio Analysis',
          page: 5,
          text: 'ID/IG ratios between 0.75 and 0.95 denote moderately organized aromatic carbon, consistent with kerogen preservation in aqueous environments.',
        },
        {
          heading: '3. COSPAR Protocol & Sample Containment',
          page: 11,
          text: 'Abrasive targets with high-confidence organic resonance must be hermetically cached for Earth return analysis in BSL-4 astrobiology facilities.',
        },
      ],
    },
    suggestedQueries: [
      'Evaluate whether the Raman shift D-band (1348 cm⁻¹) and G-band (1605 cm⁻¹) ratio confirms organic biosignature criteria.',
      'Inspect the SHERLOC UV fluorescence image for spatial correlation between organic hotspots and mineral veins.',
      'Check findings against COSPAR Planetary Protection standards and recommend Mars Sample Return containment steps.',
    ],
  },
  {
    id: 'extremophile-biotech',
    name: 'Orbital Extremophile: Deinococcus radiodurans Microgravity Adaptation & Biomanufacturing',
    subtitle: 'Space-Resilient Antioxidant Carotenoid Biosynthesis in Simulated Microgravity (0.05g)',
    category: 'Microgravity Biomanufacturing',
    organization: 'ESA Bio-orbital Labs / KamandPrompt Biotech Track',
    targetEnvironment: 'ISS Columbus Laboratory / Lunar Surface Bioreactor',
    description: 'Autonomous evaluation of Deinococcus radiodurans cell wall thickening, Deinoxanthin antioxidant yield, and reactive oxygen species (ROS) quenching kinetics in microgravity for in-situ cosmic radiation biopolymers.',
    image: {
      id: 'img-extremophile-sem',
      name: 'Deinococcus_radiodurans_CryoSEM_Tetrad.png',
      url: extremophileSemSvg,
      mimeType: 'image/png',
      instrument: 'Cryo-Scanning Electron Microscope (FEI Helios G4)',
      wavelengthOrStain: 'Secondary Electron Beam Imaging (3 kV, WD 4.1mm)',
      description: 'Cryo-SEM micrograph of Deinococcus radiodurans tetrad showing prominent outer S-layer envelope thickening in simulated microgravity.',
      fociAnnotations: [
        { x: 320, y: 230, radius: 24, label: 'Cell Division Plane 1', intensity: 0.95 },
        { x: 480, y: 230, radius: 24, label: 'Cell Division Plane 2', intensity: 0.93 },
        { x: 400, y: 300, radius: 40, label: 'S-Layer Protective Envelope', intensity: 0.89 },
      ],
    },
    dataset: {
      id: 'ds-extremophile',
      name: 'extremophile_metabolic_kinetics.csv',
      rowCount: 12,
      columns: ['fermentation_hr', 'optical_density_OD600', 'deinoxanthin_mg_per_L', 'ROS_scavenging_pct', 'ATP_intracellular_uM', 'cell_wall_thickness_nm'],
      primaryKey: 'fermentation_hr',
      description: 'Continuous bioreactor telemetry monitoring cell growth, pigment titer, radical scavenging capacity, and membrane structural expansion.',
      csvContent: `fermentation_hr,optical_density_OD600,deinoxanthin_mg_per_L,ROS_scavenging_pct,ATP_intracellular_uM,cell_wall_thickness_nm
0.0,0.15,2.1,18.4,120.0,65.2
4.0,0.28,6.8,29.1,185.0,68.4
8.0,0.52,14.5,42.8,290.0,72.1
12.0,0.98,28.2,61.4,410.0,78.9
16.0,1.64,45.9,74.2,530.0,86.5
20.0,2.12,62.4,84.9,590.0,94.2
24.0,2.58,78.1,91.2,620.0,101.4
28.0,2.84,88.5,94.5,605.0,103.8
32.0,2.98,94.2,96.1,580.0,104.9
36.0,3.05,97.8,96.8,550.0,105.4
40.0,3.08,98.5,97.0,520.0,105.8
48.0,3.10,99.1,97.2,490.0,106.0`,
    },
    document: {
      id: 'doc-esa-extremophile',
      title: 'ESA Guidelines on Extremophilic Microbial Factories for Space Habitat Shielding',
      source: 'European Space Agency Advanced Concepts Team 2026',
      category: 'In-Situ Bio-manufacturing & Synthetic Biology',
      pageCount: 16,
      content: `ESA ADVANCED CONCEPTS TEAM TECHNICAL MEMORANDUM
TITLE: In-Situ Microbial Biosynthesis of Radioprotective Nanomaterials on Planetary Outposts

1. EXTREMOPHILE RESILIENCE IN MICROGRAVITY
Deinococcus radiodurans demonstrates exceptional tolerance to ionizing radiation (up to 15,000 Gy) and vacuum desiccation. Under simulated microgravity (0.05g), the organism initiates metabolic remodeling: cellular wall S-layer proteins undergo structural thickening (+35-40%), while the carotenoid pathway is hyper-activated.

2. DEINOXANTHIN AS A BIO-SHIELDING AGENT
Deinoxanthin, a unique C40 carotenoid synthesized by D. radiodurans, exhibits radical scavenging efficiency 50-fold higher than alpha-tocopherol and 2-fold higher than astaxanthin. Bioreactor yields exceeding 75 mg/L achieve >90% radical quenching in orbital cultures.

3. SCALABILITY FOR LUNAR/MARTIAN OUTPOSTS
Continuous fermentation using regolith-derived trace minerals (iron, magnesium) provides a renewable biopolymer shield. Dried Deinococcus biomass can be directly compounded into lunar habitat regolith mortar (GeoPoly-Bio) to attenuate cosmic ray secondary neutrons by up to 34%.`,
      sections: [
        {
          heading: '1. Structural Thickening in Microgravity',
          page: 3,
          text: 'In simulated microgravity, cell wall S-layer proteins expand by ~38 nm, providing enhanced physical shielding against osmotic stress and UV-C flux.',
        },
        {
          heading: '2. Deinoxanthin Radical Scavenging',
          page: 7,
          text: 'Deinoxanthin carotenoid titers exceeding 75 mg/L produce >90% radical scavenging capacity, far outperforming terrestrial antioxidants.',
        },
        {
          heading: '3. Lunar Regolith Biopolymer Shielding',
          page: 12,
          text: 'Compounding microbial biomass into lunar regolith geopolymer mortar attenuates secondary cosmic neutrons by up to 34%.',
        },
      ],
    },
    suggestedQueries: [
      'Correlate Deinoxanthin carotenoid yield with ROS scavenging percentage and determine optimal bioreactor harvest time.',
      'Analyze cell wall thickening in the Cryo-SEM micrograph and relate to microgravity structural adaptation.',
      'Generate an operational protocol for producing in-situ radiation shielding biopolymers on a lunar outpost.',
    ],
  },
];

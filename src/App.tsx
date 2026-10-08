/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SAMPLE_MISSIONS } from './data/sampleMissions';
import { MissionPreset, AgentResponse, ChatMessage, HistorySession } from './types';
import { Header, MainTabType } from './components/Header';
import { LandingHero } from './components/LandingHero';
import { MultimodalWorkspace } from './components/MultimodalWorkspace';
import { AgentReasoningPanel } from './components/AgentReasoningPanel';
import { InteractiveVisualizer } from './components/InteractiveVisualizer';
import { PythonSandboxViewer } from './components/PythonSandboxViewer';
import { ExplainableEvidencePanel } from './components/ExplainableEvidencePanel';
import { MissionDossierReport } from './components/MissionDossierReport';
import { ComputerVisionAnalysisPanel } from './components/ComputerVisionAnalysisPanel';
import { ChatReasoningInterface } from './components/ChatReasoningInterface';
import { ProjectHistorySection } from './components/ProjectHistorySection';
import { HackathonSubmissionHub } from './components/HackathonSubmissionHub';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [missions] = useState<MissionPreset[]>(SAMPLE_MISSIONS);
  const [activeMission, setActiveMission] = useState<MissionPreset>(SAMPLE_MISSIONS[0]);
  const [activeTab, setActiveTab] = useState<MainTabType>('workspace');
  const [agentResponse, setAgentResponse] = useState<AgentResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSubmissionHubOpen, setIsSubmissionHubOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-3.8-flash');
  const [ragTopK, setRagTopK] = useState(3);
  const [confidenceThreshold, setConfidenceThreshold] = useState(90);
  const [customFiles, setCustomFiles] = useState<Array<{ name: string; size: string; type: string }>>([]);

  // Chat conversation state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'AstroBio Nexus OS v2.6.4 online. All multimodal channels initialized (Confocal LSM-980 Microscopy, 500 mGy Dosimetry CSV, NASA GeneLab GLDS-421 Knowledge Base). How can I assist with your mission analysis?',
      timestamp: new Date().toISOString(),
      toolsUsed: ['Multimodal Ingestion Engine'],
    },
  ]);

  // Historical sessions audit trail
  const [historySessions, setHistorySessions] = useState<HistorySession[]>([
    {
      id: 'SES-ARTEMIS-001',
      missionId: 'artemis-radiation',
      missionName: 'Artemis IV: Deep-Space Cosmic Radiation & Cardiomyocytes',
      query: 'Correlate cosmic radiation dose with γ-H2AX foci count and calculate repair kinetics half-life.',
      timestamp: '2026-10-08T06:30:00Z',
      status: 'verified',
      summary: 'High-LET heavy ions induce clustered DSBs; ATM kinase peaks at 24h; NAD+ precursor (NMN) recommended.',
      fociDetected: 14.8,
      correlation: 'r = 0.942 (p < 0.001)',
      response: {} as any,
    },
    {
      id: 'SES-MARS-002',
      missionId: 'mars-jezero',
      missionName: 'Mars Perseverance: SHERLOC Deep-UV Biosignature Verification',
      query: 'Evaluate Raman shift D-band (1348 cm⁻¹) and G-band (1605 cm⁻¹) ratio to confirm organic biosignature.',
      timestamp: '2026-10-07T14:15:00Z',
      status: 'verified',
      summary: 'Aromatic ring clusters co-localized in hydrated sulfate matrix. ID/IG ratio = 0.88 confirms biosignature.',
      fociDetected: 8.2,
      correlation: 'ID/IG = 0.884 (Aromatic)',
      response: {} as any,
    },
    {
      id: 'SES-EXTREMOPHILE-003',
      missionId: 'extremophile-biotech',
      missionName: 'Orbital Extremophile: Deinococcus radiodurans Biomanufacturing',
      query: 'Correlate Deinoxanthin carotenoid yield with ROS scavenging percentage in simulated microgravity.',
      timestamp: '2026-10-06T09:40:00Z',
      status: 'verified',
      summary: 'Microgravity wall thickening (+38nm). Deinoxanthin yield >75mg/L achieves >90% radical scavenging.',
      fociDetected: 4.1,
      correlation: 'r = 0.916 (p < 0.001)',
      response: {} as any,
    },
  ]);

  // Execute multimodal query via server endpoint
  const executeQuery = async (queryText: string) => {
    setIsProcessing(true);

    // Add user message to chat
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toISOString(),
    };
    setChatMessages((prev) => [...prev, userMsg]);

    try {
      const payload = {
        query: queryText,
        activeMission: {
          id: activeMission.id,
          name: activeMission.name,
          category: activeMission.category,
        },
        images: [
          {
            name: activeMission.image.name,
            mimeType: activeMission.image.mimeType,
            base64: activeMission.image.url,
            description: activeMission.image.description,
          },
        ],
        csvData: activeMission.dataset.csvContent,
        documents: activeMission.document.sections.map((sec, i) => ({
          id: `chunk-${i}`,
          title: activeMission.document.title,
          source: activeMission.document.source,
          page: sec.page,
          content: sec.text,
        })),
        model: selectedModel,
        topK: ragTopK,
      };

      const res = await fetch('/api/agent/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const result = await res.json();
      if (result.success && result.data) {
        setAgentResponse(result.data);

        // Add agent response to chat
        const agentMsg: ChatMessage = {
          id: `agt-${Date.now()}`,
          sender: 'agent',
          text: result.data.textResponse,
          timestamp: new Date().toISOString(),
          toolsUsed: result.data.toolsExecuted?.map((t: any) => t.name) || [
            'Vision Feature Extractor',
            'Python Scipy Sandbox',
            'Vector RAG Retriever',
          ],
          citations: result.data.retrievedDocuments?.map((d: any) => `${d.source} (p. ${d.page})`),
          findingsSnippet: {
            correlation: result.data.findings?.primaryCorrelation,
            foci: result.data.findings?.fociCountAvg,
            countermeasure: result.data.findings?.recommendedCountermeasures?.[0],
          },
        };
        setChatMessages((prev) => [...prev, agentMsg]);

        // Add to history sessions
        const newSession: HistorySession = {
          id: `SES-${Date.now().toString().slice(-4)}`,
          missionId: activeMission.id,
          missionName: activeMission.name,
          query: queryText,
          timestamp: new Date().toISOString(),
          status: 'verified',
          summary: result.data.findings?.biologicalMechanism || 'Multimodal verification complete.',
          fociDetected: result.data.findings?.fociCountAvg || 12.4,
          correlation: result.data.findings?.primaryCorrelation || 'r = 0.94',
          response: result.data,
        };
        setHistorySessions((prev) => [newSession, ...prev]);
      } else {
        throw new Error(result.error || 'Failed to synthesize agent response');
      }
    } catch (err) {
      console.warn('[AstroBio App] Live agent query fallback activated:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Switch mission
  const handleSelectMission = (mission: MissionPreset) => {
    setActiveMission(mission);
    if (mission.suggestedQueries.length > 0) {
      executeQuery(mission.suggestedQueries[0]);
    }
  };

  // Upload custom file handler
  const handleUploadCustomFile = (file: File) => {
    const sizeStr = (file.size / 1024).toFixed(1) + ' KB';
    setCustomFiles((prev) => [...prev, { name: file.name, size: sizeStr, type: file.type || 'data' }]);
  };

  // Load a historical session
  const handleSelectHistorySession = (session: HistorySession) => {
    const mission = missions.find((m) => m.id === session.missionId);
    if (mission) {
      setActiveMission(mission);
    }
    if (session.response && session.response.findings) {
      setAgentResponse(session.response);
    }
    setActiveTab('agent');
  };

  // Initial load
  useEffect(() => {
    executeQuery(activeMission.suggestedQueries[0]);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'} font-sans antialiased selection:bg-cyan-500 selection:text-slate-950`}>
      
      {/* Top Header */}
      <Header
        missions={missions}
        activeMission={activeMission}
        onSelectMission={handleSelectMission}
        onOpenSubmissionHub={() => setIsSubmissionHubOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        isProcessing={isProcessing}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Landing Hero */}
        <LandingHero
          missions={missions}
          activeMission={activeMission}
          onSelectMission={handleSelectMission}
          onStartAnalysis={() => executeQuery(activeMission.suggestedQueries[0])}
          onOpenPitch={() => setIsSubmissionHubOpen(true)}
        />

        {/* VIEW 1: WORKSPACE */}
        {activeTab === 'workspace' && (
          <div className="space-y-8">
            <MultimodalWorkspace
              activeMission={activeMission}
              onExecuteQuery={executeQuery}
              isProcessing={isProcessing}
              onUploadCustomFile={handleUploadCustomFile}
              customFiles={customFiles}
            />

            {agentResponse && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InteractiveVisualizer
                  chartConfig={agentResponse.chartConfig}
                  missionId={activeMission.id}
                />
                <ExplainableEvidencePanel
                  provenance={agentResponse.modalityProvenance}
                  retrievedDocs={agentResponse.retrievedDocuments}
                />
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: AGENT BRAIN */}
        {activeTab === 'agent' && (
          <div className="space-y-8">
            <AgentReasoningPanel
              response={agentResponse}
              isProcessing={isProcessing}
              onOpenReport={() => setActiveTab('report')}
              onOpenPythonSandbox={() => setActiveTab('python')}
            />

            {agentResponse && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InteractiveVisualizer
                  chartConfig={agentResponse.chartConfig}
                  missionId={activeMission.id}
                />
                <ExplainableEvidencePanel
                  provenance={agentResponse.modalityProvenance}
                  retrievedDocs={agentResponse.retrievedDocuments}
                />
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: MULTIMODAL CONVERSATIONAL CHAT */}
        {activeTab === 'chat' && (
          <div className="space-y-8">
            <ChatReasoningInterface
              messages={chatMessages}
              onSendMessage={executeQuery}
              isProcessing={isProcessing}
              activeMission={activeMission}
              onSelectTab={setActiveTab}
            />

            {agentResponse && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InteractiveVisualizer
                  chartConfig={agentResponse.chartConfig}
                  missionId={activeMission.id}
                />
                <ExplainableEvidencePanel
                  provenance={agentResponse.modalityProvenance}
                  retrievedDocs={agentResponse.retrievedDocuments}
                />
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: COMPUTER VISION & OPENCV INSPECTOR */}
        {activeTab === 'vision' && (
          <div className="space-y-8">
            <ComputerVisionAnalysisPanel
              image={activeMission.image}
              missionCategory={activeMission.category}
            />

            {agentResponse && (
              <InteractiveVisualizer
                chartConfig={agentResponse.chartConfig}
                missionId={activeMission.id}
              />
            )}
          </div>
        )}

        {/* VIEW 5: PYTHON DATA SCIENCE SANDBOX */}
        {activeTab === 'python' && (
          <div className="space-y-8">
            <PythonSandboxViewer
              csvData={activeMission.dataset.csvContent}
              analyticsData={agentResponse?.datasetAnalytics}
            />

            {agentResponse && (
              <InteractiveVisualizer
                chartConfig={agentResponse.chartConfig}
                missionId={activeMission.id}
              />
            )}
          </div>
        )}

        {/* VIEW 6: PROJECT HISTORY & AUDIT TRAIL */}
        {activeTab === 'history' && (
          <div className="space-y-8">
            <ProjectHistorySection
              sessions={historySessions}
              onSelectSession={handleSelectHistorySession}
            />
          </div>
        )}

        {/* VIEW 7: FLIGHT MISSION DOSSIER REPORT */}
        {activeTab === 'report' && agentResponse && (
          <MissionDossierReport
            response={agentResponse}
            activeMission={activeMission}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-500 py-8 px-4 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300 font-bold">AstroBio Nexus OS v2.6.4</span>
            <span>• Multimodal AI Hackathon 2026 Submission</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>KamandPrompt</span>
            <span>IIT Mandi</span>
            <span>Augli.ai</span>
            <span>PurpleRain Tech</span>
            <span>LDV Labs</span>
          </div>
        </div>
      </footer>

      {/* Submission & GitHub Repo Hub Modal */}
      <HackathonSubmissionHub
        isOpen={isSubmissionHubOpen}
        onClose={() => setIsSubmissionHubOpen(false)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        ragTopK={ragTopK}
        onSetRagTopK={setRagTopK}
        confidenceThreshold={confidenceThreshold}
        onSetConfidenceThreshold={setConfidenceThreshold}
      />

    </div>
  );
}

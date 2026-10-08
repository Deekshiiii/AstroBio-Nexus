export interface ModalityItem {
  id: string;
  name: string;
  type: 'image' | 'dataset' | 'document';
  size?: string;
  timestamp: string;
}

export interface ImageModality {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  base64?: string;
  description: string;
  instrument: string;
  wavelengthOrStain: string;
  fociAnnotations?: Array<{
    x: number;
    y: number;
    radius: number;
    label: string;
    intensity: number;
    areaUm2?: number;
    classification?: string;
  }>;
}

export interface DatasetModality {
  id: string;
  name: string;
  csvContent: string;
  rowCount: number;
  columns: string[];
  description: string;
  primaryKey: string;
}

export interface DocumentModality {
  id: string;
  title: string;
  source: string;
  category: string;
  pageCount: number;
  content: string;
  sections: Array<{
    heading: string;
    page: number;
    text: string;
  }>;
}

export interface MissionPreset {
  id: string;
  name: string;
  subtitle: string;
  category: 'Space BioTech' | 'Planetary Astrobiology' | 'Microgravity Biomanufacturing';
  organization: string;
  targetEnvironment: string;
  description: string;
  image: ImageModality;
  dataset: DatasetModality;
  document: DocumentModality;
  suggestedQueries: string[];
}

export interface ToolExecution {
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  durationMs: number;
  details?: string;
}

export interface ReasoningTrace {
  step: number;
  phase: string;
  thought: string;
  toolUsed?: string;
}

export interface ProvenanceItem {
  modality: string;
  evidence: string;
  confidence: number;
  sourceTag: string;
}

export interface ChartDataPoint {
  [key: string]: string | number;
}

export interface ChartConfig {
  type: string;
  title: string;
  data: ChartDataPoint[];
}

export interface AgentFindings {
  title: string;
  fociCountAvg: number;
  damageClassification: string;
  primaryCorrelation: string;
  biologicalMechanism: string;
  recommendedCountermeasures: string[];
  chartType: string;
  chartData: ChartDataPoint[];
}

export interface AgentResponse {
  query: string;
  timestamp: string;
  modelUsed: string;
  toolsExecuted: ToolExecution[];
  agentReasoningTraces: ReasoningTrace[];
  findings: AgentFindings;
  textResponse: string;
  datasetAnalytics?: any;
  retrievedDocuments: Array<{
    id: string;
    title: string;
    source: string;
    page: number;
    score: number;
    excerpt: string;
    content?: string;
  }>;
  modalityProvenance: ProvenanceItem[];
  chartConfig: ChartConfig;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  toolsUsed?: string[];
  citations?: string[];
  modalitySource?: string;
  findingsSnippet?: {
    correlation?: string;
    foci?: number;
    countermeasure?: string;
  };
}

export interface HistorySession {
  id: string;
  missionId: string;
  missionName: string;
  query: string;
  timestamp: string;
  status: 'verified' | 'flagged' | 'archived';
  summary: string;
  fociDetected: number;
  correlation: string;
  response: AgentResponse;
}

export type VisionFilterMode = 'raw' | 'fluorescence_contrast' | 'edge_sobel' | 'threshold_segmentation' | 'composite';

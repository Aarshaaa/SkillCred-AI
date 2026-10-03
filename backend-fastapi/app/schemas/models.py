from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict

# 1. Speech-to-Text Contract
class STTRequest(BaseModel):
    candidate_id: str = Field(..., example="SC-1042")
    language: str = Field("hi", example="hi")
    audio_reference: Optional[str] = Field(None, example="/media/audio/sc-1042-intake.mp3")
    simulated_speech_text: Optional[str] = Field(None, example="Main pichle chhe saal se electrician ka kaam kar raha hoon...")

class STTResponse(BaseModel):
    candidate_id: str
    transcript: str
    language: str
    confidence: float
    processing_status: str = "completed"
    provider: str = "demo_whisper_adapter"

# 2. Skill Extraction Contract
class ExtractSkillsRequest(BaseModel):
    transcript: str
    trade_id: str = Field("electrical", example="electrical")
    candidate_id: Optional[str] = "SC-1042"

class ExtractedSkillItem(BaseModel):
    id: str
    title: str
    category: str  # technical | tools | safety | context
    confidence: float
    source_span: str

class ExtractSkillsResponse(BaseModel):
    candidate_id: str
    trade_id: str
    extracted_skills: List[ExtractedSkillItem]
    confidence: float
    processing_status: str = "completed"

# 3. Competency Mapping Contract
class MapCompetenciesRequest(BaseModel):
    candidate_id: str
    extracted_skills: List[ExtractedSkillItem]
    candidate_evidence: Optional[Dict[str, Any]] = None

class CompetencyItem(BaseModel):
    id: str
    code: str
    title: str
    nsqf_level: int
    preliminary_signal: str  # supported | needs_evidence | gap
    confidence_score: float
    ai_rationale: str
    source_evidence_refs: List[str]
    performance_criteria: List[str]

class MapCompetenciesResponse(BaseModel):
    candidate_id: str
    competencies: List[CompetencyItem]
    preliminary_readiness_score: int
    processing_status: str = "completed"

# 4. Basic Video Analysis Contract
class AnalyzeVideoRequest(BaseModel):
    candidate_id: str
    video_reference: str
    task_id: str = Field("TASK-ELE-01", example="TASK-ELE-01")

class ProcedureCheckpoint(BaseModel):
    step_name: str
    timestamp_secs: int
    detected: bool
    confidence: float
    observation_note: str

class SafetyIndicator(BaseModel):
    metric: str
    passed: bool
    confidence: float
    details: str

class AssessorReviewFlag(BaseModel):
    flag_type: str
    timestamp_secs: int
    reason: str
    action_recommended: str

class AnalyzeVideoResponse(BaseModel):
    candidate_id: str
    task_id: str
    technical_labeling: str = "Basic Video Analysis"
    procedure_checkpoints: List[ProcedureCheckpoint]
    safety_indicators: List[SafetyIndicator]
    assessor_review_flags: List[AssessorReviewFlag]
    processing_status: str = "completed"

# 5. Adaptive Assessment Contract
class AdaptiveAssessmentRequest(BaseModel):
    candidate_id: str
    trade_id: str
    previous_answers: Optional[List[Dict[str, Any]]] = []

class DiagnosticOption(BaseModel):
    id: str
    text: str
    is_safe_procedural: bool

class ScenarioQuestion(BaseModel):
    question_id: str
    scenario_title: str
    description: str
    image_url: Optional[str] = None
    competency_id: str
    options: List[DiagnosticOption]

class AdaptiveAssessmentResponse(BaseModel):
    candidate_id: str
    next_question: Optional[ScenarioQuestion]
    total_completed: int
    score_percentage: int
    reinforced_competencies: List[str]
    gap_competencies: List[str]

# 6. Gap Analysis Contract
class GapAnalysisRequest(BaseModel):
    candidate_id: str
    competencies: List[CompetencyItem]
    diagnostic_results: Optional[Dict[str, Any]] = None

class BridgeModuleItem(BaseModel):
    id: str
    title: str
    gap_addressed: str
    objective: str
    duration_hours: int
    suggested_activity: str
    reassessment_evidence_type: str
    status: str = "recommended"

class GapAnalysisResponse(BaseModel):
    candidate_id: str
    gaps: List[str]
    bridge_modules: List[BridgeModuleItem]
    recommended_sequence: List[str]

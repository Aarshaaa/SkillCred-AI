/**
 * SkillCred AI - MongoDB Document Schemas & Collections
 * Focus: Semi-structured evidence, raw audio transcripts, video frame analysis metadata, audit events
 */

// 1. Transcripts Collection (`transcripts`)
const TranscriptSchema = {
  _id: "ObjectId",
  candidate_id: "String (e.g. SC-1042)",
  language: "String (e.g. hi, ta, mr, bn, en)",
  audio_storage_url: "String (Cloud Object Storage URI)",
  audio_duration_seconds: "Number",
  raw_transcript: "String",
  edited_transcript: "String",
  extracted_skills: [
    {
      skill_id: "String",
      title: "String",
      category: "String",
      confidence: "Number (0-1)",
      source_span: "String"
    }
  ],
  stt_provider: "String (e.g. Whisper-Large-v3 / MockAdapter)",
  created_at: "Date"
};

// 2. Video Analysis Metadata Collection (`video_analyses`)
const VideoAnalysisSchema = {
  _id: "ObjectId",
  candidate_id: "String",
  task_id: "String (e.g. TASK-ELE-01)",
  task_title: "String",
  video_storage_url: "String (Cloud Object Storage URI)",
  thumbnail_url: "String",
  duration_seconds: "Number",
  technical_labeling: "Basic Video Analysis",
  procedure_checkpoints: [
    {
      step_name: "String",
      timestamp_secs: "Number",
      detected: "Boolean",
      confidence: "Number",
      observation_note: "String"
    }
  ],
  safety_indicators: [
    {
      metric: "String (e.g. PPE Gloves, Safety Glasses, Zero-Voltage Verification)",
      passed: "Boolean",
      confidence: "Number",
      details: "String"
    }
  ],
  assessor_review_flags: [
    {
      flag_type: "String (e.g. UNCERTAIN_ISOLATION_CHECK)",
      timestamp_secs: "Number",
      reason: "String",
      action_recommended: "String"
    }
  ],
  processed_at: "Date"
};

// 3. Situational Diagnostic Attempts Collection (`diagnostic_attempts`)
const DiagnosticAttemptSchema = {
  _id: "ObjectId",
  candidate_id: "String",
  trade_id: "String",
  total_scenarios: "Number",
  completed_scenarios: "Number",
  adaptive_path: [
    {
      question_id: "String",
      scenario_title: "String",
      selected_option_id: "String",
      is_correct: "Boolean",
      competency_impacted: "String",
      adaptive_trigger: "String"
    }
  ],
  score_percentage: "Number",
  reinforced_competencies: ["String"],
  gap_competencies: ["String"],
  completed_at: "Date"
};

// 4. Immutable Audit Events Collection (`audit_events`)
const AuditEventSchema = {
  _id: "ObjectId",
  timestamp: "Date",
  candidate_id: "String",
  actor: {
    user_id: "String",
    name: "String",
    role: "String (candidate | assessor | ai_system | admin)"
  },
  action: "String (e.g. ONBOARDED | VOICE_SUBMITTED | COMPETENCY_MAPPED | EVIDENCE_REQUESTED | FINAL_DECISION_SUBMITTED)",
  object_type: "String (e.g. CandidateProfile | VideoEvidence | CompetencyMap | AssessmentCase)",
  object_id: "String",
  payload_summary: "Object",
  ip_address: "String",
  trust_verification: {
    human_in_loop_enforced: "Boolean",
    ai_preliminary_only: "Boolean"
  }
};

module.exports = {
  TranscriptSchema,
  VideoAnalysisSchema,
  DiagnosticAttemptSchema,
  AuditEventSchema
};

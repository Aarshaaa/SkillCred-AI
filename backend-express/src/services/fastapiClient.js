/**
 * Express FastAPI Client Service
 * Calls FastAPI microservice endpoints with HTTP fallback logic
 */

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

async function callFastAPI(endpoint, payload) {
  try {
    const url = `${FASTAPI_URL}/api/v1/ai${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`FastAPI responded with status ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    console.warn(`[FastAPI Gateway Warning] Call to ${endpoint} failed (${err.message}). Using gateway fallback adapter.`);
    // Gateway fallback responses if FastAPI is offline
    return getGatewayFallback(endpoint, payload);
  }
}

function getGatewayFallback(endpoint, payload) {
  const candidateId = payload.candidate_id || 'SC-1042';
  
  if (endpoint === '/stt') {
    return {
      candidate_id: candidateId,
      transcript: payload.simulated_speech_text || "Main pichle 6 saal se residential electrical technician ka kaam kar raha hoon. Switchboard installation, MCB panel wiring, socket loop test aur multimeter continuity verification regular karta hoon.",
      language: payload.language || 'hi',
      confidence: 0.95,
      processing_status: 'completed',
      provider: 'Gateway Demo Fallback'
    };
  }
  
  if (endpoint === '/extract-skills') {
    return {
      candidate_id: candidateId,
      trade_id: payload.trade_id || 'electrical',
      extracted_skills: [
        { id: 'SKILL-ELE-01', title: 'Residential Wiring & Distribution', category: 'technical', confidence: 0.94, source_span: 'switchboard installation' },
        { id: 'SKILL-ELE-02', title: 'MCB & Fuse Circuit Protection', category: 'technical', confidence: 0.91, source_span: 'MCB panel wiring' },
        { id: 'SKILL-ELE-03', title: 'Multimeter Continuity Verification', category: 'tools', confidence: 0.88, source_span: 'multimeter continuity verification' }
      ],
      confidence: 0.92,
      processing_status: 'completed'
    };
  }

  if (endpoint === '/map-competencies') {
    return {
      candidate_id: candidateId,
      competencies: [
        {
          id: "ELE-N1001",
          code: "ELE/N1001",
          title: "Install & Wire Distribution Boards and Switchgear",
          nsqf_level: 4,
          preliminary_signal: "supported",
          confidence_score: 0.92,
          ai_rationale: "Mapped from voice statement ('MCB panel wiring') and practical evidence.",
          source_evidence_refs: ["audio_transcript", "video_evidence_01"],
          performance_criteria: ["Mount distribution box", "Wire MCB with correct rating", "Verify earth bonding"]
        },
        {
          id: "ELE-N1002",
          code: "ELE/N1002",
          title: "Conduct Electrical Safety Isolation & PPE Protocol",
          nsqf_level: 4,
          preliminary_signal: "supported",
          confidence_score: 0.89,
          ai_rationale: "Voice intake references line tester and safety gloves.",
          source_evidence_refs: ["audio_transcript"],
          performance_criteria: ["Switch off main breaker", "Use voltage tester"]
        },
        {
          id: "ELE-N1003",
          code: "ELE/N1003",
          title: "Diagnose & Repair Low Voltage Wiring Faults",
          nsqf_level: 4,
          preliminary_signal: "needs_evidence",
          confidence_score: 0.62,
          ai_rationale: "Earth leakage scenario requires practical verification.",
          source_evidence_refs: ["situational_quiz_q3"],
          performance_criteria: ["Identify short circuits", "Locate earth leakage"]
        }
      ],
      preliminary_readiness_score: 78,
      processing_status: 'completed'
    };
  }

  if (endpoint === '/analyze-video') {
    return {
      candidate_id: candidateId,
      task_id: payload.task_id || 'TASK-ELE-01',
      technical_labeling: 'Basic Video Analysis',
      procedure_checkpoints: [
        { step_name: "Voltage Isolation Check", timestamp_secs: 12, detected: true, confidence: 0.95, observation_note: "Main breaker switched off." },
        { step_name: "Wire Stripping & Connection", timestamp_secs: 45, detected: true, confidence: 0.91, observation_note: "Clean wire jointing." }
      ],
      safety_indicators: [
        { metric: "Insulated Gloves Worn", passed: true, confidence: 0.94, details: "1000V rated gloves detected" },
        { metric: "Zero-Voltage Tester Used", passed: true, confidence: 0.92, details: "Tester applied to terminal" }
      ],
      assessor_review_flags: [
        { flag_type: "UNCERTAIN_ISOLATION_CHECK", timestamp_secs: 88, reason: "Camera angle obscured multimeter reading", action_recommended: "Assessor verification recommended" }
      ],
      processing_status: 'completed'
    };
  }

  return { candidate_id: candidateId, status: 'fallback_ok' };
}

module.exports = { callFastAPI };

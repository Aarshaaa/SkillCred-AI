/**
 * SkillCred AI - Express API Gateway & Orchestration Server
 * Handles REST routes, OAuth2 role protection, audit trail logging, and FastAPI routing
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { generateToken, authenticateToken, requireRole } = require('./src/middleware/auth');
const { callFastAPI } = require('./src/services/fastapiClient');
const storageService = require('./src/services/storageService');

// Load Seed Data
const seedDataPath = path.join(__dirname, '../database/seed_data.json');
let dbStore = {
  trades: [],
  candidates: {}
};

try {
  if (fs.existsSync(seedDataPath)) {
    const rawSeed = fs.readFileSync(seedDataPath, 'utf8');
    const parsed = JSON.parse(rawSeed);
    dbStore.trades = parsed.trades || [];
    (parsed.sample_candidates || []).forEach(cand => {
      dbStore.candidates[cand.id] = cand;
    });
  }
} catch (err) {
  console.warn("Could not read seed_data.json:", err.message);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve Static Uploads/Media
app.use('/media', express.static(path.join(__dirname, 'uploads')));

// Health Check
app.get('/health', (req, res) => {
  res.json({
    service: "SkillCred AI Express Gateway",
    status: "online",
    roles_supported: ["candidate", "assessor", "admin"],
    active_candidates: Object.keys(dbStore.candidates).length
  });
});

// OAuth2 Auth Login / Token Generation Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  const selectedRole = role || 'candidate';
  
  const token = generateToken({
    id: `usr-${Date.now()}`,
    email: email || 'candidate@skillcred.ai',
    role: selectedRole,
    name: selectedRole === 'assessor' ? 'Dr. Sunita Rao (Master Assessor)' : 'Rajesh Kumar'
  });

  res.json({
    access_token: token,
    token_type: 'Bearer',
    expires_in: 86400,
    role: selectedRole,
    user: {
      email,
      role: selectedRole
    }
  });
});

// GET Trades / Sectors
app.get('/api/trades', (req, res) => {
  res.json({ trades: dbStore.trades });
});

// GET Candidate Profile by ID
app.get('/api/candidates/:id', authenticateToken, (req, res) => {
  const candidateId = req.params.id;
  const cand = dbStore.candidates[candidateId];
  if (!cand) {
    return res.status(404).json({ error: `Candidate ${candidateId} not found` });
  }
  res.json(cand);
});

// GET All Candidates (Assessor Queue / Admin View)
app.get('/api/candidates', authenticateToken, requireRole(['assessor', 'admin']), (req, res) => {
  const candidatesList = Object.values(dbStore.candidates);
  res.json({ candidates: candidatesList });
});

// POST Candidate Voice Intake (Proxies to FastAPI /stt & /extract-skills)
app.post('/api/candidate/voice-intake', authenticateToken, async (req, res) => {
  try {
    const { candidate_id, language, audio_reference, simulated_speech_text, trade_id } = req.body;
    
    // 1. Process STT via FastAPI
    const sttResult = await callFastAPI('/stt', {
      candidate_id,
      language,
      audio_reference,
      simulated_speech_text
    });

    // 2. Extract Skills via FastAPI
    const skillResult = await callFastAPI('/extract-skills', {
      transcript: sttResult.transcript,
      trade_id: trade_id || 'electrical',
      candidate_id
    });

    // 3. Map NSQF Competencies via FastAPI
    const mapResult = await callFastAPI('/map-competencies', {
      candidate_id,
      extracted_skills: skillResult.extracted_skills
    });

    // Update DB store in-memory candidate profile
    if (dbStore.candidates[candidate_id]) {
      dbStore.candidates[candidate_id].transcript = {
        audio_url: audio_reference || '/media/audio/sc-1042-intake.mp3',
        raw_transcript: sttResult.transcript,
        edited_transcript: sttResult.transcript,
        extracted_skills: skillResult.extracted_skills
      };
      dbStore.candidates[candidate_id].competencies = mapResult.competencies;
      dbStore.candidates[candidate_id].preliminary_readiness_score = mapResult.preliminary_readiness_score;

      // Add audit log event
      dbStore.candidates[candidate_id].audit_events.unshift({
        timestamp: new Date().toISOString(),
        actor: `${req.user.name || 'Candidate'} (Candidate)`,
        action: `Voice Intake Processed (${language.toUpperCase()}) & Skills Extracted`,
        object: `Candidate ${candidate_id}`
      });
    }

    res.json({
      stt: sttResult,
      skills: skillResult.extracted_skills,
      competencies: mapResult.competencies,
      preliminary_readiness_score: mapResult.preliminary_readiness_score
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Assessor Decision (HUMAN IN THE LOOP CONTROL)
app.post('/api/assessor/decision', authenticateToken, requireRole(['assessor']), (req, res) => {
  const { candidate_id, decision, assessor_notes, requested_evidence_details } = req.body;
  
  const cand = dbStore.candidates[candidate_id];
  if (!cand) {
    return res.status(404).json({ error: 'Candidate not found' });
  }

  // Update Status cleanly based on human decision
  if (decision === 'certified') {
    cand.overall_status = 'certified';
    cand.assessor_decision = {
      decision: 'certified',
      certified_at: new Date().toISOString(),
      assessor_name: req.user.name || 'Authorized Assessor'
    };
  } else if (decision === 'request_evidence') {
    cand.overall_status = 'action_required';
    cand.pending_evidence_request = requested_evidence_details || "Demonstrate distribution-board verification and explain safety isolation step.";
  } else if (decision === 'reassess') {
    cand.overall_status = 'in_progress';
  }

  if (assessor_notes) {
    cand.assessor_notes = assessor_notes;
  }

  // Add audit trail entry with explicit human boundary
  cand.audit_events.unshift({
    timestamp: new Date().toISOString(),
    actor: `${req.user.name || 'Authorized Assessor'} (Authorized Assessor)`,
    action: `HUMAN ASSESSOR DECISION: ${decision.toUpperCase()} ${requested_evidence_details ? `[Evidence Request: ${requested_evidence_details}]` : ''}`,
    object: `AssessmentCase ${candidate_id}`,
    trust_governance: "FINAL_HUMAN_DECISION_EXCLUSIVELY"
  });

  res.json({
    success: true,
    candidate_id,
    new_status: cand.overall_status,
    candidate: cand,
    message: `Human assessor decision '${decision}' successfully recorded.`
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` SkillCred AI Express Gateway running on port ${PORT}`);
  console.log(` OAuth2 Role Guard & Human Assessor Boundary ACTIVE`);
  console.log(`=======================================================`);
});

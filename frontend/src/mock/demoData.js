export const demoCandidates = {
  "SC-1042": {
    id: "SC-1042",
    full_name: "Rajesh Kumar Sharma",
    trade_id: "electrical",
    trade_title: "Domestic & Commercial Electrician",
    years_experience: 6.0,
    location: "Jaipur, Rajasthan",
    preferred_language: "hi",
    preliminary_readiness_score: 78,
    overall_status: "ready_for_review",
    transcript: {
      audio_url: "/media/audio/sc-1042-intake.mp3",
      raw_transcript: "Main pichle chhe saal se local electrician ka kaam kar raha hoon. Gharelu wiring, switchboard fitting, miniature circuit breaker (MCB) installation aur distribution box assembly achhi tarah janta hoon. Multimeter se continuity test karta hoon.",
      edited_transcript: "Main pichle 6 saal se residential electrical technician ka kaam kar raha hoon. Switchboard installation, MCB panel wiring, socket loop test aur multimeter continuity verification regular karta hoon. Safety ke liye rubber gloves aur line tester use karta hoon.",
      extracted_skills: [
        { id: "SKILL-ELE-01", title: "Residential Wiring & Distribution", category: "technical", confidence: 0.94, source_span: "gharelu wiring, switchboard fitting" },
        { id: "SKILL-ELE-02", title: "MCB & Fuse Circuit Protection", category: "technical", confidence: 0.91, source_span: "miniature circuit breaker (MCB) installation" },
        { id: "SKILL-ELE-03", title: "Multimeter Continuity Verification", category: "tools", confidence: 0.88, source_span: "multimeter se continuity test" },
        { id: "SKILL-ELE-04", title: "Electrical Safety & Personal Isolation", category: "safety", confidence: 0.85, source_span: "rubber gloves aur line tester" }
      ]
    },
    competencies: [
      {
        id: "ELE-N1001",
        code: "ELE/N1001",
        nsqf_level: 4,
        title: "Install & Wire Distribution Boards and Switchgear",
        preliminary_signal: "supported",
        confidence_score: 0.92,
        ai_rationale: "Mapped from voice transcript ('MCB panel wiring') and confirmed in practical video checkpoint #2.",
        source_evidence_refs: ["audio_transcript_v1", "video_evidence_01"]
      },
      {
        id: "ELE-N1002",
        code: "ELE/N1002",
        nsqf_level: 4,
        title: "Conduct Electrical Safety Isolation & PPE Protocol",
        preliminary_signal: "supported",
        confidence_score: 0.89,
        ai_rationale: "Voice intake references rubber gloves & tester. Practical video confirms main switch isolation before wire stripping.",
        source_evidence_refs: ["audio_transcript_v1", "video_evidence_01"]
      },
      {
        id: "ELE-N1003",
        code: "ELE/N1003",
        nsqf_level: 4,
        title: "Diagnose & Repair Low Voltage Wiring Faults",
        preliminary_signal: "needs_evidence",
        confidence_score: 0.62,
        ai_rationale: "Candidate mentioned 3-phase fault diagnosis needs practice. Multimeter continuity verified, but complex earth-leakage scenario requires practical verification.",
        source_evidence_refs: ["situational_quiz_q3"]
      }
    ],
    video_evidence: {
      video_url: "/media/video/sc-1042-practical.mp4",
      duration_seconds: 120,
      technical_labeling: "Basic Video Analysis",
      procedure_checkpoints: [
        { step_name: "Voltage Isolation Check", timestamp_secs: 12, detected: true, confidence: 0.95, observation_note: "Main breaker switched off prior to panel cover removal." },
        { step_name: "Wire Stripping & Screwing", timestamp_secs: 45, detected: true, confidence: 0.91, observation_note: "Stripped 10mm copper cable without damaging strands." },
        { step_name: "Earth Continuity Verification", timestamp_secs: 88, detected: true, confidence: 0.86, observation_note: "Multimeter probe attached to earthing point." }
      ],
      safety_indicators: [
        { metric: "Insulated Gloves Worn", passed: true, confidence: 0.94, details: "1000V rated gloves detected" },
        { metric: "Zero-Voltage Tester Used", passed: true, confidence: 0.92, details: "Neon tester applied to phase terminal" },
        { metric: "Safety Glasses Worn", passed: false, confidence: 0.70, details: "Eye protection not worn" }
      ],
      assessor_review_flags: [
        { flag_type: "UNCERTAIN_ISOLATION_CHECK", timestamp_secs: 88, reason: "Camera angle obscured multimeter reading.", action_recommended: "Assessor verification recommended." }
      ]
    },
    bridge_pathway: [
      {
        id: "MOD-ELE-01",
        title: "3-Phase Commercial Fault Diagnostics & RCCB Testing",
        gap_addressed: "Earth Leakage & 3-Phase Troubleshooting (ELE-N1003)",
        objective: "Master digital insulation testing and 3-phase neutral fault tracing",
        duration_hours: 8,
        suggested_activity: "Simulated fault panel diagnostic exercise using clamp meter",
        reassessment_evidence_type: "video_practical",
        status: "recommended"
      }
    ],
    assessor_notes: "Candidate displays strong practical wiring skills. Recommended for RPL certification upon clarification of earth leakage test.",
    audit_events: [
      { timestamp: "2026-10-01T09:30:00Z", actor: "Rajesh Kumar (Candidate)", action: "Candidate Onboarded & Language Selected (Hindi)", object: "SC-1042" },
      { timestamp: "2026-10-01T09:35:12Z", actor: "AI Service (FastAPI)", action: "Multilingual Voice Intake Processed & Skills Extracted", object: "Transcript-01" },
      { timestamp: "2026-10-01T09:42:00Z", actor: "AI Service (FastAPI)", action: "NSQF Competency Matrix Generated (Readiness: 78%)", object: "CompetencyMap-01" },
      { timestamp: "2026-10-01T10:15:30Z", actor: "Rajesh Kumar (Candidate)", action: "Practical Wiring Video Evidence Uploaded", object: "Video-01" },
      { timestamp: "2026-10-01T10:18:45Z", actor: "AI Service (FastAPI)", action: "Basic Video Analysis Indicators Generated", object: "VideoAnalysis-01" }
    ]
  },
  "SC-1098": {
    id: "SC-1098",
    full_name: "Anita Devi",
    trade_id: "tailoring",
    trade_title: "Apparel & Garment Tailor",
    years_experience: 4.5,
    location: "Lucknow, Uttar Pradesh",
    preferred_language: "hi",
    preliminary_readiness_score: 82,
    overall_status: "ready_for_review",
    transcript: {
      raw_transcript: "Main 4.5 saal se custom apparel tailoring karti hoon. Pattern drafting, measurement chart, zipper attachment aur overlock machine maintenance achhi tarah janta hoon.",
      extracted_skills: [
        { id: "SKILL-TAI-01", title: "Garment Pattern Drafting & Cutting", category: "technical", confidence: 0.95, source_span: "pattern drafting" },
        { id: "SKILL-TAI-02", title: "Industrial Overlock Machine Operation", category: "tools", confidence: 0.92, source_span: "overlock machine" }
      ]
    },
    competencies: [
      { id: "AMH-N0101", code: "AMH/N0101", nsqf_level: 4, title: "Draft & Cut Patterns for Ladies Garments", preliminary_signal: "supported", confidence_score: 0.94, ai_rationale: "Pattern drafting confirmed in video evidence.", source_evidence_refs: ["audio_transcript_sc1098"] }
    ],
    video_evidence: {
      technical_labeling: "Basic Video Analysis",
      procedure_checkpoints: [{ step_name: "Pattern Alignment", timestamp_secs: 15, detected: true, confidence: 0.92, observation_note: "Fabric grain aligned." }],
      safety_indicators: [{ metric: "Finger Guard on Sewing Machine", passed: true, confidence: 0.96, details: "Safety guard observed" }],
      assessor_review_flags: []
    },
    bridge_pathway: [],
    audit_events: [{ timestamp: "2026-10-02T11:00:00Z", actor: "Anita Devi (Candidate)", action: "Candidate Onboarded", object: "SC-1098" }]
  },
  "SC-1131": {
    id: "SC-1131",
    full_name: "Muthu Velu",
    trade_id: "plumbing",
    trade_title: "Plumbing & Piping Technician",
    years_experience: 5.0,
    location: "Chennai, Tamil Nadu",
    preferred_language: "ta",
    preliminary_readiness_score: 71,
    overall_status: "action_required",
    pending_evidence_request: "Demonstrate solvent jointing safety isolation and use of eye protection during pipe cutting.",
    transcript: {
      raw_transcript: "5 years experience in domestic plumbing, CPVC pipe solvent welding, overhead tank piping and hydraulic pressure testing.",
      extracted_skills: [
        { id: "SKILL-PLU-01", title: "CPVC & PVC Pipe Solvent Jointing", category: "technical", confidence: 0.93, source_span: "solvent welding" }
      ]
    },
    competencies: [
      { id: "PSC-N0102", code: "PSC/N0102", nsqf_level: 3, title: "Perform Pipe Jointing & Water Tightness Testing", preliminary_signal: "supported", confidence_score: 0.88, ai_rationale: "Solvent welding verified.", source_evidence_refs: ["audio_transcript_sc1131"] }
    ],
    video_evidence: {
      technical_labeling: "Basic Video Analysis",
      procedure_checkpoints: [{ step_name: "Pipe Deburring", timestamp_secs: 18, detected: true, confidence: 0.89, observation_note: "Burrs removed." }],
      safety_indicators: [{ metric: "Eye Goggles During Pipe Cutting", passed: false, confidence: 0.82, details: "No eye shield worn." }],
      assessor_review_flags: [{ flag_type: "SAFETY_PPE_MISSING", timestamp_secs: 14, reason: "No eye protection during pipe cutting.", action_recommended: "Assessor safety review requested." }]
    },
    bridge_pathway: [
      { id: "MOD-PLU-01", title: "Occupational Safety & Eye Protection", gap_addressed: "PPE Protocol", objective: "Learn safety standards", duration_hours: 4, suggested_activity: "Safety checklist review", reassessment_evidence_type: "situational", status: "recommended" }
    ],
    audit_events: [{ timestamp: "2026-10-03T08:15:00Z", actor: "Muthu Velu (Candidate)", action: "Candidate Onboarded (Tamil)", object: "SC-1131" }]
  }
};

"""
SkillCred AI Adapter Interface Pattern
Supports seamless plugging of:
- Whisper STT / Bhashini Voice APIs
- SpaCy / HuggingFace / OpenAI Skill Extractors
- OpenCV / YOLO Basic Video Analyzers
With reliable, deterministic demo fallback payloads when credentials are missing.
"""

from app.schemas.models import (
    STTResponse, ExtractSkillsResponse, ExtractedSkillItem,
    MapCompetenciesResponse, CompetencyItem, AnalyzeVideoResponse,
    ProcedureCheckpoint, SafetyIndicator, AssessorReviewFlag,
    AdaptiveAssessmentResponse, ScenarioQuestion, DiagnosticOption,
    GapAnalysisResponse, BridgeModuleItem
)

class AIAdapter:
    @staticmethod
    def process_stt(candidate_id: str, language: str, simulated_text: str = None) -> STTResponse:
        transcripts_by_lang = {
            "hi": "Main pichle 6 saal se residential electrical technician ka kaam kar raha hoon. Switchboard installation, MCB panel wiring, socket loop test aur multimeter continuity verification regular karta hoon. Safety ke liye rubber gloves aur line tester use karta hoon.",
            "ta": "Naan 5 varushama domestic plumbing and piping technician-a velai seiyaren. CPVC pipe solvent jointing, water pressure pump testing, bathroom fixture fitting ellam nalla theriyum.",
            "mr": "Me pichhli 5 varse tailoring and garment designing ka kam kartoy. Pattern drafting, overlock machine operation and blouse stitching khup achhya padhatine karto.",
            "bn": "Ami goto 6 bochhor dhore electrician kaaj korchhi. Household wiring, distribution board fitting abong multimeter continuity check aamar bhalo obhyas aachhe.",
            "en": "I have been working as a residential electrical and maintenance technician for 6 years. I regularly perform distribution board wiring, MCB installation, multimeter testing and isolate mains prior to work."
        }
        
        selected_text = simulated_text or transcripts_by_lang.get(language, transcripts_by_lang["hi"])
        
        return STTResponse(
            candidate_id=candidate_id,
            transcript=selected_text,
            language=language,
            confidence=0.96,
            processing_status="completed",
            provider="Adapter: OpenAI Whisper-v3 / Bhashini Multilingual API [Demo Mode]"
        )

    @staticmethod
    def extract_skills(transcript: str, trade_id: str, candidate_id: str = "SC-1042") -> ExtractSkillsResponse:
        if trade_id == "tailoring":
            skills = [
                ExtractedSkillItem(id="SKILL-TAI-01", title="Garment Pattern Drafting & Cutting", category="technical", confidence=0.95, source_span="pattern drafting, measurement chart"),
                ExtractedSkillItem(id="SKILL-TAI-02", title="Industrial Overlock Machine Operation", category="tools", confidence=0.92, source_span="industrial motor machine, overlock"),
                ExtractedSkillItem(id="SKILL-TAI-03", title="Zipper Attachment & Seam Finishing", category="technical", confidence=0.89, source_span="zipper attachment, interlocking")
            ]
        elif trade_id == "plumbing":
            skills = [
                ExtractedSkillItem(id="SKILL-PLU-01", title="CPVC Pipe Solvent Jointing", category="technical", confidence=0.93, source_span="CPVC, PVC pipe jointing, solvent cement"),
                ExtractedSkillItem(id="SKILL-PLU-02", title="Hydraulic Pressure Leak Testing", category="technical", confidence=0.87, source_span="leakage testing hydro pump")
            ]
        else: # electrical
            skills = [
                ExtractedSkillItem(id="SKILL-ELE-01", title="Residential Wiring & Distribution", category="technical", confidence=0.94, source_span="gharelu wiring, switchboard fitting"),
                ExtractedSkillItem(id="SKILL-ELE-02", title="MCB & Fuse Circuit Protection", category="technical", confidence=0.91, source_span="miniature circuit breaker (MCB) installation"),
                ExtractedSkillItem(id="SKILL-ELE-03", title="Multimeter Continuity & Measurement", category="tools", confidence=0.88, source_span="multimeter se continuity test"),
                ExtractedSkillItem(id="SKILL-ELE-04", title="Electrical Safety & Personal Isolation", category="safety", confidence=0.85, source_span="rubber gloves aur line tester")
            ]
            
        return ExtractSkillsResponse(
            candidate_id=candidate_id,
            trade_id=trade_id,
            extracted_skills=skills,
            confidence=0.92,
            processing_status="completed"
        )

    @staticmethod
    def map_competencies(candidate_id: str, skills: list) -> MapCompetenciesResponse:
        competencies = [
            CompetencyItem(
                id="ELE-N1001",
                code="ELE/N1001",
                title="Install & Wire Distribution Boards and Switchgear",
                nsqf_level=4,
                preliminary_signal="supported",
                confidence_score=0.92,
                ai_rationale="Mapped from voice transcript ('MCB panel wiring, socket loop test') and confirmed in practical video checkpoint #2.",
                source_evidence_refs=["audio_transcript_v1", "video_evidence_01"],
                performance_criteria=["Mount distribution box securely on wall", "Wire MCB with correct amperage rating", "Verify earth bonding continuity"]
            ),
            CompetencyItem(
                id="ELE-N1002",
                code="ELE/N1002",
                title="Conduct Electrical Safety Isolation & PPE Protocol",
                nsqf_level=4,
                preliminary_signal="supported",
                confidence_score=0.89,
                ai_rationale="Voice intake references rubber gloves & tester. Practical video confirms main switch isolation before wire stripping.",
                source_evidence_refs=["audio_transcript_v1", "video_evidence_01"],
                performance_criteria=["Switch off main isolation breaker before touching panel", "Use insulated tools rated for voltage", "Verify zero voltage with tester before proceeding"]
            ),
            CompetencyItem(
                id="ELE-N1003",
                code="ELE/N1003",
                title="Diagnose & Repair Low Voltage Wiring Faults",
                nsqf_level=4,
                preliminary_signal="needs_evidence",
                confidence_score=0.62,
                ai_rationale="Candidate mentioned 3-phase fault diagnosis needs more practice. Multimeter continuity verified, but complex earth-leakage scenario requires practical verification.",
                source_evidence_refs=["situational_quiz_q3"],
                performance_criteria=["Identify short circuits using resistance measurement", "Locate earth ground leakage currents", "Replace damaged insulation safely"]
            )
        ]
        
        return MapCompetenciesResponse(
            candidate_id=candidate_id,
            competencies=competencies,
            preliminary_readiness_score=78,
            processing_status="completed"
        )

    @staticmethod
    def analyze_video(candidate_id: str, video_ref: str, task_id: str) -> AnalyzeVideoResponse:
        return AnalyzeVideoResponse(
            candidate_id=candidate_id,
            task_id=task_id,
            technical_labeling="Basic Video Analysis",
            procedure_checkpoints=[
                ProcedureCheckpoint(step_name="Voltage Isolation Check", timestamp_secs=12, detected=True, confidence=0.95, observation_note="Main breaker switched off prior to panel cover removal."),
                ProcedureCheckpoint(step_name="Wire Stripping & Terminal Screw", timestamp_secs=45, detected=True, confidence=0.91, observation_note="Stripped 10mm copper cable without damaging copper strands."),
                ProcedureCheckpoint(step_name="Earth Continuity Verification", timestamp_secs=88, detected=True, confidence=0.86, observation_note="Multimeter probe attached to earthing terminal.")
            ],
            safety_indicators=[
                SafetyIndicator(metric="Insulated Gloves Worn", passed=True, confidence=0.94, details="1000V rated gloves detected during live panel check"),
                SafetyIndicator(metric="Zero-Voltage Tester Used", passed=True, confidence=0.92, details="Neon tester applied to incoming phase terminal"),
                SafetyIndicator(metric="Safety Glasses Worn", passed=False, confidence=0.70, details="Eye protection not worn during terminal tightening")
            ],
            assessor_review_flags=[
                AssessorReviewFlag(flag_type="UNCERTAIN_ISOLATION_CHECK", timestamp_secs=88, reason="Camera angle partially obscured multimeter LCD reading.", action_recommended="Assessor to verify earth leakage test procedure with candidate.")
            ],
            processing_status="completed"
        )

    @staticmethod
    def adaptive_assessment(candidate_id: str, trade_id: str, history: list) -> AdaptiveAssessmentResponse:
        completed = len(history or [])
        
        question = ScenarioQuestion(
            question_id=f"SCEN-{trade_id.upper()}-0{completed + 1}",
            scenario_title="Earth Leakage Circuit Tripping Scenario",
            description="While installing a home distribution board, the RCCB trips instantly upon powering on the main switch. What is the correct, safe next step before resetting the breaker?",
            image_url="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=600&q=80",
            competency_id="ELE-N1003",
            options=[
                DiagnosticOption(id="OPT-A", text="Bypass the RCCB breaker with a jumper wire to restore power quickly.", is_safe_procedural=False),
                DiagnosticOption(id="OPT-B", text="Disconnect load circuits one by one and test insulation resistance using multimeter continuity mode.", is_safe_procedural=True),
                DiagnosticOption(id="OPT-C", text="Force switch the RCCB handle upward repeatedly with heavy force.", is_safe_procedural=False),
                DiagnosticOption(id="OPT-D", text="Replace the MCB with a higher amperage rating fuse without testing ground faults.", is_safe_procedural=False)
            ]
        )
        
        return AdaptiveAssessmentResponse(
            candidate_id=candidate_id,
            next_question=question,
            total_completed=completed,
            score_percentage=75,
            reinforced_competencies=["ELE-N1001", "ELE-N1002"],
            gap_competencies=["ELE-N1003"]
        )

    @staticmethod
    def gap_analysis(candidate_id: str, competencies: list) -> GapAnalysisResponse:
        bridge_modules = [
            BridgeModuleItem(
                id="MOD-ELE-01",
                title="3-Phase Commercial Fault Diagnostics & RCCB Testing",
                gap_addressed="Earth Leakage & 3-Phase Troubleshooting (ELE-N1003)",
                objective="Master digital insulation testing and 3-phase neutral fault tracing",
                duration_hours=8,
                suggested_activity="Simulated fault panel diagnostic exercise using clamp meter",
                reassessment_evidence_type="video_practical",
                status="recommended"
            )
        ]
        
        return GapAnalysisResponse(
            candidate_id=candidate_id,
            gaps=["Earth Leakage & 3-Phase Troubleshooting (ELE-N1003)"],
            bridge_modules=bridge_modules,
            recommended_sequence=["MOD-ELE-01"]
        )

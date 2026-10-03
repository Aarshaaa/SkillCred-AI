import React, { useState } from 'react';
import { Mic, Volume2, CheckCircle2, Sparkles, RefreshCw, Edit3, ArrowRight, Shield, Layers, HelpCircle } from 'lucide-react';

export default function CandidateOnboardingVoice({ candidateData, onSkillsConfirmed }) {
  const [selectedLanguage, setSelectedLanguage] = useState(candidateData.preferred_language || 'hi');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(candidateData.transcript?.edited_transcript || candidateData.transcript?.raw_transcript || '');
  const [extractedSkills, setExtractedSkills] = useState(candidateData.transcript?.extracted_skills || []);
  const [isExtracting, setIsExtracting] = useState(false);
  const [showTreeAnimation, setShowTreeAnimation] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const languages = [
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'mr', label: 'मराठी (Marathi)' },
    { code: 'bn', label: 'বাংলা (Bengali)' },
    { code: 'en', label: 'English' }
  ];

  const handleSimulateVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setIsExtracting(true);
      setTimeout(() => {
        setIsExtracting(false);
      }, 800);
    }, 1500);
  };

  const handlePlayPrompt = () => {
    setAudioPlaying(true);
    setTimeout(() => setAudioPlaying(false), 2500);
  };

  return (
    <div className="card" id="candidate-voice-intake-card">
      <div className="card-title" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: '#e0f2fe', color: '#0284c7', padding: 8, borderRadius: 8 }}>
            <Mic size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Voice-First Multilingual Skill Intake</h3>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Low-Literacy Guided Experience (RPL Onboarding)</span>
          </div>
        </div>

        {/* Audio Helper Prompt */}
        <button className="btn btn-outline" onClick={handlePlayPrompt} style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
          <Volume2 size={16} className={audioPlaying ? 'pulse-mic' : ''} />
          {audioPlaying ? 'Playing Audio Instruction...' : 'Play Audio Prompt (Hindi)'}
        </button>
      </div>

      {/* Step 1: Language Selection */}
      <div style={{ background: '#f8fafc', padding: 16, borderRadius: 10, border: '1px solid #e2e8f0', marginBottom: 20 }}>
        <label style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 8 }}>
          Step 1: Select Your Preferred Language / अपनी भाषा चुनें:
        </label>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`btn ${selectedLanguage === lang.code ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              {selectedLanguage === lang.code && <CheckCircle2 size={16} />}
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Voice Mic Interaction */}
      <div style={{ textAlign: 'center', padding: '24px 0', borderBottom: '1px solid #f1f5f9' }}>
        <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>
          Describe your past work experience, tools used, and safety practices:
        </p>

        <button
          onClick={handleSimulateVoice}
          className={`btn ${isRecording ? 'btn-warning pulse-mic' : 'btn-primary'} btn-lg`}
          style={{ width: 220, height: 70, borderRadius: 35 }}
          id="voice-mic-button"
        >
          <Mic size={28} />
          {isRecording ? 'Listening...' : 'Tap & Speak Now'}
        </button>

        <div style={{ marginTop: 12, fontSize: '0.82rem', color: '#64748b' }}>
          Examples: Years of work, tools used (Multimeter, Insulated Pliers), safety steps taken.
        </div>
      </div>

      {/* Step 3: Speech Transcript View & Edit */}
      {transcript && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#334155', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Edit3 size={16} color="#0284c7" /> Live Speech Transcript (Multilingual STT):
            </span>
            <span className="badge badge-supported">Whisper / Bhashini Engine</span>
          </div>

          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 8,
              border: '1px solid #cbd5e1',
              fontFamily: 'inherit',
              fontSize: '0.95rem',
              color: '#0f172a',
              background: '#ffffff'
            }}
          />
        </div>
      )}

      {/* Step 4: Extracted Technical Skill Chips */}
      {extractedSkills.length > 0 && (
        <div style={{ marginTop: 24, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: 18, borderRadius: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h4 style={{ color: '#166534', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={18} /> Extracted Technical Skill Tags:
            </h4>
            <span style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 600 }}>AI Preliminary Signal (Confirm/Edit below)</span>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {extractedSkills.map((skill, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #86efac',
                  padding: '8px 14px',
                  borderRadius: 20,
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#14532d',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <span>{skill.title}</span>
                <span className="badge badge-high" style={{ fontSize: '0.7rem' }}>
                  {Math.round(skill.confidence * 100)}% Match
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WOW FEATURE #1: "From Voice to Skill Tree" Animated Pipeline */}
      {showTreeAnimation && extractedSkills.length > 0 && (
        <div style={{ marginTop: 24, background: '#0f172a', color: '#ffffff', padding: 20, borderRadius: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Layers size={20} color="#38bdf8" />
            <h4 style={{ margin: 0, color: '#38bdf8' }}>"From Voice to Skill Tree" Transformation Pipeline</h4>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ background: '#1e293b', padding: '10px 14px', borderRadius: 8, textAlign: 'center', flex: 1, border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>1. Audio Intake</div>
              <strong style={{ color: '#e2e8f0', fontSize: '0.88rem' }}>Spoken Experience</strong>
            </div>

            <ArrowRight size={18} color="#38bdf8" />

            <div style={{ background: '#1e293b', padding: '10px 14px', borderRadius: 8, textAlign: 'center', flex: 1, border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>2. AI Extraction</div>
              <strong style={{ color: '#38bdf8', fontSize: '0.88rem' }}>{extractedSkills.length} Technical Tags</strong>
            </div>

            <ArrowRight size={18} color="#38bdf8" />

            <div style={{ background: '#1e293b', padding: '10px 14px', borderRadius: 8, textAlign: 'center', flex: 1, border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>3. NSQF Alignment</div>
              <strong style={{ color: '#4ade80', fontSize: '0.88rem' }}>Competency Matrix</strong>
            </div>

            <ArrowRight size={18} color="#38bdf8" />

            <div style={{ background: '#1e293b', padding: '10px 14px', borderRadius: 8, textAlign: 'center', flex: 1, border: '1px solid #334155' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>4. Verification</div>
              <strong style={{ color: '#facc15', fontSize: '0.88rem' }}>Practical Evidence</strong>
            </div>
          </div>
        </div>
      )}

      {/* Confirm & Next Step CTA */}
      <div style={{ marginTop: 24, textAlign: 'right' }}>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => onSkillsConfirmed && onSkillsConfirmed(extractedSkills)}
          id="confirm-skills-next-btn"
        >
          Confirm Skills & View Competency Map
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

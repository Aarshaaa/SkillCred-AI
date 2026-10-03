import React, { useState } from 'react';
import { Video, ShieldCheck, CheckCircle2, AlertTriangle, Upload, Eye, Clock, FileCheck } from 'lucide-react';

export default function PracticalEvidenceCapture({ candidateData }) {
  const [uploading, setUploading] = useState(false);
  const videoData = candidateData.video_evidence;

  const handleSimulateUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      alert('Practical video evidence uploaded & processed via Basic Video Analysis engine!');
    }, 1200);
  };

  return (
    <div className="card" id="practical-evidence-card">
      <div className="card-title" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: '#fff7ed', color: '#ea580c', padding: 8, borderRadius: 8 }}>
            <Video size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Practical Task & Video Evidence Capture</h3>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Basic Video Analysis & Safety Verification Protocol</span>
          </div>
        </div>
        <span className="badge badge-supported">Basic Video Analysis</span>
      </div>

      {/* Task Briefing & Safety Isolation Card */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: 18, borderRadius: 10, marginBottom: 20 }}>
        <h4 style={{ color: '#0f172a', margin: 0, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShieldCheck size={18} color="#0284c7" /> Practical Task Briefing: Distribution Board & Panel Wiring
        </h4>
        <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: 12 }}>
          Demonstrate mounting an MCB distribution box, connecting terminal wires safely, and performing main switch isolation.
        </p>

        <div style={{ background: '#fffbebf0', border: '1px solid #fef3c7', padding: 12, borderRadius: 8, fontSize: '0.85rem', color: '#b45309' }}>
          <strong>MANDATORY SAFETY ISOLATION CHECKLIST:</strong>
          <ul style={{ paddingLeft: 20, marginTop: 4 }}>
            <li>Switch off incoming phase isolator before touching wires</li>
            <li>Wear 1000V rated insulated electrical gloves</li>
            <li>Verify zero voltage using a neon tester before stripping copper cable</li>
          </ul>
        </div>
      </div>

      {/* Upload Controls */}
      <div style={{ border: '2px dashed #cbd5e1', padding: 24, borderRadius: 12, textAlign: 'center', background: '#fafafa', marginBottom: 24 }}>
        <Upload size={36} color="#0284c7" style={{ marginBottom: 10 }} />
        <h4 style={{ margin: 0, color: '#0f172a' }}>Record or Upload Practical Task Video</h4>
        <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: 16 }}>Supported formats: MP4, MOV, WEBM (Max 100MB)</p>

        <button
          className={`btn ${uploading ? 'btn-warning' : 'btn-primary'}`}
          onClick={handleSimulateUpload}
          disabled={uploading}
        >
          {uploading ? 'Analyzing Video Frames...' : 'Upload Practical Video Evidence'}
        </button>
      </div>

      {/* Technical Labeling: Basic Video Analysis Results */}
      {videoData && (
        <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #f1f5f9', paddingBottom: 12 }}>
            <div>
              <h4 style={{ margin: 0, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Eye size={18} color="#0284c7" /> Basic Video Analysis Observations
              </h4>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Technical Labeling: Basic Video Analysis (Computer Vision Signals)</span>
            </div>
            <span className="badge badge-high">94% Verification Score</span>
          </div>

          <div className="grid-2" style={{ marginBottom: 20 }}>
            {/* Procedure Checkpoints */}
            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <h5 style={{ margin: 0, marginBottom: 12, color: '#0284c7', display: 'flex', alignItems: 'center', gap: 6 }}>
                <FileCheck size={16} /> Procedure Checkpoints:
              </h5>
              {(videoData.procedure_checkpoints || []).map((cp, idx) => (
                <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: 10, borderRadius: 8, marginBottom: 8, fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                    <span style={{ color: '#0f172a' }}>{cp.step_name}</span>
                    <span style={{ color: '#0284c7', fontSize: '0.78rem' }}><Clock size={12} style={{ display: 'inline', marginRight: 2 }} /> {cp.timestamp_secs}s</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: 4 }}>{cp.observation_note}</div>
                </div>
              ))}
            </div>

            {/* Safety Indicators */}
            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 10, border: '1px solid #e2e8f0' }}>
              <h5 style={{ margin: 0, marginBottom: 12, color: '#10b981', display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={16} /> Safety Indicators:
              </h5>
              {(videoData.safety_indicators || []).map((sf, idx) => (
                <div key={idx} style={{ background: '#ffffff', border: `1px solid ${sf.passed ? '#bbf7d0' : '#fecaca'}`, padding: 10, borderRadius: 8, marginBottom: 8, fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                    <span style={{ color: sf.passed ? '#15803d' : '#b91c1c' }}>
                      {sf.passed ? '✓ ' : '✗ '} {sf.metric}
                    </span>
                    <span className={`badge badge-${sf.passed ? 'high' : 'needs'}`}>
                      {sf.passed ? 'PASSED' : 'FLAGGED'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: 4 }}>{sf.details}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Assessor Review Suggested Flags */}
          {videoData.assessor_review_flags && videoData.assessor_review_flags.length > 0 && (
            <div style={{ background: '#fffbebf0', border: '1px solid #fef3c7', padding: 14, borderRadius: 10 }}>
              <h5 style={{ color: '#b45309', margin: 0, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertTriangle size={16} /> Assessor Review Suggested Flags:
              </h5>
              {videoData.assessor_review_flags.map((flag, i) => (
                <div key={i} style={{ fontSize: '0.85rem', color: '#92400e' }}>
                  <strong>Flag [{flag.flag_type}] at {flag.timestamp_secs}s:</strong> {flag.reason}
                  <div style={{ fontStyle: 'italic', fontSize: '0.8rem', marginTop: 2 }}>Recommended: {flag.action_recommended}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

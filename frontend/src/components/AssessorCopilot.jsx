import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Award, Clock, FileText, CheckCircle2, AlertTriangle, HelpCircle, Send, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import TrustBanner from './TrustBanner';

export default function AssessorCopilot({ candidateData, onDecisionSubmit }) {
  const [showRationaleDrawer, setShowRationaleDrawer] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestText, setRequestText] = useState('Demonstrate distribution-board verification and explain the safety isolation step before starting.');
  const [assessorNotes, setAssessorNotes] = useState(candidateData.assessor_notes || '');

  const skills = candidateData.transcript?.extracted_skills || [];
  const competencies = candidateData.competencies || [];
  const video = candidateData.video_evidence;

  const handleDecision = (decisionType) => {
    onDecisionSubmit({
      candidate_id: candidateData.id,
      decision: decisionType,
      assessor_notes: assessorNotes,
      requested_evidence_details: decisionType === 'request_evidence' ? requestText : null
    });
  };

  return (
    <div id="assessor-copilot-container">
      {/* Governance Trust Banner */}
      <TrustBanner />

      {/* Primary Evidence Review Header */}
      <div className="card" style={{ background: '#ffffff', borderLeft: '5px solid #0284c7' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="badge badge-supported" style={{ marginBottom: 6 }}>
              Authorized Assessor Evidence Packet Console
            </div>
            <h2 style={{ margin: 0, color: '#0f172a' }}>
              Candidate {candidateData.id} — {candidateData.full_name}
            </h2>
            <div style={{ fontSize: '0.88rem', color: '#64748b', marginTop: 4 }}>
              Trade: <strong>{candidateData.trade_title}</strong> | Experience: <strong>{candidateData.years_experience} Years</strong> | Location: <strong>{candidateData.location}</strong>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase' }}>Preliminary Readiness Signal</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0284c7' }}>
              {candidateData.preliminary_readiness_score}%
            </div>
          </div>
        </div>
      </div>

      {/* WOW FEATURE #6: "Review in 60 Seconds" Summary View */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ color: '#38bdf8', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={20} /> "Review in 60 Seconds" Executive Summary
          </h3>
          <span className="badge badge-medium" style={{ background: '#0284c7', color: '#fff' }}>Assessor Time-Saving Feature</span>
        </div>

        <div className="grid-3" style={{ gap: 14 }}>
          <div style={{ background: '#1e293b', padding: 14, borderRadius: 8, border: '1px solid #334155' }}>
            <div style={{ color: '#4ade80', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>Strongest Evidence</div>
            <div style={{ fontSize: '0.88rem', color: '#e2e8f0', marginTop: 4 }}>
              Voice intake + practical video confirm voltage isolation & MCB distribution wiring.
            </div>
          </div>

          <div style={{ background: '#1e293b', padding: 14, borderRadius: 8, border: '1px solid #334155' }}>
            <div style={{ color: '#facc15', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>Uncertain / Needs Verification</div>
            <div style={{ fontSize: '0.88rem', color: '#e2e8f0', marginTop: 4 }}>
              Multimeter LCD reading obscured at 88s. 3-phase fault diagnosis score: 62%.
            </div>
          </div>

          <div style={{ background: '#1e293b', padding: 14, borderRadius: 8, border: '1px solid #334155' }}>
            <div style={{ color: '#38bdf8', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700 }}>Suggested Assessor Action</div>
            <div style={{ fontSize: '0.88rem', color: '#e2e8f0', marginTop: 4 }}>
              Request short video demonstration of earth leakage verification or certify RPL Level 4.
            </div>
          </div>
        </div>
      </div>

      {/* Structured Evidence Packet Details */}
      <div className="grid-2">
        {/* Column 1: Voice Transcript & Extracted Skills */}
        <div className="card">
          <h4 style={{ color: '#0f172a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileText size={18} color="#0284c7" /> Voice Transcript Excerpt & Skills
          </h4>

          <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', fontStyle: 'italic', marginBottom: 16 }}>
            "{candidateData.transcript?.edited_transcript || candidateData.transcript?.raw_transcript}"
          </div>

          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', marginBottom: 8 }}>EXTRACTED SKILLS & CONFIDENCE:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {skills.map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#f1f5f9', padding: '6px 12px', borderRadius: 6, fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600 }}>{s.title}</span>
                <span style={{ color: '#15803d', fontWeight: 700 }}>{Math.round(s.confidence * 100)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Practical Video Analysis Observations */}
        <div className="card">
          <h4 style={{ color: '#0f172a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={18} color="#10b981" /> Practical Video Analysis Signals
          </h4>

          {video && (
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', marginBottom: 8 }}>SAFETY INDICATORS DETECTED:</div>
              {video.safety_indicators.map((sf, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', background: sf.passed ? '#f0fdf4' : '#fef2f2', borderRadius: 6, marginBottom: 6, fontSize: '0.82rem' }}>
                  <span style={{ fontWeight: 600, color: sf.passed ? '#15803d' : '#b91c1c' }}>{sf.metric}</span>
                  <span>{sf.passed ? '✓ PASSED' : '⚠ FLAGGED'}</span>
                </div>
              ))}

              {video.assessor_review_flags.length > 0 && (
                <div style={{ marginTop: 12, background: '#fffbebf0', padding: 10, borderRadius: 6, fontSize: '0.82rem', color: '#b45309' }}>
                  <strong>Review Flag:</strong> {video.assessor_review_flags[0].reason}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Feature H: "Why this result?" Rationale Drawer Trigger */}
      <div className="card" style={{ background: '#f8fafc' }}>
        <button
          onClick={() => setShowRationaleDrawer(!showRationaleDrawer)}
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'space-between', color: '#0284c7', borderColor: '#bae6fd' }}
          id="why-this-result-btn"
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
            <HelpCircle size={18} /> Evidence Provenance: "Why this result?" AI Rationale Panel
          </span>
          {showRationaleDrawer ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showRationaleDrawer && (
          <div style={{ marginTop: 16, borderTop: '1px solid #cbd5e1', paddingTop: 16 }}>
            {competencies.map((c, i) => (
              <div key={i} style={{ marginBottom: 12, background: '#ffffff', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{c.code}: {c.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: 4 }}>
                  <strong>Source Evidence:</strong> {c.source_evidence_refs?.join(', ')}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#0284c7', marginTop: 2 }}>
                  <strong>AI Rationale:</strong> {c.ai_rationale}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assessor Decision Controls & WOW Feature #4 "Request More Evidence" */}
      <div className="card" style={{ border: '2px solid #0284c7' }}>
        <h3 style={{ color: '#0f172a', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Award size={22} color="#0284c7" /> Final Human Assessor RPL Decision Controls
        </h3>

        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 16 }}>
          Mandatory Governance: Only authorized human assessors can issue RPL certification or request evidence.
        </p>

        {/* Assessor Notes Textarea */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>
            Assessor Review Comments & Audit Notes:
          </label>
          <textarea
            value={assessorNotes}
            onChange={(e) => setAssessorNotes(e.target.value)}
            rows={3}
            placeholder="Enter assessor notes for the official RPL audit record..."
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', fontFamily: 'inherit', fontSize: '0.9rem' }}
          />
        </div>

        {/* Decision Buttons */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button
            className="btn btn-success btn-lg"
            onClick={() => handleDecision('certified')}
            id="assessor-approve-btn"
          >
            <CheckCircle2 size={20} /> Approve & Issue RPL Certification
          </button>

          {/* WOW Feature #4: 1-Click Request More Evidence */}
          <button
            className="btn btn-warning btn-lg"
            onClick={() => setShowRequestModal(true)}
            id="assessor-request-evidence-btn"
          >
            <Send size={20} /> Request More Evidence (1-Click)
          </button>

          <button
            className="btn btn-outline btn-lg"
            onClick={() => handleDecision('reassess')}
            id="assessor-reassess-btn"
          >
            Return for Training / Reassessment
          </button>
        </div>
      </div>

      {/* Request Evidence Modal */}
      {showRequestModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#ffffff', padding: 24, borderRadius: 12, maxWidth: 500, width: '90%' }}>
            <h3 style={{ margin: 0, marginBottom: 12, color: '#0f172a' }}>Request Targeted Evidence from Candidate</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 14 }}>
              This request will immediately appear on candidate SC-1042's dashboard as an action item.
            </p>

            <textarea
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              rows={4}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 16 }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="btn btn-outline" onClick={() => setShowRequestModal(false)}>Cancel</button>
              <button
                className="btn btn-warning"
                onClick={() => {
                  setShowRequestModal(false);
                  handleDecision('request_evidence');
                }}
              >
                Send Request to Candidate Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

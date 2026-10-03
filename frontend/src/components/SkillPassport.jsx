import React from 'react';
import { Award, Printer, Share2, ShieldCheck, CheckCircle2, AlertTriangle, BookOpen, Layers } from 'lucide-react';

export default function SkillPassport({ candidateData }) {
  const handlePrint = () => {
    window.print();
  };

  const statusColor = candidateData.overall_status === 'certified' ? '#10b981' : candidateData.overall_status === 'ready_for_review' ? '#0284c7' : '#f59e0b';

  return (
    <div className="card" id="skill-passport-container" style={{ position: 'relative' }}>
      {/* Demo / Preview Banner Badge */}
      <div style={{ position: 'absolute', top: 16, right: 20, background: '#fffbebf0', border: '1px solid #fef3c7', padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', color: '#b45309', fontWeight: 700 }}>
        PROTOTYPE PREVIEW RECORD — NOT AN OFFICIAL CERTIFICATE
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #f1f5f9', paddingBottom: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800 }}>
            {candidateData.full_name ? candidateData.full_name.charAt(0) : 'R'}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#0f172a' }}>{candidateData.full_name}</h2>
            <div style={{ fontSize: '0.92rem', color: '#0284c7', fontWeight: 700 }}>{candidateData.trade_title}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Candidate ID: <strong>{candidateData.id}</strong> | Experience: <strong>{candidateData.years_experience} Years</strong> | Location: <strong>{candidateData.location}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline" onClick={handlePrint} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <Printer size={16} /> Print Passport
          </button>
          <button className="btn btn-primary" onClick={() => alert('Skill Passport Share Link generated!')} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <Share2 size={16} /> Share Link
          </button>
        </div>
      </div>

      {/* Preliminary Readiness Score Indicator */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', padding: 20, borderRadius: 12 }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
            Preliminary Assessment Readiness Score
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#38bdf8' }}>
              {candidateData.preliminary_readiness_score || 78}%
            </div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
              Based on voice intake, video analysis & diagnostic check
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#facc15', marginTop: 8, fontStyle: 'italic' }}>
            *Note: Preliminary signal only. Does not replace final human assessor review.
          </div>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: 20, borderRadius: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>
            Assessment Pathway Status
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 6, background: statusColor }}></span>
            <strong style={{ fontSize: '1.2rem', textTransform: 'uppercase', color: statusColor }}>
              {candidateData.overall_status ? candidateData.overall_status.replace(/_/g, ' ') : 'Ready for Review'}
            </strong>
          </div>
          {candidateData.pending_evidence_request && (
            <div style={{ marginTop: 10, background: '#fffbebf0', padding: 8, borderRadius: 6, fontSize: '0.82rem', color: '#b45309', border: '1px solid #fef3c7' }}>
              <strong>Pending Assessor Evidence Request:</strong> {candidateData.pending_evidence_request}
            </div>
          )}
        </div>
      </div>

      {/* Mapped NSQF Competencies Table */}
      <h3 style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Layers size={20} color="#0284c7" /> Mapped NSQF Competency Matrix:
      </h3>

      <div style={{ overflowX: 'auto', marginBottom: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1', color: '#334155' }}>
              <th style={{ padding: 12 }}>NSQF Code</th>
              <th style={{ padding: 12 }}>Competency Description</th>
              <th style={{ padding: 12 }}>Level</th>
              <th style={{ padding: 12 }}>AI Preliminary Signal</th>
              <th style={{ padding: 12 }}>Confidence</th>
              <th style={{ padding: 12 }}>Rationale</th>
            </tr>
          </thead>
          <tbody>
            {(candidateData.competencies || []).map((comp, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: 12, fontWeight: 700, color: '#0284c7' }}>{comp.code}</td>
                <td style={{ padding: 12, fontWeight: 600 }}>{comp.title}</td>
                <td style={{ padding: 12 }}>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                    Level {comp.nsqf_level}
                  </span>
                </td>
                <td style={{ padding: 12 }}>
                  <span className={`badge badge-${comp.preliminary_signal === 'supported' ? 'supported' : 'needs'}`}>
                    {comp.preliminary_signal.replace(/_/g, ' ')}
                  </span>
                </td>
                <td style={{ padding: 12, fontWeight: 700, color: '#15803d' }}>
                  {Math.round((comp.confidence_score || 0.88) * 100)}%
                </td>
                <td style={{ padding: 12, fontSize: '0.82rem', color: '#475569' }}>
                  {comp.ai_rationale}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Identified Skill Gaps & Bridge Modules */}
      {candidateData.bridge_pathway && candidateData.bridge_pathway.length > 0 && (
        <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', padding: 18, borderRadius: 10 }}>
          <h4 style={{ color: '#c2410c', margin: 0, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={18} /> Personalized Bridge Training Modules (Upskilling Pathway):
          </h4>
          {candidateData.bridge_pathway.map((mod, i) => (
            <div key={i} style={{ background: '#ffffff', padding: 12, borderRadius: 8, border: '1px solid #fed7aa', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, color: '#9a3412', fontSize: '0.95rem' }}>{mod.title}</div>
              <div style={{ fontSize: '0.84rem', color: '#7c2d12', marginTop: 4 }}>
                <strong>Gap Addressed:</strong> {mod.gap_addressed} | <strong>Duration:</strong> {mod.duration_hours} Hours
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

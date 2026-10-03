import React, { useState } from 'react';
import { GitBranch, Layers, CheckCircle2, AlertCircle, FileVideo, Award, Sparkles } from 'lucide-react';

export default function CompetencyGraph({ candidateData }) {
  const [selectedNode, setSelectedNode] = useState(null);

  const skills = candidateData.transcript?.extracted_skills || [];
  const competencies = candidateData.competencies || [];
  const video = candidateData.video_evidence;
  const bridge = candidateData.bridge_pathway || [];

  return (
    <div className="card" id="competency-graph-card">
      <div className="card-title" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: '#f0fdf4', color: '#166534', padding: 8, borderRadius: 8 }}>
            <GitBranch size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Evidence-Linked Competency Graph</h3>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Visual Skill Mapping & Provenance Explorer</span>
          </div>
        </div>
        <span className="badge badge-supported">Interactive Tree View</span>
      </div>

      <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: 20 }}>
        Click any node in the tree below to inspect its supporting evidence source, confidence score, and rationale.
      </p>

      {/* Visual Graph Area */}
      <div style={{ background: '#0f172a', padding: 24, borderRadius: 12, overflowX: 'auto', border: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', gap: 24, minWidth: 800, alignItems: 'stretch' }}>
          
          {/* Column 1: Spoken Experience */}
          <div style={{ flex: 1, background: '#1e293b', padding: 16, borderRadius: 10, border: '1px solid #334155' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>
              1. Candidate Voice Experience
            </div>
            <div
              onClick={() => setSelectedNode({ title: 'Voice Statement Intake', type: 'audio', details: candidateData.transcript?.raw_transcript, confidence: '96%' })}
              style={{ background: '#334155', color: '#f8fafc', padding: 12, borderRadius: 8, fontSize: '0.85rem', cursor: 'pointer', border: selectedNode?.title === 'Voice Statement Intake' ? '2px solid #38bdf8' : '1px solid transparent' }}
            >
              <div style={{ fontWeight: 700, color: '#38bdf8' }}>Spoken Experience</div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: 4 }}>{candidateData.years_experience} Years in {candidateData.trade_title}</div>
            </div>
          </div>

          {/* Column 2: Extracted Skills */}
          <div style={{ flex: 1, background: '#1e293b', padding: 16, borderRadius: 10, border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: '0.75rem', color: '#38bdf8', textTransform: 'uppercase', marginBottom: 4, fontWeight: 700 }}>
              2. Extracted Skill Tags
            </div>
            {skills.map((s, i) => (
              <div
                key={i}
                onClick={() => setSelectedNode({ title: s.title, type: 'skill', details: `Extracted from phrase: "${s.source_span}"`, confidence: `${Math.round(s.confidence * 100)}%` })}
                style={{ background: '#0284c7', color: '#ffffff', padding: 10, borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: selectedNode?.title === s.title ? '2px solid #facc15' : '1px solid transparent' }}
              >
                <div>{s.title}</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.9 }}>{Math.round(s.confidence * 100)}% Match</div>
              </div>
            ))}
          </div>

          {/* Column 3: NSQF Competencies */}
          <div style={{ flex: 1.2, background: '#1e293b', padding: 16, borderRadius: 10, border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: '0.75rem', color: '#4ade80', textTransform: 'uppercase', marginBottom: 4, fontWeight: 700 }}>
              3. Mapped NSQF Competencies
            </div>
            {competencies.map((c, i) => (
              <div
                key={i}
                onClick={() => setSelectedNode({ title: `${c.code}: ${c.title}`, type: 'competency', details: c.ai_rationale, confidence: `${Math.round(c.confidence_score * 100)}%`, signal: c.preliminary_signal })}
                style={{ background: c.preliminary_signal === 'supported' ? '#14532d' : '#7f1d1d', color: '#ffffff', padding: 10, borderRadius: 8, fontSize: '0.82rem', cursor: 'pointer', border: selectedNode?.title.includes(c.code) ? '2px solid #facc15' : '1px solid transparent' }}
              >
                <div style={{ fontWeight: 700, color: c.preliminary_signal === 'supported' ? '#86efac' : '#fca5a5' }}>{c.code}</div>
                <div style={{ fontSize: '0.78rem' }}>{c.title}</div>
              </div>
            ))}
          </div>

          {/* Column 4: Evidence & Bridge Modules */}
          <div style={{ flex: 1, background: '#1e293b', padding: 16, borderRadius: 10, border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: '0.75rem', color: '#facc15', textTransform: 'uppercase', marginBottom: 4, fontWeight: 700 }}>
              4. Practical Evidence / Bridge
            </div>

            {video && (
              <div
                onClick={() => setSelectedNode({ title: 'Practical Video Evidence', type: 'video', details: `Basic Video Analysis: ${video.procedure_checkpoints.length} Checkpoints, ${video.safety_indicators.length} Safety Indicators`, confidence: '94%' })}
                style={{ background: '#d97706', color: '#ffffff', padding: 10, borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
              >
                <FileVideo size={14} style={{ display: 'inline', marginRight: 4 }} />
                Practical Video Evidence
              </div>
            )}

            {bridge.map((b, i) => (
              <div
                key={i}
                onClick={() => setSelectedNode({ title: b.title, type: 'bridge', details: `Addressing gap: ${b.gap_addressed}`, confidence: 'N/A' })}
                style={{ background: '#7c2d12', color: '#ffedd5', padding: 10, borderRadius: 8, fontSize: '0.82rem', cursor: 'pointer' }}
              >
                <div>Bridge Training Module</div>
                <div style={{ fontSize: '0.72rem', opacity: 0.9 }}>{b.title}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div style={{ marginTop: 20, background: '#f8fafc', border: '1px solid #cbd5e1', padding: 16, borderRadius: 10 }}>
          <h4 style={{ margin: 0, color: '#0284c7', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={16} /> Node Details: {selectedNode.title}
          </h4>
          <div style={{ fontSize: '0.88rem', color: '#334155', marginTop: 8 }}>
            <strong>Evidence Details:</strong> {selectedNode.details}
          </div>
          {selectedNode.confidence && (
            <div style={{ fontSize: '0.82rem', color: '#15803d', marginTop: 4, fontWeight: 700 }}>
              AI Preliminary Confidence: {selectedNode.confidence}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

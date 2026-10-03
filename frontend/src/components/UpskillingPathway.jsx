import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Play, ArrowRight, RefreshCw, Award } from 'lucide-react';

export default function UpskillingPathway({ candidateData }) {
  const [startedModules, setStartedModules] = useState({});

  const bridgeModules = candidateData.bridge_pathway || [];

  const handleStartModule = (modId) => {
    setStartedModules(prev => ({ ...prev, [modId]: 'started' }));
  };

  return (
    <div className="card" id="upskilling-pathway-card">
      <div className="card-title" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: '#fef3c7', color: '#b45309', padding: 8, borderRadius: 8 }}>
            <BookOpen size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Gap Analysis & Bridge Upskilling Pathway</h3>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Targeted Skill Gap Resolution</span>
          </div>
        </div>
        <span className="badge badge-supported">Personalized Pathway</span>
      </div>

      {/* Visual Pathway Progression */}
      <div style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ background: '#e0f2fe', padding: 12, borderRadius: 8, textAlign: 'center', flex: 1, border: '1px solid #bae6fd' }}>
            <div style={{ fontSize: '0.75rem', color: '#0369a1', textTransform: 'uppercase', fontWeight: 700 }}>1. Current Profile</div>
            <strong style={{ color: '#0c4a6e', fontSize: '0.9rem' }}>{candidateData.preliminary_readiness_score || 78}% Preliminary Level</strong>
          </div>

          <ArrowRight size={18} color="#0284c7" />

          <div style={{ background: '#fff7ed', padding: 12, borderRadius: 8, textAlign: 'center', flex: 1, border: '1px solid #fed7aa' }}>
            <div style={{ fontSize: '0.75rem', color: '#c2410c', textTransform: 'uppercase', fontWeight: 700 }}>2. Identified Gap</div>
            <strong style={{ color: '#7c2d12', fontSize: '0.9rem' }}>3-Phase Fault Diagnostics</strong>
          </div>

          <ArrowRight size={18} color="#0284c7" />

          <div style={{ background: '#f0fdf4', padding: 12, borderRadius: 8, textAlign: 'center', flex: 1, border: '1px solid #bbf7d0' }}>
            <div style={{ fontSize: '0.75rem', color: '#15803d', textTransform: 'uppercase', fontWeight: 700 }}>3. Bridge Module</div>
            <strong style={{ color: '#14532d', fontSize: '0.9rem' }}>8 Hours Micro-Course</strong>
          </div>

          <ArrowRight size={18} color="#0284c7" />

          <div style={{ background: '#f3e8ff', padding: 12, borderRadius: 8, textAlign: 'center', flex: 1, border: '1px solid #e9d5ff' }}>
            <div style={{ fontSize: '0.75rem', color: '#7e22ce', textTransform: 'uppercase', fontWeight: 700 }}>4. Reassessment</div>
            <strong style={{ color: '#581c87', fontSize: '0.9rem' }}>Level 4 RPL Certification</strong>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div>
        <h4 style={{ marginBottom: 12, color: '#0f172a' }}>Recommended Bridge Training Modules:</h4>

        {bridgeModules.length === 0 ? (
          <div style={{ padding: 20, textAlign: 'center', color: '#64748b' }}>No critical gaps identified! Ready for assessor final review.</div>
        ) : (
          bridgeModules.map((mod) => {
            const isStarted = startedModules[mod.id] === 'started';
            return (
              <div key={mod.id} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 10, padding: 18, marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: 0, color: '#0284c7' }}>{mod.title}</h4>
                    <div style={{ fontSize: '0.84rem', color: '#e11d48', marginTop: 4, fontWeight: 600 }}>
                      Gap Addressed: {mod.gap_addressed}
                    </div>
                  </div>
                  <span className={`badge badge-${isStarted ? 'supported' : 'needs'}`}>
                    {isStarted ? 'IN PROGRESS' : 'RECOMMENDED'}
                  </span>
                </div>

                <div style={{ fontSize: '0.88rem', color: '#334155', marginTop: 10 }}>
                  <strong>Objective:</strong> {mod.objective}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: 4 }}>
                  <strong>Suggested Activity:</strong> {mod.suggested_activity} | <strong>Duration:</strong> {mod.duration_hours} Hours
                </div>

                <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: 10 }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Reassessment Method: <strong>{mod.reassessment_evidence_type.replace(/_/g, ' ')}</strong>
                  </span>

                  <button
                    className={`btn ${isStarted ? 'btn-success' : 'btn-primary'}`}
                    onClick={() => handleStartModule(mod.id)}
                    style={{ padding: '6px 16px', fontSize: '0.85rem' }}
                  >
                    {isStarted ? <CheckCircle2 size={16} /> : <Play size={16} />}
                    {isStarted ? 'Module Started' : 'Start Bridge Module (Demo)'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

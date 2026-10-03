import React from 'react';
import { History, ShieldCheck, UserCheck, Cpu, Clock, CheckCircle2 } from 'lucide-react';

export default function AuditTrail({ auditEvents }) {
  return (
    <div className="card" id="audit-trail-card">
      <div className="card-title" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: '#f8fafc', color: '#0f172a', padding: 8, borderRadius: 8, border: '1px solid #cbd5e1' }}>
            <History size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>RPL Audit Trail & Governance Timeline</h3>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Immutable Action Log (Candidate, AI & Assessor Activity)</span>
          </div>
        </div>
        <span className="badge badge-supported">Traceability Active</span>
      </div>

      <div style={{ position: 'relative', paddingLeft: 20, borderLeft: '3px solid #0284c7', marginTop: 10 }}>
        {(auditEvents || []).map((evt, idx) => {
          const isHumanAssessor = evt.actor?.includes('Assessor') || evt.trust_governance;
          const isAI = evt.actor?.includes('AI');

          return (
            <div key={idx} style={{ marginBottom: 20, position: 'relative' }}>
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: -28,
                  top: 2,
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  background: isHumanAssessor ? '#10b981' : (isAI ? '#0284c7' : '#f59e0b'),
                  border: '2px solid #ffffff'
                }}
              />

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: 14, borderRadius: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isHumanAssessor ? '#15803d' : '#0284c7' }}>
                    {evt.actor}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} /> {new Date(evt.timestamp).toLocaleString()}
                  </span>
                </div>

                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>
                  {evt.action}
                </div>

                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: 4 }}>
                  Object Affected: <strong>{evt.object}</strong>
                </div>

                {evt.trust_governance && (
                  <div style={{ marginTop: 6, background: '#f0fdf4', color: '#166534', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <ShieldCheck size={12} /> HUMAN-ASSESSOR EXCLUSIVE CERTIFICATION BOUNDARY VERIFIED
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

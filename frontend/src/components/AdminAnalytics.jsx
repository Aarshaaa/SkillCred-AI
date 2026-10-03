import React, { useState } from 'react';
import { BarChart3, Users, Zap, Award, Layers, Filter, Download, Briefcase, TrendingUp } from 'lucide-react';

export default function AdminAnalytics({ candidatesList, tradesList }) {
  const [selectedTrade, setSelectedTrade] = useState('all');

  const totalCandidates = candidatesList.length || 3;
  const certifiedCount = candidatesList.filter(c => c.overall_status === 'certified').length;
  const reviewCount = candidatesList.filter(c => c.overall_status === 'ready_for_review').length;
  const actionCount = candidatesList.filter(c => c.overall_status === 'action_required').length;

  return (
    <div id="admin-analytics-container">
      {/* Top Header Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="badge badge-supported" style={{ background: '#0284c7', color: '#fff', marginBottom: 6 }}>
              Sector Skill Council (SSC) Read-Only Analytics Console
            </div>
            <h2 style={{ margin: 0, color: '#38bdf8' }}>National Skill Assessment & RPL Pipeline Overview</h2>
            <div style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: 4 }}>
              Aggregate pipeline analytics, competency gap heatmaps, and turnaround indicators.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline" style={{ color: '#fff', borderColor: '#334155' }} onClick={() => alert('Exporting Summary Report CSV...')}>
              <Download size={16} /> Export Summary Cards (CSV)
            </button>
          </div>
        </div>
      </div>

      {/* Domain / Trade Filters */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: 14, borderRadius: 10, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
        <Filter size={18} color="#0284c7" />
        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#334155' }}>Filter by Sector / Trade Domain:</span>
        <select
          value={selectedTrade}
          onChange={(e) => setSelectedTrade(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', fontWeight: 600 }}
        >
          <option value="all">All Sectors (Electrical, Tailoring, Plumbing, Healthcare)</option>
          <option value="electrical">Power Sector — Electrical</option>
          <option value="tailoring">Apparel Sector — Tailoring</option>
          <option value="plumbing">Plumbing Sector — Piping</option>
        </select>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="card" style={{ background: '#ffffff', borderLeft: '4px solid #0284c7' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Total RPL Pipeline Candidates</div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', margin: '4px 0' }}>1,428</div>
          <div style={{ fontSize: '0.82rem', color: '#15803d', fontWeight: 600 }}>↑ +14% this month</div>
        </div>

        <div className="card" style={{ background: '#ffffff', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Pending Assessor Decision Queue</div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#d97706', margin: '4px 0' }}>{reviewCount + 18}</div>
          <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Avg. Turnaround: 18.4 Hours</div>
        </div>

        <div className="card" style={{ background: '#ffffff', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Human Certified RPL Rate</div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#10b981', margin: '4px 0' }}>84.2%</div>
          <div style={{ fontSize: '0.82rem', color: '#15803d' }}>Verified by Authorized Assessors</div>
        </div>
      </div>

      {/* WOW FEATURE #7: Skill-to-Employment Overview Card */}
      <div className="card" style={{ background: '#ffffff', border: '1px solid #cbd5e1' }}>
        <h3 style={{ color: '#0f172a', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Briefcase size={20} color="#0284c7" /> Skill-to-Employment Industry Demand Mapping
        </h3>

        <div className="grid-2">
          <div style={{ background: '#f8fafc', padding: 16, borderRadius: 10, border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: 0, color: '#0284c7', fontSize: '0.95rem' }}>Top Verified Competency Categories</h4>
            <ul style={{ paddingLeft: 18, marginTop: 8, fontSize: '0.88rem', color: '#334155' }}>
              <li>Distribution Board & MCB Switchgear Wiring (88% Candidate Coverage)</li>
              <li>Garment Measurement & Anatomical Pattern Drafting (92% Coverage)</li>
              <li>CPVC Solvent Jointing & Pressure Hydro Testing (79% Coverage)</li>
            </ul>
          </div>

          <div style={{ background: '#fff7ed', padding: 16, borderRadius: 10, border: '1px solid #fed7aa' }}>
            <h4 style={{ margin: 0, color: '#c2410c', fontSize: '0.95rem' }}>Most Frequent Competency Gaps Identified</h4>
            <ul style={{ paddingLeft: 18, marginTop: 8, fontSize: '0.88rem', color: '#7c2d12' }}>
              <li>3-Phase Earth Leakage & RCCB Fault Tracing (Needs Bridge Module)</li>
              <li>Eye Safety & PPE Protocol during Mechanical Pipe Cutting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { UserCheck, ShieldCheck, BarChart3, Award, Zap, Globe } from 'lucide-react';

export default function Header({ role, setRole, currentCandidateId, setCandidateId, candidatesList }) {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-logo">SC</div>
        <div>
          <div className="brand-title">SkillCred AI</div>
          <div className="brand-sub">AI-Assisted Skill Assessment for RPL</div>
        </div>
      </div>

      <div className="nav-controls">
        {/* Candidate Switcher */}
        {role === 'candidate' && (
          <div className="candidate-switcher">
            <Globe size={16} color="#0284c7" />
            <span>Candidate Demo Profile:</span>
            <select
              value={currentCandidateId}
              onChange={(e) => setCandidateId(e.target.value)}
              id="candidate-demo-selector"
            >
              <option value="SC-1042">SC-1042 — Rajesh Kumar (Electrical)</option>
              <option value="SC-1098">SC-1098 — Anita Devi (Tailoring)</option>
              <option value="SC-1131">SC-1131 — Muthu Velu (Plumbing)</option>
            </select>
          </div>
        )}

        {/* Role Switcher */}
        <div className="role-selector" id="role-selector-container">
          <button
            className={`role-btn ${role === 'candidate' ? 'active' : ''}`}
            onClick={() => setRole('candidate')}
            id="role-btn-candidate"
          >
            <UserCheck size={16} />
            Candidate
          </button>

          <button
            className={`role-btn ${role === 'assessor' ? 'active' : ''}`}
            onClick={() => setRole('assessor')}
            id="role-btn-assessor"
          >
            <ShieldCheck size={16} />
            Assessor Co-Pilot
          </button>

          <button
            className={`role-btn ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
            id="role-btn-admin"
          >
            <BarChart3 size={16} />
            SSC Analytics
          </button>
        </div>
      </div>
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TrustBanner from './components/TrustBanner';
import CandidateOnboardingVoice from './components/CandidateOnboardingVoice';
import SkillPassport from './components/SkillPassport';
import CompetencyGraph from './components/CompetencyGraph';
import PracticalEvidenceCapture from './components/PracticalEvidenceCapture';
import AdaptiveAssessment from './components/AdaptiveAssessment';
import UpskillingPathway from './components/UpskillingPathway';
import AssessorCopilot from './components/AssessorCopilot';
import AuditTrail from './components/AuditTrail';
import AdminAnalytics from './components/AdminAnalytics';

import { demoCandidates } from './mock/demoData';
import { Mic, Award, GitBranch, Video, HelpCircle, BookOpen, History, ShieldCheck, BarChart3, Globe } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState('candidate'); // candidate | assessor | admin
  const [candidateId, setCandidateId] = useState('SC-1042');
  const [activeTab, setActiveTab] = useState('voice');
  const [candidates, setCandidates] = useState(demoCandidates);

  const currentCandidate = candidates[candidateId] || demoCandidates['SC-1042'];

  const handleDecisionSubmit = ({ candidate_id, decision, assessor_notes, requested_evidence_details }) => {
    setCandidates(prev => {
      const updated = { ...prev };
      const cand = { ...updated[candidate_id] };

      if (decision === 'certified') {
        cand.overall_status = 'certified';
      } else if (decision === 'request_evidence') {
        cand.overall_status = 'action_required';
        cand.pending_evidence_request = requested_evidence_details;
      } else if (decision === 'reassess') {
        cand.overall_status = 'in_progress';
      }

      if (assessor_notes) cand.assessor_notes = assessor_notes;

      cand.audit_events = [
        {
          timestamp: new Date().toISOString(),
          actor: 'Dr. Sunita Rao (Authorized Assessor)',
          action: `HUMAN ASSESSOR DECISION: ${decision.toUpperCase()}${requested_evidence_details ? ` [Request: ${requested_evidence_details}]` : ''}`,
          object: `AssessmentCase ${candidate_id}`,
          trust_governance: true
        },
        ...(cand.audit_events || [])
      ];

      updated[candidate_id] = cand;
      return updated;
    });

    alert(`Assessor decision '${decision.toUpperCase()}' successfully executed. Governance audit trail updated!`);
  };

  return (
    <div className="app-container">
      <Header
        role={role}
        setRole={setRole}
        currentCandidateId={candidateId}
        setCandidateId={setCandidateId}
        candidatesList={Object.values(candidates)}
      />

      <main className="main-content">
        {/* CANDIDATE ROLE INTERFACE */}
        {role === 'candidate' && (
          <div>
            <TrustBanner />

            {/* Candidate Navigation Tabs */}
            <div className="tabs-container" id="candidate-tabs-navigation">
              <button
                className={`tab-btn ${activeTab === 'voice' ? 'active' : ''}`}
                onClick={() => setActiveTab('voice')}
              >
                <Mic size={16} /> 1. Voice Intake & Skill Tree
              </button>

              <button
                className={`tab-btn ${activeTab === 'passport' ? 'active' : ''}`}
                onClick={() => setActiveTab('passport')}
              >
                <Award size={16} /> 2. Skill Passport
              </button>

              <button
                className={`tab-btn ${activeTab === 'graph' ? 'active' : ''}`}
                onClick={() => setActiveTab('graph')}
              >
                <GitBranch size={16} /> 3. Competency Graph
              </button>

              <button
                className={`tab-btn ${activeTab === 'evidence' ? 'active' : ''}`}
                onClick={() => setActiveTab('evidence')}
              >
                <Video size={16} /> 4. Practical Video Evidence
              </button>

              <button
                className={`tab-btn ${activeTab === 'diagnostic' ? 'active' : ''}`}
                onClick={() => setActiveTab('diagnostic')}
              >
                <HelpCircle size={16} /> 5. Adaptive Diagnostic
              </button>

              <button
                className={`tab-btn ${activeTab === 'bridge' ? 'active' : ''}`}
                onClick={() => setActiveTab('bridge')}
              >
                <BookOpen size={16} /> 6. Upskilling Pathway
              </button>

              <button
                className={`tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
                onClick={() => setActiveTab('audit')}
              >
                <History size={16} /> 7. Audit Log
              </button>
            </div>

            {/* Tab Views */}
            {activeTab === 'voice' && (
              <CandidateOnboardingVoice
                candidateData={currentCandidate}
                onSkillsConfirmed={() => setActiveTab('passport')}
              />
            )}

            {activeTab === 'passport' && (
              <SkillPassport candidateData={currentCandidate} />
            )}

            {activeTab === 'graph' && (
              <CompetencyGraph candidateData={currentCandidate} />
            )}

            {activeTab === 'evidence' && (
              <PracticalEvidenceCapture candidateData={currentCandidate} />
            )}

            {activeTab === 'diagnostic' && (
              <AdaptiveAssessment candidateData={currentCandidate} />
            )}

            {activeTab === 'bridge' && (
              <UpskillingPathway candidateData={currentCandidate} />
            )}

            {activeTab === 'audit' && (
              <AuditTrail auditEvents={currentCandidate.audit_events} />
            )}
          </div>
        )}

        {/* ASSESSOR ROLE INTERFACE */}
        {role === 'assessor' && (
          <div>
            <AssessorCopilot
              candidateData={currentCandidate}
              onDecisionSubmit={handleDecisionSubmit}
            />

            <AuditTrail auditEvents={currentCandidate.audit_events} />
          </div>
        )}

        {/* ADMIN / SSC ROLE INTERFACE */}
        {role === 'admin' && (
          <AdminAnalytics
            candidatesList={Object.values(candidates)}
            tradesList={[]}
          />
        )}
      </main>
    </div>
  );
}

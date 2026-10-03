import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, Shield, Award } from 'lucide-react';

export default function AdaptiveAssessment({ candidateData }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(75);

  const questions = [
    {
      id: "SCEN-ELE-01",
      title: "Scenario 1: Unexpected Spark at Switchboard",
      description: "While tightening an MCB terminal on a residential panel, you notice a small spark at the neutral wire joint. What is the safe procedural next action?",
      image_url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
      options: [
        { id: "OPT-A", text: "Ignore the spark and continue tightening with a metal screwdriver quickly.", is_correct: false },
        { id: "OPT-B", text: "Immediately stop work, switch off main line isolation, and test neutral-earth voltage difference.", is_correct: true },
        { id: "OPT-C", text: "Touch the wire with bare hands to feel if it is hot.", is_correct: false },
        { id: "OPT-D", text: "Pour water on the switchboard to cool down electrical heat.", is_correct: false }
      ]
    },
    {
      id: "SCEN-ELE-02",
      title: "Scenario 2: Earth Leakage RCCB Circuit Tripping",
      description: "Upon switching ON the main RCCB breaker, it trips instantly. How do you isolate the faulty circuit safely?",
      image_url: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=600&q=80",
      options: [
        { id: "OPT-A", text: "Bypass RCCB with a copper wire jumper.", is_correct: false },
        { id: "OPT-B", text: "Switch off all branch MCBs, reset RCCB, and turn on individual branch MCBs one by one.", is_correct: true },
        { id: "OPT-C", text: "Replace the RCCB with a fuse of higher rating.", is_correct: false }
      ]
    }
  ];

  const currentQ = questions[currentQuestionIndex];

  const handleSubmitOption = (option) => {
    setSelectedOption(option);
    setSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setSubmitted(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('Situational Diagnostic Assessment completed! Competency graph updated.');
    }
  };

  return (
    <div className="card" id="adaptive-assessment-card">
      <div className="card-title" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: '#e0e7ff', color: '#4338ca', padding: 8, borderRadius: 8 }}>
            <HelpCircle size={22} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Adaptive Situational Skill Check</h3>
            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Scenario-based Diagnostic Verification</span>
          </div>
        </div>
        <span className="badge badge-supported">Question {currentQuestionIndex + 1} of {questions.length}</span>
      </div>

      {/* Scenario Question Card */}
      <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: 20, borderRadius: 12 }}>
        <h4 style={{ margin: 0, marginBottom: 8, color: '#0f172a' }}>{currentQ.title}</h4>
        <p style={{ fontSize: '0.95rem', color: '#334155', marginBottom: 16 }}>{currentQ.description}</p>

        {currentQ.image_url && (
          <div style={{ marginBottom: 16, overflow: 'hidden', borderRadius: 8, maxHeight: 220 }}>
            <img src={currentQ.image_url} alt="Scenario visual" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {currentQ.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSubmitOption(opt)}
              disabled={submitted}
              style={{
                textAlign: 'left',
                padding: 14,
                borderRadius: 8,
                border: selectedOption?.id === opt.id ? '2px solid #0284c7' : '1px solid #cbd5e1',
                background: submitted ? (opt.is_correct ? '#f0fdf4' : (selectedOption?.id === opt.id ? '#fef2f2' : '#ffffff')) : '#ffffff',
                cursor: submitted ? 'default' : 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{opt.text}</span>
              {submitted && opt.is_correct && <CheckCircle2 size={18} color="#15803d" />}
              {submitted && !opt.is_correct && selectedOption?.id === opt.id && <XCircle size={18} color="#b91c1c" />}
            </button>
          ))}
        </div>

        {/* Feedback & Next Button */}
        {submitted && (
          <div style={{ marginTop: 20, padding: 14, borderRadius: 8, background: selectedOption?.is_correct ? '#f0fdf4' : '#fff7ed', border: `1px solid ${selectedOption?.is_correct ? '#bbf7d0' : '#fed7aa'}` }}>
            <strong style={{ color: selectedOption?.is_correct ? '#166534' : '#c2410c' }}>
              {selectedOption?.is_correct ? 'Correct! Safe procedural protocol recognized.' : 'Incorrect reaction identified. Added to targeted bridge module.'}
            </strong>

            <div style={{ marginTop: 12, textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={handleNext}>
                Next Scenario <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

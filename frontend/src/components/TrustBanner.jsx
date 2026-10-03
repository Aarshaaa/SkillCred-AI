import React from 'react';
import { ShieldAlert, Award } from 'lucide-react';

export default function TrustBanner() {
  return (
    <div className="trust-banner" id="governance-trust-banner">
      <ShieldAlert className="trust-banner-icon" size={24} />
      <div className="trust-banner-text">
        <strong>MANDATORY HUMAN ASSESSOR GOVERNANCE RULE:</strong> AI-generated scores and mappings are preliminary recommendations only. Final Recognition of Prior Learning (RPL) certification decisions remain explicitly and exclusively with authorized human assessors.
      </div>
      <div className="trust-banner-badge">
        <Award size={14} style={{ display: 'inline', marginRight: 4 }} />
        Human In The Loop
      </div>
    </div>
  );
}

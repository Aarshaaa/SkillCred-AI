-- =============================================================================
-- SkillCred AI - PostgreSQL Database Schema
-- Focus: Normalized Structured Data (Users, Roles, Trades, Skills, NSQF Mappings)
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Roles Table
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL, -- 'candidate', 'assessor', 'admin'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table (OAuth2 Authenticated)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    preferred_language VARCHAR(20) DEFAULT 'hi', -- 'hi', 'ta', 'mr', 'bn', 'en'
    role_id INT REFERENCES roles(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Trades / Sectors Table
CREATE TABLE IF NOT EXISTS trades (
    id VARCHAR(50) PRIMARY KEY, -- e.g., 'electrical', 'tailoring', 'plumbing', 'healthcare'
    title VARCHAR(100) NOT NULL,
    ssc_name VARCHAR(100) NOT NULL, -- Sector Skill Council (e.g. Power Sector Skill Council)
    description TEXT,
    icon_name VARCHAR(50),
    active_candidates_count INT DEFAULT 0
);

-- 4. Skills Taxonomy Table
CREATE TABLE IF NOT EXISTS skills (
    id VARCHAR(50) PRIMARY KEY,
    trade_id VARCHAR(50) REFERENCES trades(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'technical', 'safety', 'tools', 'context'
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. NSQF Competencies Table
CREATE TABLE IF NOT EXISTS nsqf_competencies (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'ELE-N1001'
    trade_id VARCHAR(50) REFERENCES trades(id) ON DELETE CASCADE,
    nsqf_level INT NOT NULL CHECK (nsqf_level BETWEEN 1 AND 8),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    performance_criteria JSONB NOT NULL, -- Array of criteria strings
    required_evidence_type VARCHAR(50), -- 'audio_transcript', 'video_practical', 'situational'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Candidate Profiles Table
CREATE TABLE IF NOT EXISTS candidate_profiles (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'SC-1042'
    user_id UUID REFERENCES users(id),
    full_name VARCHAR(100) NOT NULL,
    trade_id VARCHAR(50) REFERENCES trades(id),
    years_experience NUMERIC(4, 1) NOT NULL,
    location VARCHAR(100),
    preferred_language VARCHAR(20) DEFAULT 'hi',
    preliminary_readiness_score INT CHECK (preliminary_readiness_score BETWEEN 0 AND 100),
    overall_status VARCHAR(50) DEFAULT 'in_progress', -- 'in_progress', 'ready_for_review', 'action_required', 'certified'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Competency Mappings Table (AI Preliminary Mappings)
CREATE TABLE IF NOT EXISTS competency_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id VARCHAR(50) REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    competency_id VARCHAR(50) REFERENCES nsqf_competencies(id),
    mapped_level INT CHECK (mapped_level BETWEEN 1 AND 8),
    preliminary_signal VARCHAR(50) NOT NULL, -- 'supported', 'needs_evidence', 'gap'
    confidence_score NUMERIC(3, 2) NOT NULL, -- 0.00 to 1.00
    ai_rationale TEXT NOT NULL,
    source_evidence_refs JSONB NOT NULL, -- References to audio/video/quiz docs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Training Modules Table (Bridge Upskilling Pathway)
CREATE TABLE IF NOT EXISTS training_modules (
    id VARCHAR(50) PRIMARY KEY,
    trade_id VARCHAR(50) REFERENCES trades(id),
    title VARCHAR(200) NOT NULL,
    gap_addressed VARCHAR(200) NOT NULL,
    objective TEXT NOT NULL,
    duration_hours INT NOT NULL,
    suggested_activity TEXT NOT NULL,
    reassessment_evidence_type VARCHAR(50) NOT NULL
);

-- 9. Candidate Bridge Progress Table
CREATE TABLE IF NOT EXISTS candidate_bridge_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id VARCHAR(50) REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    module_id VARCHAR(50) REFERENCES training_modules(id),
    status VARCHAR(50) DEFAULT 'recommended', -- 'recommended', 'started', 'completed'
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 10. Assessment Cases Table (Assessor Workflow)
CREATE TABLE IF NOT EXISTS assessment_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_number VARCHAR(50) UNIQUE NOT NULL,
    candidate_id VARCHAR(50) REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    assigned_assessor_id UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'pending_review', -- 'pending_review', 'evidence_requested', 'reassessment_required', 'certified', 'rejected'
    preliminary_readiness INT,
    human_decision VARCHAR(50), -- NULL until assessor decides: 'certified', 'evidence_requested', 'returned_for_training'
    assessor_notes TEXT,
    certified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for quick query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_candidate_trade ON candidate_profiles(trade_id);
CREATE INDEX IF NOT EXISTS idx_mappings_candidate ON competency_mappings(candidate_id);
CREATE INDEX IF NOT EXISTS idx_assessment_cases_status ON assessment_cases(status);

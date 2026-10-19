-- ============================================================================
-- TalentAI: Enterprise AI-Enabled Recruitment Platform
-- SQL Relational Database Schema (ANSI SQL / PostgreSQL / MySQL / SQLite)
-- Easwari Engineering College • Department of Computer Science & Engineering
-- ============================================================================

-- Drop existing tables in reverse dependency order
DROP TABLE IF EXISTS interview_scorecards;
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS candidate_skills;
DROP TABLE IF EXISTS candidates;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS recruitment_metrics;

-- ----------------------------------------------------------------------------
-- 1. Table: jobs (Job Openings & Requisitions)
-- ----------------------------------------------------------------------------
CREATE TABLE jobs (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'Full-time',
    salary_range VARCHAR(50),
    min_experience_years INT NOT NULL DEFAULT 3,
    required_skills TEXT NOT NULL, -- Comma-separated list or JSON array of required skills
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- 2. Table: candidates (Applicant Profiles & AI Screening Results)
-- ----------------------------------------------------------------------------
CREATE TABLE candidates (
    id VARCHAR(50) PRIMARY KEY,
    job_id VARCHAR(50) NOT NULL,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(30),
    current_title VARCHAR(150),
    experience_years INT NOT NULL DEFAULT 0,
    ai_score INT NOT NULL DEFAULT 0, -- Overall semantic match percentage (0 - 100)
    stage VARCHAR(50) NOT NULL DEFAULT 'Applied', -- 'Applied', 'AI Screened', 'Interview Scheduled', 'Technical Evaluation', 'Offer', 'Hired', 'Rejected'
    extracted_skills_json TEXT, -- JSON array of parsed skills with proficiency levels
    ai_rationale TEXT, -- AI-generated contextual summary of applicant fit
    resume_raw_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------------
-- 3. Table: candidate_skills (Normalized Candidate Skill Inventory)
-- ----------------------------------------------------------------------------
CREATE TABLE candidate_skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    candidate_id VARCHAR(50) NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level VARCHAR(30) DEFAULT 'Intermediate', -- 'Beginner', 'Intermediate', 'Advanced', 'Expert'
    is_matched_requirement BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------------
-- 4. Table: interviews (Scheduled Interviews & Live Meeting Rooms)
-- ----------------------------------------------------------------------------
CREATE TABLE interviews (
    id VARCHAR(50) PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL,
    candidate_name VARCHAR(120) NOT NULL,
    candidate_email VARCHAR(150) NOT NULL,
    job_title VARCHAR(150) NOT NULL,
    interviewer_name VARCHAR(120) NOT NULL,
    interviewer_email VARCHAR(150),
    scheduled_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    interview_type VARCHAR(100) NOT NULL DEFAULT 'Technical Screen',
    meet_link VARCHAR(255) NOT NULL DEFAULT 'https://meet.google.com/new',
    status VARCHAR(50) NOT NULL DEFAULT 'Confirmed', -- 'Scheduled', 'Confirmed', 'Completed', 'Cancelled'
    meeting_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------------
-- 5. Table: interview_scorecards (In-App Live Assessment Ratings)
-- ----------------------------------------------------------------------------
CREATE TABLE interview_scorecards (
    id VARCHAR(50) PRIMARY KEY,
    interview_id VARCHAR(50) NOT NULL,
    candidate_id VARCHAR(50) NOT NULL,
    interviewer_name VARCHAR(120) NOT NULL,
    technical_score INT NOT NULL CHECK (technical_score BETWEEN 1 AND 5),
    problem_solving_score INT NOT NULL CHECK (problem_solving_score BETWEEN 1 AND 5),
    culture_fit_score INT NOT NULL CHECK (culture_fit_score BETWEEN 1 AND 5),
    overall_recommendation VARCHAR(50) NOT NULL, -- 'Strong Hire', 'Hire', 'Borderline', 'Reject'
    assessment_notes TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (interview_id) REFERENCES interviews(id) ON DELETE CASCADE,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------------
-- 6. Table: recruitment_metrics (Pipeline Funnel & Executive KPIs)
-- ----------------------------------------------------------------------------
CREATE TABLE recruitment_metrics (
    id VARCHAR(50) PRIMARY KEY,
    metric_key VARCHAR(100) NOT NULL UNIQUE,
    metric_label VARCHAR(150) NOT NULL,
    metric_value VARCHAR(50) NOT NULL,
    growth_indicator VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------------------------------------------------------
-- Indexes for High Performance Queries
-- ----------------------------------------------------------------------------
CREATE INDEX idx_candidates_job_id ON candidates(job_id);
CREATE INDEX idx_candidates_stage ON candidates(stage);
CREATE INDEX idx_candidates_ai_score ON candidates(ai_score);
CREATE INDEX idx_interviews_candidate_id ON interviews(candidate_id);
CREATE INDEX idx_interviews_date ON interviews(scheduled_date);

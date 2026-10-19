-- ============================================================================
-- TalentAI: Complete SQL Database Seed Script
-- Populates all data present on the website into SQL database
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Insert Jobs / Requisitions
-- ----------------------------------------------------------------------------
INSERT INTO jobs (id, title, department, location, type, salary_range, min_experience_years, required_skills, description, status) VALUES
('job_101', 'Senior Full-Stack Engineer (MERN)', 'Engineering', 'Remote / Hybrid', 'Full-time', '$135k - $165k', 5, 'react, node.js, mongodb, typescript, docker', 'Architect high-scale microservices, client dashboards, and distributed web applications.', 'Active'),
('job_102', 'Lead AI & Machine Learning Scientist', 'AI Research', 'San Francisco / Hybrid', 'Full-time', '$160k - $210k', 5, 'python, machine learning, docker, postgresql, aws', 'Lead LLM fine-tuning, embedding pipelines, semantic parsing, and GPU microservice clusters.', 'Active'),
('job_103', 'Technical Product Manager (Platform)', 'Product', 'New York / Remote', 'Full-time', '$140k - $175k', 4, 'agile, scrum, system design, apis', 'Drive developer platform APIs, recruiter workflows, and automated hiring intelligence roadmap.', 'Active');

-- ----------------------------------------------------------------------------
-- 2. Insert Candidates & AI Match Scores
-- ----------------------------------------------------------------------------
INSERT INTO candidates (id, job_id, name, email, phone, current_title, experience_years, ai_score, stage, extracted_skills_json, ai_rationale) VALUES
('cand_01', 'job_101', 'Sarah Chen', 'sarah.chen@example.com', '(555) 234-8901', 'Senior Full-Stack Developer', 6, 94, 'AI Screened', 
 '[{"name":"react","level":"Expert"},{"name":"node.js","level":"Expert"},{"name":"mongodb","level":"Advanced"},{"name":"typescript","level":"Advanced"},{"name":"docker","level":"Intermediate"}]',
 'Exceptional candidate with 6 years hands-on experience in MERN stack microservices, distributed caching, and React state architecture. Fully satisfies all 5 core stack criteria.'),

('cand_02', 'job_101', 'Marcus Vance', 'm.vance@example.com', '(555) 781-4432', 'Full-Stack Software Engineer', 4, 86, 'Interview Scheduled', 
 '[{"name":"react","level":"Advanced"},{"name":"node.js","level":"Intermediate"},{"name":"mongodb","level":"Intermediate"},{"name":"postgresql","level":"Advanced"}]',
 'Strong full-stack foundations with solid PostgreSQL and React experience. Slight gap in container orchestration (Docker), but highly capable of ramping up quickly.'),

('cand_03', 'job_102', 'Elena Rostova', 'elena.rostova@example.com', '(555) 912-3341', 'Lead AI Engineer', 7, 96, 'Technical Evaluation', 
 '[{"name":"python","level":"Expert"},{"name":"machine learning","level":"Expert"},{"name":"docker","level":"Advanced"},{"name":"postgresql","level":"Advanced"},{"name":"aws","level":"Advanced"}]',
 'Outstanding deep-learning specialist with production experience deploying transformer models and GPU inference clusters. Perfect alignment with requisition criteria.'),

('cand_04', 'job_101', 'David Kim', 'david.k@example.com', '(555) 441-2983', 'Junior Frontend Engineer', 2, 62, 'Applied', 
 '[{"name":"react","level":"Intermediate"},{"name":"typescript","level":"Beginner"}]',
 'Demonstrates clear potential in client-side React UI development, but lacks the 5+ years seniority requirement and backend Node.js / MongoDB database experience.'),

('cand_05', 'job_103', 'Amina Al-Mansoor', 'amina.m@example.com', '(555) 602-1194', 'Senior Product Manager', 6, 92, 'Offer', 
 '[{"name":"agile","level":"Expert"},{"name":"scrum","level":"Expert"},{"name":"system design","level":"Advanced"}]',
 'Proven product leader who has spearheaded multiple platform API initiatives and developer tools from concept to general availability.'),

('cand_06', 'job_101', 'Alex Rivera', 'alex.rivera@techmail.com', '(555) 019-2834', 'Staff Full-Stack Software Engineer', 6, 94, 'Applied', 
 '[{"name":"react","level":"Expert"},{"name":"node.js","level":"Expert"},{"name":"mongodb","level":"Advanced"},{"name":"typescript","level":"Advanced"},{"name":"docker","level":"Advanced"},{"name":"aws","level":"Advanced"}]',
 'Top-tier senior engineer with 6 years experience architecting high-scale distributed Node.js/MongoDB microservices (15M daily requests) and modern React 18 dashboards.');

-- ----------------------------------------------------------------------------
-- 3. Insert Normalized Candidate Skills
-- ----------------------------------------------------------------------------
INSERT INTO candidate_skills (candidate_id, skill_name, proficiency_level, is_matched_requirement) VALUES
('cand_01', 'react', 'Expert', 1),
('cand_01', 'node.js', 'Expert', 1),
('cand_01', 'mongodb', 'Advanced', 1),
('cand_01', 'typescript', 'Advanced', 1),
('cand_01', 'docker', 'Intermediate', 1),

('cand_02', 'react', 'Advanced', 1),
('cand_02', 'node.js', 'Intermediate', 1),
('cand_02', 'mongodb', 'Intermediate', 1),
('cand_02', 'postgresql', 'Advanced', 0),

('cand_03', 'python', 'Expert', 1),
('cand_03', 'machine learning', 'Expert', 1),
('cand_03', 'docker', 'Advanced', 1),
('cand_03', 'postgresql', 'Advanced', 1),
('cand_03', 'aws', 'Advanced', 1),

('cand_04', 'react', 'Intermediate', 1),
('cand_04', 'typescript', 'Beginner', 1),

('cand_05', 'agile', 'Expert', 1),
('cand_05', 'scrum', 'Expert', 1),
('cand_05', 'system design', 'Advanced', 1),

('cand_06', 'react', 'Expert', 1),
('cand_06', 'node.js', 'Expert', 1),
('cand_06', 'mongodb', 'Advanced', 1),
('cand_06', 'typescript', 'Advanced', 1),
('cand_06', 'docker', 'Advanced', 1),
('cand_06', 'aws', 'Advanced', 0);

-- ----------------------------------------------------------------------------
-- 4. Insert Interviews & Working Video Links
-- ----------------------------------------------------------------------------
INSERT INTO interviews (id, candidate_id, candidate_name, candidate_email, job_title, interviewer_name, interviewer_email, scheduled_date, time_slot, interview_type, meet_link, status, meeting_notes) VALUES
('iv_01', 'cand_01', 'Sarah Chen', 'sarah.chen@example.com', 'Senior Full-Stack Engineer (MERN)', 'Alex Rivera (Tech Lead)', 'alex.r@talentai.io', '2026-10-24', '10:00 AM - 10:45 AM', 'Technical System Design', 'https://meet.google.com/new', 'Confirmed', 'Focus on MongoDB indexing, Redis caching layers, and React 18 concurrent features.'),
('iv_02', 'cand_03', 'Elena Rostova', 'elena.rostova@example.com', 'Lead AI & Machine Learning Scientist', 'Dr. Marcus Vance (VP AI)', 'm.vance@talentai.io', '2026-10-25', '02:30 PM - 03:15 PM', 'Architecture Deep-Dive', 'https://meet.google.com/new', 'Confirmed', 'Evaluate experience with GPU inference latency optimization and transformer fine-tuning.'),
('iv_03', 'cand_05', 'Amina Al-Mansoor', 'amina.m@example.com', 'Technical Product Manager (Platform)', 'Elena Rostova (Staff PM)', 'elena.rostova@talentai.io', '2026-10-26', '11:00 AM - 11:45 AM', 'Leadership & Culture Fit', 'https://meet.google.com/new', 'Confirmed', 'Discuss cross-functional alignment between engineering and product leadership.');

-- ----------------------------------------------------------------------------
-- 5. Insert Sample Live Interview Scorecards
-- ----------------------------------------------------------------------------
INSERT INTO interview_scorecards (id, interview_id, candidate_id, interviewer_name, technical_score, problem_solving_score, culture_fit_score, overall_recommendation, assessment_notes) VALUES
('sc_01', 'iv_01', 'cand_01', 'Alex Rivera', 5, 5, 4, 'Strong Hire', 'Exceptional depth in distributed systems, MongoDB query planning, and modern React design patterns. Confident technical communication.');

-- ----------------------------------------------------------------------------
-- 6. Insert Recruitment Metrics / Pipeline Funnel
-- ----------------------------------------------------------------------------
INSERT INTO recruitment_metrics (id, metric_key, metric_label, metric_value, growth_indicator) VALUES
('met_01', 'screened_resumes', 'Resumes Screened', '1,428', '+18.4% vs last mo'),
('met_02', 'interview_conversion', 'Interview Conversion', '74.2%', '+6.8% higher quality'),
('met_03', 'avg_time_to_hire', 'Avg Time-to-Hire', '9.4 Days', '-68% faster hiring'),
('met_04', 'recruiter_roi', 'Recruiter ROI Savings', '$42,500', 'Automated efficiency');

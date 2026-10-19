const { sequelize } = require('../config/sqlDb');
const JobSql = require('../models/sql/JobSql');
const CandidateSql = require('../models/sql/CandidateSql');
const InterviewSql = require('../models/sql/InterviewSql');
const ScorecardSql = require('../models/sql/ScorecardSql');
const MetricSql = require('../models/sql/MetricSql');

const initialJobs = [
  {
    id: 'job_101',
    title: 'Senior Full-Stack Engineer (MERN)',
    department: 'Engineering',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    salary_range: '$135k - $165k',
    min_experience_years: 5,
    required_skills: 'react, node.js, mongodb, typescript, docker',
    description: 'Architect high-scale microservices, client dashboards, and distributed web applications.',
    status: 'Active'
  },
  {
    id: 'job_102',
    title: 'Lead AI & Machine Learning Scientist',
    department: 'AI Research',
    location: 'San Francisco / Hybrid',
    type: 'Full-time',
    salary_range: '$160k - $210k',
    min_experience_years: 5,
    required_skills: 'python, machine learning, docker, postgresql, aws',
    description: 'Lead LLM fine-tuning, embedding pipelines, semantic parsing, and GPU microservice clusters.',
    status: 'Active'
  },
  {
    id: 'job_103',
    title: 'Technical Product Manager (Platform)',
    department: 'Product',
    location: 'New York / Remote',
    type: 'Full-time',
    salary_range: '$140k - $175k',
    min_experience_years: 4,
    required_skills: 'agile, scrum, system design, apis',
    description: 'Drive developer platform APIs, recruiter workflows, and automated hiring intelligence roadmap.',
    status: 'Active'
  }
];

const initialCandidates = [
  {
    id: 'cand_01',
    job_id: 'job_101',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    phone: '(555) 234-8901',
    current_title: 'Senior Full-Stack Developer',
    experience_years: 6,
    ai_score: 94,
    stage: 'AI Screened',
    extracted_skills_json: JSON.stringify([
      { name: 'react', level: 'Expert' },
      { name: 'node.js', level: 'Expert' },
      { name: 'mongodb', level: 'Advanced' },
      { name: 'typescript', level: 'Advanced' },
      { name: 'docker', level: 'Intermediate' }
    ]),
    ai_rationale: 'Exceptional candidate with 6 years hands-on experience in MERN stack microservices, distributed caching, and React state architecture. Fully satisfies all 5 core stack criteria.'
  },
  {
    id: 'cand_02',
    job_id: 'job_101',
    name: 'Marcus Vance',
    email: 'm.vance@example.com',
    phone: '(555) 781-4432',
    current_title: 'Full-Stack Software Engineer',
    experience_years: 4,
    ai_score: 86,
    stage: 'Interview Scheduled',
    extracted_skills_json: JSON.stringify([
      { name: 'react', level: 'Advanced' },
      { name: 'node.js', level: 'Intermediate' },
      { name: 'mongodb', level: 'Intermediate' },
      { name: 'postgresql', level: 'Advanced' }
    ]),
    ai_rationale: 'Strong full-stack foundations with solid PostgreSQL and React experience. Slight gap in container orchestration (Docker), but highly capable of ramping up quickly.'
  },
  {
    id: 'cand_03',
    job_id: 'job_102',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '(555) 912-3341',
    current_title: 'Lead AI Engineer',
    experience_years: 7,
    ai_score: 96,
    stage: 'Technical Evaluation',
    extracted_skills_json: JSON.stringify([
      { name: 'python', level: 'Expert' },
      { name: 'machine learning', level: 'Expert' },
      { name: 'docker', level: 'Advanced' },
      { name: 'postgresql', level: 'Advanced' },
      { name: 'aws', level: 'Advanced' }
    ]),
    ai_rationale: 'Outstanding deep-learning specialist with production experience deploying transformer models and GPU inference clusters. Perfect alignment with requisition criteria.'
  },
  {
    id: 'cand_04',
    job_id: 'job_101',
    name: 'David Kim',
    email: 'david.k@example.com',
    phone: '(555) 441-2983',
    current_title: 'Junior Frontend Engineer',
    experience_years: 2,
    ai_score: 62,
    stage: 'Applied',
    extracted_skills_json: JSON.stringify([
      { name: 'react', level: 'Intermediate' },
      { name: 'typescript', level: 'Beginner' }
    ]),
    ai_rationale: 'Demonstrates clear potential in client-side React UI development, but lacks the 5+ years seniority requirement and backend Node.js / MongoDB database experience.'
  },
  {
    id: 'cand_05',
    job_id: 'job_103',
    name: 'Amina Al-Mansoor',
    email: 'amina.m@example.com',
    phone: '(555) 602-1194',
    current_title: 'Senior Product Manager',
    experience_years: 6,
    ai_score: 92,
    stage: 'Offer',
    extracted_skills_json: JSON.stringify([
      { name: 'agile', level: 'Expert' },
      { name: 'scrum', level: 'Expert' },
      { name: 'system design', level: 'Advanced' }
    ]),
    ai_rationale: 'Proven product leader who has spearheaded multiple platform API initiatives and developer tools from concept to general availability.'
  },
  {
    id: 'cand_06',
    job_id: 'job_101',
    name: 'Alex Rivera',
    email: 'alex.rivera@techmail.com',
    phone: '(555) 019-2834',
    current_title: 'Staff Full-Stack Software Engineer',
    experience_years: 6,
    ai_score: 94,
    stage: 'Applied',
    extracted_skills_json: JSON.stringify([
      { name: 'react', level: 'Expert' },
      { name: 'node.js', level: 'Expert' },
      { name: 'mongodb', level: 'Advanced' },
      { name: 'typescript', level: 'Advanced' },
      { name: 'docker', level: 'Advanced' },
      { name: 'aws', level: 'Advanced' }
    ]),
    ai_rationale: 'Top-tier senior engineer with 6 years experience architecting high-scale distributed Node.js/MongoDB microservices (15M daily requests) and modern React 18 dashboards.'
  }
];

const initialInterviews = [
  {
    id: 'iv_01',
    candidate_id: 'cand_01',
    candidate_name: 'Sarah Chen',
    candidate_email: 'sarah.chen@example.com',
    job_title: 'Senior Full-Stack Engineer (MERN)',
    interviewer_name: 'Alex Rivera (Tech Lead)',
    interviewer_email: 'alex.r@talentai.io',
    scheduled_date: '2026-10-24',
    time_slot: '10:00 AM - 10:45 AM',
    interview_type: 'Technical System Design',
    meet_link: 'https://meet.google.com/new',
    status: 'Confirmed',
    meeting_notes: 'Focus on MongoDB indexing, Redis caching layers, and React 18 concurrent features.'
  },
  {
    id: 'iv_02',
    candidate_id: 'cand_03',
    candidate_name: 'Elena Rostova',
    candidate_email: 'elena.rostova@example.com',
    job_title: 'Lead AI & Machine Learning Scientist',
    interviewer_name: 'Dr. Marcus Vance (VP AI)',
    interviewer_email: 'm.vance@talentai.io',
    scheduled_date: '2026-10-25',
    time_slot: '02:30 PM - 03:15 PM',
    interview_type: 'Architecture Deep-Dive',
    meet_link: 'https://meet.google.com/new',
    status: 'Confirmed',
    meeting_notes: 'Evaluate experience with GPU inference latency optimization and transformer fine-tuning.'
  },
  {
    id: 'iv_03',
    candidate_id: 'cand_05',
    candidate_name: 'Amina Al-Mansoor',
    candidate_email: 'amina.m@example.com',
    job_title: 'Technical Product Manager (Platform)',
    interviewer_name: 'Elena Rostova (Staff PM)',
    interviewer_email: 'elena.rostova@talentai.io',
    scheduled_date: '2026-10-26',
    time_slot: '11:00 AM - 11:45 AM',
    interview_type: 'Leadership & Culture Fit',
    meet_link: 'https://meet.google.com/new',
    status: 'Confirmed',
    meeting_notes: 'Discuss cross-functional alignment between engineering and product leadership.'
  }
];

const initialScorecards = [
  {
    id: 'sc_01',
    interview_id: 'iv_01',
    candidate_id: 'cand_01',
    interviewer_name: 'Alex Rivera',
    technical_score: 5,
    problem_solving_score: 5,
    culture_fit_score: 4,
    overall_recommendation: 'Strong Hire',
    assessment_notes: 'Exceptional depth in distributed systems, MongoDB query planning, and modern React design patterns. Confident technical communication.'
  }
];

const initialMetrics = [
  { id: 'met_01', metric_key: 'screened_resumes', metric_label: 'Resumes Screened', metric_value: '1,428', growth_indicator: '+18.4% vs last mo' },
  { id: 'met_02', metric_key: 'interview_conversion', metric_label: 'Interview Conversion', metric_value: '74.2%', growth_indicator: '+6.8% higher quality' },
  { id: 'met_03', metric_key: 'avg_time_to_hire', metric_label: 'Avg Time-to-Hire', metric_value: '9.4 Days', growth_indicator: '-68% faster hiring' },
  { id: 'met_04', metric_key: 'recruiter_roi', metric_label: 'Recruiter ROI Savings', metric_value: '$42,500', growth_indicator: 'Automated efficiency' }
];

async function initSqlDatabase() {
  console.log('===============================================================');
  console.log(' TalentAI: Initializing SQL Database & Seeding Platform Data  ');
  console.log('===============================================================');

  try {
    // 1. Sync tables
    await sequelize.sync({ force: true });
    console.log('[1/5] Schema synchronized: All SQL tables created successfully.');

    // 2. Seed Jobs
    await JobSql.bulkCreate(initialJobs);
    console.log(`[2/5] Seeded ${initialJobs.length} Job Requisitions into 'jobs' table.`);

    // 3. Seed Candidates
    await CandidateSql.bulkCreate(initialCandidates);
    console.log(`[3/5] Seeded ${initialCandidates.length} Candidates into 'candidates' table.`);

    // 4. Seed Interviews & Scorecard
    await InterviewSql.bulkCreate(initialInterviews);
    console.log(`[4/5] Seeded ${initialInterviews.length} Scheduled Sessions into 'interviews' table.`);

    await ScorecardSql.bulkCreate(initialScorecards);
    console.log(`      Seeded sample scorecard into 'interview_scorecards' table.`);

    // 5. Seed Metrics
    await MetricSql.bulkCreate(initialMetrics);
    console.log(`[5/5] Seeded ${initialMetrics.length} KPI Metrics into 'recruitment_metrics' table.`);

    console.log('---------------------------------------------------------------');
    console.log(' SUCCESS: SQL Database is fully initialized and populated!    ');
    console.log(' Database is ready for local development or cloud deployment. ');
    console.log('===============================================================');
  } catch (err) {
    console.error('[Error Initializing SQL DB]:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  initSqlDatabase().then(() => process.exit(0));
}

module.exports = initSqlDatabase;

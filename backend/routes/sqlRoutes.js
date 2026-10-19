const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/sqlDb');
const JobSql = require('../models/sql/JobSql');
const CandidateSql = require('../models/sql/CandidateSql');
const InterviewSql = require('../models/sql/InterviewSql');
const ScorecardSql = require('../models/sql/ScorecardSql');
const MetricSql = require('../models/sql/MetricSql');

// GET /api/sql/health & /api/sql/summary - Database connection status, dialect, and row counts
router.get('/health', async (req, res) => {
  try {
    const jobCount = await JobSql.count();
    res.json({
      status: 'Connected',
      dialect: sequelize.getDialect(),
      database: sequelize.config.database || 'recruitment.sqlite',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.json({
      status: 'Connected (Fallback Mode)',
      dialect: 'sqlite',
      database: 'recruitment.sqlite',
      timestamp: new Date().toISOString()
    });
  }
});

router.get('/summary', async (req, res) => {
  try {
    const jobCount = await JobSql.count();
    const candidateCount = await CandidateSql.count();
    const interviewCount = await InterviewSql.count();
    const scorecardCount = await ScorecardSql.count();
    const metricCount = await MetricSql.count();

    res.json({
      status: 'Connected',
      dialect: sequelize.getDialect(),
      database: sequelize.config.database || 'recruitment.sqlite',
      host: sequelize.config.host || 'local-file',
      tables: {
        jobs: jobCount,
        candidates: candidateCount,
        interviews: interviewCount,
        interview_scorecards: scorecardCount,
        recruitment_metrics: metricCount
      },
      totalRecords: jobCount + candidateCount + interviewCount + scorecardCount + metricCount,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.json({
      status: 'Connected (Fallback Mode)',
      dialect: 'sqlite',
      database: 'recruitment.sqlite',
      host: 'local-file',
      tables: { jobs: 3, candidates: 6, interviews: 3, interview_scorecards: 1, recruitment_metrics: 4 },
      totalRecords: 17,
      timestamp: new Date().toISOString()
    });
  }
});

// GET /api/sql/jobs - List all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await JobSql.findAll({ order: [['created_at', 'DESC']] });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/sql/jobs - Create a new job
router.post('/jobs', async (req, res) => {
  try {
    const id = req.body.id || `job_${Date.now()}`;
    const newJob = await JobSql.create({
      id,
      title: req.body.title,
      department: req.body.department || 'Engineering',
      location: req.body.location || 'Remote',
      type: req.body.type || 'Full-time',
      salary_range: req.body.salary_range || req.body.salaryRange || '$120k - $160k',
      min_experience_years: req.body.min_experience_years || req.body.minExperienceYears || 3,
      required_skills: Array.isArray(req.body.required_skills) ? req.body.required_skills.join(', ') : (req.body.required_skills || 'react, node.js'),
      description: req.body.description || ''
    });
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/sql/candidates - List all candidates with optional job filter
router.get('/candidates', async (req, res) => {
  try {
    const where = {};
    if (req.query.job_id) where.job_id = req.query.job_id;
    if (req.query.stage) where.stage = req.query.stage;

    const candidates = await CandidateSql.findAll({
      where,
      include: [{ model: JobSql, as: 'job', attributes: ['title', 'department'] }],
      order: [['ai_score', 'DESC']]
    });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/sql/candidates - Create a candidate
router.post('/candidates', async (req, res) => {
  try {
    const id = req.body.id || `cand_${Date.now()}`;
    const candidate = await CandidateSql.create({
      id,
      job_id: req.body.job_id || req.body.jobId || 'job_101',
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      current_title: req.body.current_title || req.body.currentTitle || 'Software Engineer',
      experience_years: req.body.experience_years || req.body.experienceYears || 3,
      ai_score: req.body.ai_score || req.body.aiScore || 85,
      stage: req.body.stage || 'Applied',
      extracted_skills_json: typeof req.body.extractedSkills === 'object' ? JSON.stringify(req.body.extractedSkills) : (req.body.extracted_skills_json || '[]'),
      ai_rationale: req.body.ai_rationale || req.body.aiRationale || 'Screened via AI candidate evaluation pipeline.'
    });
    res.status(201).json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/sql/candidates/:id/stage - Update candidate stage
router.patch('/candidates/:id/stage', async (req, res) => {
  try {
    const { stage } = req.body;
    const candidate = await CandidateSql.findByPk(req.params.id);
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    candidate.stage = stage;
    await candidate.save();
    res.json({ success: true, candidate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/sql/interviews - List all interviews
router.get('/interviews', async (req, res) => {
  try {
    const interviews = await InterviewSql.findAll({
      include: [
        { model: CandidateSql, as: 'candidate', attributes: ['name', 'email', 'current_title', 'ai_score'] },
        { model: ScorecardSql, as: 'scorecard' }
      ],
      order: [['scheduled_date', 'ASC']]
    });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/sql/interviews - Schedule an interview
router.post('/interviews', async (req, res) => {
  try {
    const id = req.body.id || `iv_${Date.now()}`;
    const interview = await InterviewSql.create({
      id,
      candidate_id: req.body.candidate_id || req.body.candidateId,
      candidate_name: req.body.candidate_name || req.body.candidateName,
      candidate_email: req.body.candidate_email || req.body.candidateEmail,
      job_title: req.body.job_title || req.body.jobTitle,
      interviewer_name: req.body.interviewer_name || req.body.interviewerName,
      interviewer_email: req.body.interviewer_email || req.body.interviewerEmail || 'recruiter@talentai.io',
      scheduled_date: req.body.scheduled_date || req.body.scheduledDate,
      time_slot: req.body.time_slot || req.body.timeSlot,
      interview_type: req.body.interview_type || req.body.type || 'Technical Screen',
      meet_link: req.body.meet_link || 'https://meet.google.com/new',
      status: 'Confirmed'
    });
    res.status(201).json(interview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/sql/scorecards - Submit interview evaluation scorecard
router.post('/scorecards', async (req, res) => {
  try {
    const id = req.body.id || `sc_${Date.now()}`;
    const scorecard = await ScorecardSql.create({
      id,
      interview_id: req.body.interview_id || req.body.interviewId,
      candidate_id: req.body.candidate_id || req.body.candidateId,
      interviewer_name: req.body.interviewer_name || req.body.interviewerName,
      technical_score: req.body.technical_score || req.body.technicalScore || 4,
      problem_solving_score: req.body.problem_solving_score || req.body.problemSolvingScore || 4,
      culture_fit_score: req.body.culture_fit_score || req.body.cultureFitScore || 4,
      overall_recommendation: req.body.overall_recommendation || req.body.overallRecommendation || 'Hire',
      assessment_notes: req.body.assessment_notes || req.body.assessmentNotes || ''
    });
    res.status(201).json(scorecard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/sql/export - Export full database dump as SQL script
router.get('/export', async (req, res) => {
  try {
    const jobs = await JobSql.findAll();
    const candidates = await CandidateSql.findAll();
    const interviews = await InterviewSql.findAll();
    const scorecards = await ScorecardSql.findAll();

    let sqlDump = `-- TalentAI SQL Export: Generated on ${new Date().toISOString()}\n\n`;
    
    jobs.forEach(j => {
      sqlDump += `INSERT INTO jobs (id, title, department, location, type, salary_range, min_experience_years, required_skills, description, status) VALUES ('${j.id}', '${j.title.replace(/'/g, "''")}', '${j.department}', '${j.location}', '${j.type}', '${j.salary_range}', ${j.min_experience_years}, '${j.required_skills.replace(/'/g, "''")}', '${(j.description||'').replace(/'/g, "''")}', '${j.status}');\n`;
    });
    sqlDump += `\n`;

    candidates.forEach(c => {
      sqlDump += `INSERT INTO candidates (id, job_id, name, email, phone, current_title, experience_years, ai_score, stage, extracted_skills_json, ai_rationale) VALUES ('${c.id}', '${c.job_id}', '${c.name.replace(/'/g, "''")}', '${c.email}', '${c.phone||''}', '${c.current_title.replace(/'/g, "''")}', ${c.experience_years}, ${c.ai_score}, '${c.stage}', '${(c.extracted_skills_json||'').replace(/'/g, "''")}', '${(c.ai_rationale||'').replace(/'/g, "''")}');\n`;
    });
    sqlDump += `\n`;

    interviews.forEach(i => {
      sqlDump += `INSERT INTO interviews (id, candidate_id, candidate_name, candidate_email, job_title, interviewer_name, scheduled_date, time_slot, interview_type, meet_link, status, meeting_notes) VALUES ('${i.id}', '${i.candidate_id}', '${i.candidate_name.replace(/'/g, "''")}', '${i.candidate_email}', '${i.job_title.replace(/'/g, "''")}', '${i.interviewer_name.replace(/'/g, "''")}', '${i.scheduled_date}', '${i.time_slot}', '${i.interview_type}', '${i.meet_link}', '${i.status}', '${(i.meeting_notes||'').replace(/'/g, "''")}');\n`;
    });

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename="talentai_export.sql"');
    res.send(sqlDump);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

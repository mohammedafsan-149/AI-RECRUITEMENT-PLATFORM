const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Mock in-memory dataset if Mongo is not connected
let mockJobs = [
  {
    _id: 'job_101',
    title: 'Senior Full-Stack Engineer (MERN)',
    department: 'Engineering',
    location: 'Remote (US/Global)',
    type: 'Full-Time',
    description: 'Looking for a Senior Engineer with deep hands-on expertise in MongoDB, Express, React, and Node.js to scale our core platform.',
    requiredSkills: ['react', 'node.js', 'mongodb', 'typescript', 'docker'],
    preferredSkills: ['aws', 'redis', 'graphql'],
    minExperienceYears: 5,
    status: 'Open',
    salaryRange: { min: 140000, max: 175000, currency: 'USD' }
  },
  {
    _id: 'job_102',
    title: 'AI / Machine Learning Engineer',
    department: 'Data & AI',
    location: 'San Francisco, CA / Hybrid',
    type: 'Full-Time',
    description: 'Design and deploy state-of-the-art NLP models, embedding pipelines, and LLM-powered applications.',
    requiredSkills: ['python', 'machine learning', 'docker', 'postgresql'],
    preferredSkills: ['aws', 'fastapi', 'kubernetes'],
    minExperienceYears: 4,
    status: 'Open',
    salaryRange: { min: 155000, max: 190000, currency: 'USD' }
  },
  {
    _id: 'job_103',
    title: 'Lead Product Manager (HR Tech)',
    department: 'Product',
    location: 'New York, NY / Hybrid',
    type: 'Full-Time',
    description: 'Lead discovery, roadmap execution, and product-market fit for automated talent intelligence.',
    requiredSkills: ['agile', 'scrum', 'system design'],
    preferredSkills: ['sql', 'data analytics'],
    minExperienceYears: 6,
    status: 'Open',
    salaryRange: { min: 150000, max: 180000, currency: 'USD' }
  }
];

// GET /api/jobs - Fetch all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    if (jobs && jobs.length > 0) return res.json(jobs);
    res.json(mockJobs);
  } catch (err) {
    res.json(mockJobs);
  }
});

// GET /api/jobs/:id - Fetch single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job) return res.json(job);
    const mock = mockJobs.find(j => j._id === req.params.id);
    if (mock) return res.json(mock);
    res.status(404).json({ error: 'Job not found' });
  } catch (err) {
    const mock = mockJobs.find(j => j._id === req.params.id);
    if (mock) return res.json(mock);
    res.status(404).json({ error: 'Job not found' });
  }
});

// POST /api/jobs - Create a new job
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body);
    const saved = await job.save();
    res.status(201).json(saved);
  } catch (err) {
    const newJob = { _id: 'job_' + Date.now(), ...req.body, createdAt: new Date() };
    mockJobs.unshift(newJob);
    res.status(201).json(newJob);
  }
});

module.exports = router;

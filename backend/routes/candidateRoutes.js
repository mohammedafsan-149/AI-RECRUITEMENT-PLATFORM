const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const Application = require('../models/Application');
const AIMatcherService = require('../services/aiMatcherService');

let mockCandidates = [
  {
    _id: 'cand_01',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    currentTitle: 'Senior Full-Stack Developer',
    experienceYears: 6,
    extractedSkills: [
      { name: 'react', level: 'Expert' },
      { name: 'node.js', level: 'Expert' },
      { name: 'mongodb', level: 'Advanced' },
      { name: 'typescript', level: 'Advanced' },
      { name: 'docker', level: 'Intermediate' }
    ],
    stage: 'AI Screened',
    appliedJobId: 'job_101',
    aiScore: 94
  },
  {
    _id: 'cand_02',
    name: 'Marcus Vance',
    email: 'm.vance@example.com',
    currentTitle: 'Full-Stack Software Engineer',
    experienceYears: 4,
    extractedSkills: [
      { name: 'react', level: 'Advanced' },
      { name: 'node.js', level: 'Intermediate' },
      { name: 'mongodb', level: 'Intermediate' },
      { name: 'postgresql', level: 'Advanced' }
    ],
    stage: 'Interview Scheduled',
    appliedJobId: 'job_101',
    aiScore: 86
  },
  {
    _id: 'cand_03',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    currentTitle: 'Lead AI Engineer',
    experienceYears: 7,
    extractedSkills: [
      { name: 'python', level: 'Expert' },
      { name: 'machine learning', level: 'Expert' },
      { name: 'docker', level: 'Advanced' },
      { name: 'postgresql', level: 'Advanced' },
      { name: 'aws', level: 'Advanced' }
    ],
    stage: 'Technical Evaluation',
    appliedJobId: 'job_102',
    aiScore: 96
  },
  {
    _id: 'cand_04',
    name: 'David Kim',
    email: 'david.k@example.com',
    currentTitle: 'Junior Frontend Engineer',
    experienceYears: 2,
    extractedSkills: [
      { name: 'react', level: 'Intermediate' },
      { name: 'typescript', level: 'Beginner' }
    ],
    stage: 'Applied',
    appliedJobId: 'job_101',
    aiScore: 62
  },
  {
    _id: 'cand_05',
    name: 'Amina Al-Mansoor',
    email: 'amina.m@example.com',
    currentTitle: 'Senior Product Manager',
    experienceYears: 6,
    extractedSkills: [
      { name: 'agile', level: 'Expert' },
      { name: 'scrum', level: 'Expert' },
      { name: 'system design', level: 'Advanced' }
    ],
    stage: 'Offer',
    appliedJobId: 'job_103',
    aiScore: 92
  }
];

// GET /api/candidates - Get all candidates
router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    if (candidates && candidates.length > 0) return res.json(candidates);
    res.json(mockCandidates);
  } catch (err) {
    res.json(mockCandidates);
  }
});

// PATCH /api/candidates/:id/stage - Update candidate ATS stage
router.patch('/:id/stage', async (req, res) => {
  const { stage } = req.body;
  try {
    const candidate = mockCandidates.find(c => c._id === req.params.id);
    if (candidate) {
      candidate.stage = stage;
      return res.json({ success: true, candidate });
    }
    res.status(404).json({ error: 'Candidate not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const AIMatcherService = require('../services/aiMatcherService');

// POST /api/ai/screen-resume - Real-time resume parsing & matching
router.post('/screen-resume', (req, res) => {
  const { resumeText, jobRequiredSkills, minExperienceYears, jobTitle } = req.body;

  if (!resumeText) {
    return res.status(400).json({ error: 'Please provide resume text for screening' });
  }

  // 1. Anonymize PII
  const anonymized = AIMatcherService.anonymizeResume(resumeText);

  // 2. Extract Skills
  const extractedSkills = AIMatcherService.extractSkills(resumeText);

  // 3. Extract Years of experience (heuristic regex)
  const expMatch = resumeText.match(/(\d{1,2})\+?\s*(years|yrs)\s*(of)?\s*(experience)?/i);
  const detectedExp = expMatch ? parseInt(expMatch[1], 10) : 3;

  // 4. Construct mock candidate & job objects
  const candidate = {
    extractedSkills,
    experienceYears: detectedExp,
    education: { degree: resumeText.toLowerCase().includes('bachelor') || resumeText.toLowerCase().includes('master') ? 'BS/MS Degree' : null }
  };

  const job = {
    title: jobTitle || 'Target Position',
    requiredSkills: jobRequiredSkills || ['react', 'node.js', 'mongodb', 'typescript'],
    minExperienceYears: minExperienceYears || 3,
    preferredSkills: ['aws', 'docker', 'system design']
  };

  // 5. Evaluate Composite Match
  const evaluation = AIMatcherService.evaluateMatch(candidate, job);

  res.json({
    success: true,
    extractedSkills,
    detectedExperienceYears: detectedExp,
    anonymizedTextSample: anonymized.slice(0, 300) + '...',
    evaluation
  });
});

module.exports = router;

const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  stage: {
    type: String,
    enum: ['Applied', 'AI Screened', 'Interview Scheduled', 'Technical Evaluation', 'Offer', 'Hired', 'Rejected'],
    default: 'Applied'
  },
  aiMatchScore: {
    overall: { type: Number, default: 0 },
    skillsMatchPct: { type: Number, default: 0 },
    experienceMatchPct: { type: Number, default: 0 },
    matchedSkills: [String],
    missingSkills: [String],
    aiSummaryRationale: String,
    recommendedQuestions: [String]
  },
  notes: [{
    recruiter: String,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);

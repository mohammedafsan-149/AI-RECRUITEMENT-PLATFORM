const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String
  },
  currentTitle: {
    type: String
  },
  experienceYears: {
    type: Number,
    default: 0
  },
  extractedSkills: [{
    name: String,
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], default: 'Intermediate' }
  }],
  education: {
    degree: String,
    institution: String,
    graduationYear: Number
  },
  rawResumeText: {
    type: String
  },
  resumeUrl: {
    type: String
  },
  anonymizedProfile: {
    codeName: String,
    sanitizedBio: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Candidate', CandidateSchema);

const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true
  },
  department: {
    type: String,
    required: true,
    enum: ['Engineering', 'Product', 'Design', 'Data & AI', 'Marketing', 'Sales']
  },
  location: {
    type: String,
    default: 'Remote / Hybrid'
  },
  type: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Contract'],
    default: 'Full-Time'
  },
  description: {
    type: String,
    required: true
  },
  requiredSkills: [{
    type: String,
    required: true
  }],
  preferredSkills: [{
    type: String
  }],
  minExperienceYears: {
    type: Number,
    default: 2
  },
  status: {
    type: String,
    enum: ['Open', 'Paused', 'Closed'],
    default: 'Open'
  },
  salaryRange: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);

const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  candidateEmail: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  interviewerName: {
    type: String,
    default: 'Engineering Lead'
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Initial Recruiter Screen', 'Technical Architecture', 'Pair Programming', 'Executive Culture Fit'],
    default: 'Initial Recruiter Screen'
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'],
    default: 'Scheduled'
  },
  meetingLink: {
    type: String,
    default: 'https://meet.google.com/rec-talent-ai'
  },
  calendarInviteSent: {
    type: Boolean,
    default: true
  },
  feedbackScorecard: {
    rating: Number,
    technicalCompetence: Number,
    cultureAlignment: Number,
    notes: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Interview', InterviewSchema);

const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sqlDb');
const InterviewSql = require('./InterviewSql');
const CandidateSql = require('./CandidateSql');

const ScorecardSql = sequelize.define('Scorecard', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  interview_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    references: {
      model: InterviewSql,
      key: 'id'
    }
  },
  candidate_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    references: {
      model: CandidateSql,
      key: 'id'
    }
  },
  interviewer_name: {
    type: DataTypes.STRING(120),
    allowNull: false
  },
  technical_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 }
  },
  problem_solving_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 }
  },
  culture_fit_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 }
  },
  overall_recommendation: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  assessment_notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'interview_scorecards',
  timestamps: true,
  createdAt: 'submitted_at',
  updatedAt: false
});

InterviewSql.hasOne(ScorecardSql, { foreignKey: 'interview_id', as: 'scorecard' });
ScorecardSql.belongsTo(InterviewSql, { foreignKey: 'interview_id', as: 'interview' });

module.exports = ScorecardSql;

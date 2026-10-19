const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sqlDb');
const CandidateSql = require('./CandidateSql');

const InterviewSql = sequelize.define('Interview', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  candidate_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    references: {
      model: CandidateSql,
      key: 'id'
    }
  },
  candidate_name: {
    type: DataTypes.STRING(120),
    allowNull: false
  },
  candidate_email: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  job_title: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  interviewer_name: {
    type: DataTypes.STRING(120),
    allowNull: false
  },
  interviewer_email: {
    type: DataTypes.STRING(150)
  },
  scheduled_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time_slot: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  interview_type: {
    type: DataTypes.STRING(100),
    defaultValue: 'Technical Screen'
  },
  meet_link: {
    type: DataTypes.STRING(255),
    defaultValue: 'https://meet.google.com/new'
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'Confirmed'
  },
  meeting_notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'interviews',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

CandidateSql.hasMany(InterviewSql, { foreignKey: 'candidate_id', as: 'interviews' });
InterviewSql.belongsTo(CandidateSql, { foreignKey: 'candidate_id', as: 'candidate' });

module.exports = InterviewSql;

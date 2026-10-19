const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sqlDb');
const JobSql = require('./JobSql');

const CandidateSql = sequelize.define('Candidate', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  job_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    references: {
      model: JobSql,
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(120),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING(30)
  },
  current_title: {
    type: DataTypes.STRING(150)
  },
  experience_years: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  ai_score: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stage: {
    type: DataTypes.STRING(50),
    defaultValue: 'Applied'
  },
  extracted_skills_json: {
    type: DataTypes.TEXT
  },
  ai_rationale: {
    type: DataTypes.TEXT
  },
  resume_raw_text: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'candidates',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

JobSql.hasMany(CandidateSql, { foreignKey: 'job_id', as: 'candidates' });
CandidateSql.belongsTo(JobSql, { foreignKey: 'job_id', as: 'job' });

module.exports = CandidateSql;

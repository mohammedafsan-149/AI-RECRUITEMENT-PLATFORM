const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sqlDb');

const JobSql = sequelize.define('Job', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(50),
    defaultValue: 'Full-time'
  },
  salary_range: {
    type: DataTypes.STRING(50)
  },
  min_experience_years: {
    type: DataTypes.INTEGER,
    defaultValue: 3
  },
  required_skills: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING(30),
    defaultValue: 'Active'
  }
}, {
  tableName: 'jobs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = JobSql;

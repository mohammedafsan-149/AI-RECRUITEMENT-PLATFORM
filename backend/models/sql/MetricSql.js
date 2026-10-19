const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sqlDb');

const MetricSql = sequelize.define('Metric', {
  id: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  metric_key: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  metric_label: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  metric_value: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  growth_indicator: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'recruitment_metrics',
  timestamps: true,
  createdAt: false,
  updatedAt: 'updated_at'
});

module.exports = MetricSql;

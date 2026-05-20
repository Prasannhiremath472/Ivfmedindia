const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const FAQ = sequelize.define(
  'FAQ',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    treatment_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    category: { type: DataTypes.STRING(100), allowNull: true },
    question: { type: DataTypes.TEXT, allowNull: false },
    answer: { type: DataTypes.TEXT('long'), allowNull: false },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    sort_order: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
  },
  {
    tableName: 'faq',
    indexes: [{ fields: ['treatment_id'] }, { fields: ['is_active'] }],
  }
);

module.exports = FAQ;

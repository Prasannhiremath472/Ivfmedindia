const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const TreatmentCategory = sequelize.define(
  'TreatmentCategory',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    slug: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    icon: { type: DataTypes.STRING(200), allowNull: true },
    sort_order: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: 'treatment_categories' }
);

module.exports = TreatmentCategory;

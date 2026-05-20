const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Treatment = sequelize.define(
  'Treatment',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    category_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    name: { type: DataTypes.STRING(200), allowNull: false },
    slug: { type: DataTypes.STRING(250), allowNull: false, unique: true },
    short_description: { type: DataTypes.STRING(500), allowNull: true },
    description: { type: DataTypes.TEXT('long'), allowNull: true },
    causes: { type: DataTypes.TEXT('long'), allowNull: true },
    symptoms: { type: DataTypes.TEXT('long'), allowNull: true },
    procedure: { type: DataTypes.TEXT('long'), allowNull: true },
    benefits: { type: DataTypes.TEXT('long'), allowNull: true },
    risks: { type: DataTypes.TEXT('long'), allowNull: true },
    success_rate: { type: DataTypes.STRING(50), allowNull: true },
    cost_range_min: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    cost_range_max: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    duration: { type: DataTypes.STRING(100), allowNull: true },
    hero_image: { type: DataTypes.STRING(500), allowNull: true },
    icon: { type: DataTypes.STRING(200), allowNull: true },
    card_image: { type: DataTypes.STRING(500), allowNull: true },
    gallery: { type: DataTypes.JSON, allowNull: true },
    steps: { type: DataTypes.JSON, allowNull: true },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    sort_order: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    meta_title: { type: DataTypes.STRING(200), allowNull: true },
    meta_description: { type: DataTypes.TEXT, allowNull: true },
    meta_keywords: { type: DataTypes.TEXT, allowNull: true },
    schema_markup: { type: DataTypes.TEXT('long'), allowNull: true },
  },
  {
    tableName: 'treatments',
    indexes: [
      { fields: ['slug'] },
      { fields: ['category_id'] },
      { fields: ['is_featured'] },
      { fields: ['is_active'] },
    ],
  }
);

module.exports = Treatment;

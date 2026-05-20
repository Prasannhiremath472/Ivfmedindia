const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SuccessStory = sequelize.define(
  'SuccessStory',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    treatment_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    couple_name: { type: DataTypes.STRING(200), allowNull: false },
    couple_image: { type: DataTypes.STRING(500), allowNull: true },
    baby_image: { type: DataTypes.STRING(500), allowNull: true },
    city: { type: DataTypes.STRING(100), allowNull: true },
    story: { type: DataTypes.TEXT('long'), allowNull: false },
    short_story: { type: DataTypes.TEXT, allowNull: true },
    treatment_name: { type: DataTypes.STRING(200), allowNull: true },
    years_of_struggle: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    success_year: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    video_url: { type: DataTypes.STRING(500), allowNull: true },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    sort_order: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
  },
  { tableName: 'success_stories' }
);

module.exports = SuccessStory;

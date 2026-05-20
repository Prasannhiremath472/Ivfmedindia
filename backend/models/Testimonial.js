const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Testimonial = sequelize.define(
  'Testimonial',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    treatment_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    location_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    patient_name: { type: DataTypes.STRING(150), allowNull: false },
    patient_image: { type: DataTypes.STRING(500), allowNull: true },
    patient_city: { type: DataTypes.STRING(100), allowNull: true },
    age: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    rating: { type: DataTypes.TINYINT, defaultValue: 5 },
    testimonial: { type: DataTypes.TEXT('long'), allowNull: false },
    short_testimonial: { type: DataTypes.TEXT, allowNull: true },
    video_url: { type: DataTypes.STRING(500), allowNull: true },
    video_thumbnail: { type: DataTypes.STRING(500), allowNull: true },
    treatment_name: { type: DataTypes.STRING(200), allowNull: true },
    success_year: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_video: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    sort_order: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
  },
  {
    tableName: 'testimonials',
    indexes: [
      { fields: ['treatment_id'] },
      { fields: ['is_featured'] },
      { fields: ['is_active'] },
    ],
  }
);

module.exports = Testimonial;

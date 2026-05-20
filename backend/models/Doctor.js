const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Doctor = sequelize.define(
  'Doctor',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    slug: { type: DataTypes.STRING(200), allowNull: false, unique: true },
    designation: { type: DataTypes.STRING(200), allowNull: true },
    specialization: { type: DataTypes.STRING(255), allowNull: false },
    qualifications: { type: DataTypes.TEXT, allowNull: true },
    experience_years: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    profile_image: { type: DataTypes.STRING(500), allowNull: true },
    bio: { type: DataTypes.TEXT, allowNull: true },
    short_bio: { type: DataTypes.STRING(500), allowNull: true },
    expertise: { type: DataTypes.JSON, allowNull: true },
    languages: { type: DataTypes.JSON, allowNull: true },
    consultation_fee: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    available_days: { type: DataTypes.JSON, allowNull: true },
    available_times: { type: DataTypes.JSON, allowNull: true },
    phone: { type: DataTypes.STRING(15), allowNull: true },
    email: { type: DataTypes.STRING(150), allowNull: true },
    linkedin: { type: DataTypes.STRING(300), allowNull: true },
    publications: { type: DataTypes.JSON, allowNull: true },
    awards: { type: DataTypes.JSON, allowNull: true },
    success_rate: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
    total_patients: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    sort_order: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    meta_title: { type: DataTypes.STRING(200), allowNull: true },
    meta_description: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: 'doctors',
    indexes: [
      { fields: ['slug'] },
      { fields: ['is_featured'] },
      { fields: ['is_active'] },
      { fields: ['sort_order'] },
    ],
  }
);

module.exports = Doctor;

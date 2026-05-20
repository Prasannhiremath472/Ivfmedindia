const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Lead = sequelize.define(
  'Lead',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    location_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    treatment_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    phone: { type: DataTypes.STRING(15), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: true },
    age: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    city: { type: DataTypes.STRING(100), allowNull: true },
    message: { type: DataTypes.TEXT, allowNull: true },
    source: {
      type: DataTypes.ENUM('website', 'chatbot', 'whatsapp', 'call', 'walk_in', 'referral', 'social_media', 'google_ads'),
      defaultValue: 'website',
    },
    utm_source: { type: DataTypes.STRING(100), allowNull: true },
    utm_medium: { type: DataTypes.STRING(100), allowNull: true },
    utm_campaign: { type: DataTypes.STRING(100), allowNull: true },
    stage: {
      type: DataTypes.ENUM('new', 'contacted', 'qualified', 'appointment_scheduled', 'converted', 'lost'),
      defaultValue: 'new',
    },
    assigned_to: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    follow_up_date: { type: DataTypes.DATEONLY, allowNull: true },
    converted_at: { type: DataTypes.DATE, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: 'leads',
    indexes: [
      { fields: ['phone'] },
      { fields: ['stage'] },
      { fields: ['source'] },
      { fields: ['location_id'] },
      { fields: ['assigned_to'] },
    ],
  }
);

module.exports = Lead;

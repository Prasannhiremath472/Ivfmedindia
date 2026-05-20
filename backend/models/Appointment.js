const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Appointment = sequelize.define(
  'Appointment',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    booking_id: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    user_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    doctor_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    location_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    treatment_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    patient_name: { type: DataTypes.STRING(150), allowNull: false },
    patient_phone: { type: DataTypes.STRING(15), allowNull: false },
    patient_email: { type: DataTypes.STRING(150), allowNull: true },
    patient_age: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    patient_gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: true },
    appointment_date: { type: DataTypes.DATEONLY, allowNull: false },
    appointment_time: { type: DataTypes.TIME, allowNull: false },
    appointment_type: {
      type: DataTypes.ENUM('consultation', 'follow_up', 'procedure', 'emergency'),
      defaultValue: 'consultation',
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no_show', 'rescheduled'),
      defaultValue: 'pending',
    },
    message: { type: DataTypes.TEXT, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
    admin_notes: { type: DataTypes.TEXT, allowNull: true },
    source: { type: DataTypes.STRING(100), defaultValue: 'website' },
    is_paid: { type: DataTypes.BOOLEAN, defaultValue: false },
    payment_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    reminder_sent: { type: DataTypes.BOOLEAN, defaultValue: false },
    confirmed_at: { type: DataTypes.DATE, allowNull: true },
    cancelled_at: { type: DataTypes.DATE, allowNull: true },
    cancellation_reason: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: 'appointments',
    indexes: [
      { fields: ['booking_id'] },
      { fields: ['user_id'] },
      { fields: ['doctor_id'] },
      { fields: ['appointment_date'] },
      { fields: ['status'] },
    ],
  }
);

module.exports = Appointment;

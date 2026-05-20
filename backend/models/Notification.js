const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Notification = sequelize.define(
  'Notification',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    admin_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    type: {
      type: DataTypes.ENUM('appointment', 'lead', 'contact', 'system', 'alert'),
      defaultValue: 'system',
    },
    title: { type: DataTypes.STRING(200), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    data: { type: DataTypes.JSON, allowNull: true },
    is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
    read_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: 'notifications',
    indexes: [{ fields: ['admin_id'] }, { fields: ['is_read'] }, { fields: ['type'] }],
  }
);

module.exports = Notification;

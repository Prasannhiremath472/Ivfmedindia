const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');

const User = sequelize.define(
  'User',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(15), allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.ENUM('user', 'patient'), defaultValue: 'user' },
    gender: { type: DataTypes.ENUM('male', 'female', 'other'), allowNull: true },
    date_of_birth: { type: DataTypes.DATEONLY, allowNull: true },
    city: { type: DataTypes.STRING(100), allowNull: true },
    state: { type: DataTypes.STRING(100), allowNull: true },
    profile_image: { type: DataTypes.STRING(500), allowNull: true },
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    otp: { type: DataTypes.STRING(6), allowNull: true },
    otp_expiry: { type: DataTypes.DATE, allowNull: true },
    last_login: { type: DataTypes.DATE, allowNull: true },
  },
  {
    tableName: 'users',
    indexes: [
      { fields: ['email'] },
      { fields: ['phone'] },
      { fields: ['is_active'] },
    ],
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) user.password = await bcrypt.hash(user.password, 12);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) user.password = await bcrypt.hash(user.password, 12);
      },
    },
  }
);

User.prototype.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;

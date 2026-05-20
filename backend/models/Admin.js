const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/db');

const Admin = sequelize.define(
  'Admin',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: {
      type: DataTypes.ENUM('super_admin', 'admin', 'editor', 'viewer'),
      defaultValue: 'admin',
    },
    permissions: { type: DataTypes.JSON, allowNull: true },
    profile_image: { type: DataTypes.STRING(500), allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    last_login: { type: DataTypes.DATE, allowNull: true },
    two_factor_enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
    two_factor_secret: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    tableName: 'admins',
    indexes: [{ fields: ['email'] }, { fields: ['role'] }],
    hooks: {
      beforeCreate: async (admin) => {
        if (admin.password) admin.password = await bcrypt.hash(admin.password, 12);
      },
      beforeUpdate: async (admin) => {
        if (admin.changed('password')) admin.password = await bcrypt.hash(admin.password, 12);
      },
    },
  }
);

Admin.prototype.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = Admin;

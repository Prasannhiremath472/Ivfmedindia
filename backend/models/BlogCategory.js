const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BlogCategory = sequelize.define(
  'BlogCategory',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    slug: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    image: { type: DataTypes.STRING(500), allowNull: true },
    sort_order: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: 'blog_categories' }
);

module.exports = BlogCategory;

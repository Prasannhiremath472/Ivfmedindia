const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Blog = sequelize.define(
  'Blog',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    category_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    author_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    title: { type: DataTypes.STRING(300), allowNull: false },
    slug: { type: DataTypes.STRING(350), allowNull: false, unique: true },
    excerpt: { type: DataTypes.TEXT, allowNull: true },
    content: { type: DataTypes.TEXT('long'), allowNull: true },
    featured_image: { type: DataTypes.STRING(500), allowNull: true },
    gallery: { type: DataTypes.JSON, allowNull: true },
    tags: { type: DataTypes.JSON, allowNull: true },
    author_name: { type: DataTypes.STRING(150), allowNull: true },
    author_image: { type: DataTypes.STRING(500), allowNull: true },
    author_bio: { type: DataTypes.TEXT, allowNull: true },
    read_time: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 5 },
    views: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    likes: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    status: { type: DataTypes.ENUM('draft', 'published', 'archived'), defaultValue: 'draft' },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    published_at: { type: DataTypes.DATE, allowNull: true },
    meta_title: { type: DataTypes.STRING(200), allowNull: true },
    meta_description: { type: DataTypes.TEXT, allowNull: true },
    meta_keywords: { type: DataTypes.TEXT, allowNull: true },
    og_image: { type: DataTypes.STRING(500), allowNull: true },
    schema_markup: { type: DataTypes.TEXT('long'), allowNull: true },
  },
  {
    tableName: 'blogs',
    indexes: [
      { fields: ['slug'] },
      { fields: ['category_id'] },
      { fields: ['status'] },
      { fields: ['is_featured'] },
      { fields: ['published_at'] },
    ],
  }
);

module.exports = Blog;

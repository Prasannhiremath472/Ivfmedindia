const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const SEO = sequelize.define(
  'SEO',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    page_path: { type: DataTypes.STRING(500), allowNull: false, unique: true },
    page_type: {
      type: DataTypes.ENUM('home', 'treatment', 'doctor', 'blog', 'location', 'about', 'contact', 'custom'),
      defaultValue: 'custom',
    },
    title: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    keywords: { type: DataTypes.TEXT, allowNull: true },
    og_title: { type: DataTypes.STRING(200), allowNull: true },
    og_description: { type: DataTypes.TEXT, allowNull: true },
    og_image: { type: DataTypes.STRING(500), allowNull: true },
    og_type: { type: DataTypes.STRING(50), defaultValue: 'website' },
    twitter_card: { type: DataTypes.STRING(50), defaultValue: 'summary_large_image' },
    twitter_title: { type: DataTypes.STRING(200), allowNull: true },
    twitter_description: { type: DataTypes.TEXT, allowNull: true },
    twitter_image: { type: DataTypes.STRING(500), allowNull: true },
    canonical_url: { type: DataTypes.STRING(500), allowNull: true },
    robots: { type: DataTypes.STRING(100), defaultValue: 'index, follow' },
    schema_markup: { type: DataTypes.TEXT('long'), allowNull: true },
    custom_scripts: { type: DataTypes.TEXT('long'), allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: 'seo_metadata',
    indexes: [{ fields: ['page_path'] }, { fields: ['page_type'] }],
  }
);

module.exports = SEO;

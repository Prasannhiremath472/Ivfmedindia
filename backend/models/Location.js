const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Location = sequelize.define(
  'Location',
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(200), allowNull: false },
    slug: { type: DataTypes.STRING(250), allowNull: false, unique: true },
    city: { type: DataTypes.STRING(100), allowNull: false },
    city_slug: { type: DataTypes.STRING(100), allowNull: false },
    state: { type: DataTypes.STRING(100), allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: false },
    pincode: { type: DataTypes.STRING(10), allowNull: true },
    phone: { type: DataTypes.STRING(15), allowNull: true },
    email: { type: DataTypes.STRING(150), allowNull: true },
    whatsapp: { type: DataTypes.STRING(15), allowNull: true },
    lat: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
    lng: { type: DataTypes.DECIMAL(11, 8), allowNull: true },
    map_embed_url: { type: DataTypes.TEXT, allowNull: true },
    hero_image: { type: DataTypes.STRING(500), allowNull: true },
    gallery: { type: DataTypes.JSON, allowNull: true },
    facilities: { type: DataTypes.JSON, allowNull: true },
    timings: { type: DataTypes.JSON, allowNull: true },
    description: { type: DataTypes.TEXT('long'), allowNull: true },
    short_description: { type: DataTypes.STRING(500), allowNull: true },
    is_featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    sort_order: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    meta_title: { type: DataTypes.STRING(200), allowNull: true },
    meta_description: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    tableName: 'locations',
    indexes: [
      { fields: ['slug'] },
      { fields: ['city'] },
      { fields: ['city_slug'] },
      { fields: ['is_active'] },
    ],
  }
);

module.exports = Location;

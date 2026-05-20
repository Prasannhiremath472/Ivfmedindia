const { Location, Doctor } = require('../models');
const { buildPaginationOptions, formatPaginationResponse, slugify } = require('../utils/queryHelpers');
const { Op } = require('sequelize');

const getLocations = async (req, res) => {
  try {
    const { city, featured } = req.query;
    const where = { is_active: true };
    if (city) where.city_slug = city;
    if (featured === 'true') where.is_featured = true;

    const locations = await Location.findAll({
      where,
      attributes: { exclude: ['map_embed_url', 'description'] },
      order: [['sort_order', 'ASC']],
    });

    const cities = [...new Set(locations.map((l) => ({ name: l.city, slug: l.city_slug })).map(JSON.stringify))].map(JSON.parse);

    res.json({ success: true, locations, cities });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch locations' });
  }
};

const getLocationBySlug = async (req, res) => {
  try {
    const location = await Location.findOne({
      where: { slug: req.params.slug, is_active: true },
      include: [{ model: Doctor, as: 'doctors', through: { attributes: [] }, where: { is_active: true }, required: false }],
    });
    if (!location) return res.status(404).json({ success: false, message: 'Location not found' });
    res.json({ success: true, location });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch location' });
  }
};

const getLocationsByCity = async (req, res) => {
  try {
    const locations = await Location.findAll({
      where: { city_slug: req.params.city, is_active: true },
      include: [{ model: Doctor, as: 'doctors', through: { attributes: [] }, required: false, attributes: ['id', 'name', 'slug', 'profile_image', 'designation'] }],
      order: [['sort_order', 'ASC']],
    });
    if (!locations.length) return res.status(404).json({ success: false, message: 'No locations found in this city' });
    res.json({ success: true, locations, city: req.params.city });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch city locations' });
  }
};

const createLocation = async (req, res) => {
  try {
    const data = req.body;
    data.slug = data.slug || slugify(`${data.city}-${data.name}`);
    data.city_slug = data.city_slug || slugify(data.city);
    const location = await Location.create(data);
    res.status(201).json({ success: true, message: 'Location created', location });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create location' });
  }
};

const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return res.status(404).json({ success: false, message: 'Location not found' });
    await location.update(req.body);
    res.json({ success: true, message: 'Location updated', location });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update location' });
  }
};

module.exports = { getLocations, getLocationBySlug, getLocationsByCity, createLocation, updateLocation };

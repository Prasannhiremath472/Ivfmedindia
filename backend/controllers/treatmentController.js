const { Treatment, TreatmentCategory, Doctor, FAQ, Testimonial } = require('../models');
const { buildPaginationOptions, formatPaginationResponse, slugify } = require('../utils/queryHelpers');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

const getTreatments = async (req, res) => {
  try {
    const { page, limit, offset } = buildPaginationOptions(req.query);
    const { category_id, featured } = req.query;

    const where = { is_active: true };
    if (category_id) where.category_id = category_id;
    if (featured === 'true') where.is_featured = true;

    const { count, rows } = await Treatment.findAndCountAll({
      where,
      include: [{ model: TreatmentCategory, as: 'category', attributes: ['id', 'name', 'slug'] }],
      order: [['sort_order', 'ASC'], ['name', 'ASC']],
      limit,
      offset,
    });

    res.json({ success: true, ...formatPaginationResponse(rows, count, page, limit) });
  } catch (error) {
    logger.error('Get treatments error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch treatments' });
  }
};

const getTreatmentBySlug = async (req, res) => {
  try {
    const treatment = await Treatment.findOne({
      where: { slug: req.params.slug, is_active: true },
      include: [
        { model: TreatmentCategory, as: 'category' },
        { model: Doctor, as: 'doctors', through: { attributes: [] }, attributes: ['id', 'name', 'slug', 'profile_image', 'designation', 'experience_years'] },
        { model: FAQ, as: 'faqs', where: { is_active: true }, required: false, order: [['sort_order', 'ASC']] },
        { model: Testimonial, as: 'testimonials', where: { is_active: true }, required: false, limit: 6, order: [['sort_order', 'ASC']] },
      ],
    });
    if (!treatment) return res.status(404).json({ success: false, message: 'Treatment not found' });
    res.json({ success: true, treatment });
  } catch (error) {
    logger.error('Get treatment by slug error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch treatment' });
  }
};

const createTreatment = async (req, res) => {
  try {
    const data = req.body;
    data.slug = data.slug || slugify(data.name);
    const treatment = await Treatment.create(data);
    res.status(201).json({ success: true, message: 'Treatment created', treatment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create treatment' });
  }
};

const updateTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findByPk(req.params.id);
    if (!treatment) return res.status(404).json({ success: false, message: 'Treatment not found' });
    await treatment.update(req.body);
    res.json({ success: true, message: 'Treatment updated', treatment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update treatment' });
  }
};

const deleteTreatment = async (req, res) => {
  try {
    const treatment = await Treatment.findByPk(req.params.id);
    if (!treatment) return res.status(404).json({ success: false, message: 'Treatment not found' });
    await treatment.update({ is_active: false });
    res.json({ success: true, message: 'Treatment deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete treatment' });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await TreatmentCategory.findAll({
      where: { is_active: true },
      include: [{ model: Treatment, as: 'treatments', where: { is_active: true }, required: false, attributes: ['id', 'name', 'slug', 'card_image', 'short_description'] }],
      order: [['sort_order', 'ASC']],
    });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
};

module.exports = { getTreatments, getTreatmentBySlug, createTreatment, updateTreatment, deleteTreatment, getCategories };

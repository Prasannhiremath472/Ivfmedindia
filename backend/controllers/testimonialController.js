const { Testimonial, Treatment, Location } = require('../models');
const { buildPaginationOptions, formatPaginationResponse } = require('../utils/queryHelpers');

const getTestimonials = async (req, res) => {
  try {
    const { page, limit, offset } = buildPaginationOptions(req.query);
    const { featured, is_video, treatment_id } = req.query;

    const where = { is_active: true };
    if (featured === 'true') where.is_featured = true;
    if (is_video === 'true') where.is_video = true;
    if (treatment_id) where.treatment_id = treatment_id;

    const { count, rows } = await Testimonial.findAndCountAll({
      where,
      include: [{ model: Treatment, as: 'treatment', attributes: ['id', 'name', 'slug'], required: false }],
      order: [['sort_order', 'ASC'], ['created_at', 'DESC']],
      limit,
      offset,
    });

    res.json({ success: true, ...formatPaginationResponse(rows, count, page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch testimonials' });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, message: 'Testimonial created', testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create testimonial' });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.findByPk(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    await t.update(req.body);
    res.json({ success: true, message: 'Testimonial updated', testimonial: t });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update testimonial' });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const t = await Testimonial.findByPk(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: 'Not found' });
    await t.update({ is_active: false });
    res.json({ success: true, message: 'Testimonial removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete testimonial' });
  }
};

module.exports = { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };

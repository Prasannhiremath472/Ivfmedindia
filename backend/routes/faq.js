const express = require('express');
const router = express.Router();
const { FAQ } = require('../models');
const { adminProtect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  const { treatment_id, featured, category } = req.query;
  const where = { is_active: true };
  if (treatment_id) where.treatment_id = treatment_id;
  if (featured === 'true') where.is_featured = true;
  if (category) where.category = category;
  const faqs = await FAQ.findAll({ where, order: [['sort_order', 'ASC']] });
  res.json({ success: true, faqs });
});

router.post('/', adminProtect, async (req, res) => {
  const faq = await FAQ.create(req.body);
  res.status(201).json({ success: true, faq });
});

router.put('/:id', adminProtect, async (req, res) => {
  const faq = await FAQ.findByPk(req.params.id);
  if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
  await faq.update(req.body);
  res.json({ success: true, faq });
});

router.delete('/:id', adminProtect, async (req, res) => {
  const faq = await FAQ.findByPk(req.params.id);
  if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
  await faq.update({ is_active: false });
  res.json({ success: true, message: 'FAQ removed' });
});

module.exports = router;

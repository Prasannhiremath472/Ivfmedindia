const express = require('express');
const router = express.Router();
const { getDashboardStats, getNotifications, markNotificationsRead, getContactSubmissions } = require('../controllers/adminController');
const { adminProtect } = require('../middleware/auth');
const { sequelize } = require('../models');
const { sendEmail } = require('../utils/mailer');

router.get('/dashboard', adminProtect, getDashboardStats);
router.get('/notifications', adminProtect, getNotifications);
router.put('/notifications/read', adminProtect, markNotificationsRead);
router.get('/contacts', adminProtect, getContactSubmissions);

// Contact form submission (public)
router.post('/contact', async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;
    await sequelize.query(
      `INSERT INTO contact_submissions (name, phone, email, subject, message) VALUES (?, ?, ?, ?, ?)`,
      { replacements: [name, phone, email, subject, message] }
    );
    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `Contact Form: ${subject || name}`,
      html: `<h3>New Contact</h3><p>Name: ${name}</p><p>Phone: ${phone}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });
    res.status(201).json({ success: true, message: 'Message sent successfully! We will contact you soon.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

// Success stories (public)
router.get('/success-stories', async (req, res) => {
  try {
    const { SuccessStory, Treatment } = require('../models');
    const { featured } = req.query;
    const where = { is_active: true };
    if (featured === 'true') where.is_featured = true;
    const stories = await SuccessStory.findAll({
      where,
      include: [{ model: Treatment, as: 'treatment', attributes: ['id', 'name', 'slug'], required: false }],
      order: [['sort_order', 'ASC'], ['created_at', 'DESC']],
    });
    res.json({ success: true, stories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stories' });
  }
});

// Banners (public)
router.get('/banners', async (req, res) => {
  try {
    const [banners] = await sequelize.query(
      'SELECT * FROM homepage_banners WHERE is_active = 1 ORDER BY sort_order ASC'
    );
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch banners' });
  }
});

module.exports = router;

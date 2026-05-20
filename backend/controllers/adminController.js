const { sequelize, Appointment, Lead, Blog, Doctor, Testimonial, SuccessStory, Notification, User } = require('../models');
const { buildPaginationOptions, formatPaginationResponse } = require('../utils/queryHelpers');

const getDashboardStats = async (req, res) => {
  try {
    const [stats] = await sequelize.query(`
      SELECT
        (SELECT COUNT(*) FROM appointments WHERE DATE(created_at) = CURDATE()) as today_appointments,
        (SELECT COUNT(*) FROM appointments WHERE status = 'pending') as pending_appointments,
        (SELECT COUNT(*) FROM appointments WHERE MONTH(created_at) = MONTH(CURDATE())) as month_appointments,
        (SELECT COUNT(*) FROM leads WHERE DATE(created_at) = CURDATE()) as today_leads,
        (SELECT COUNT(*) FROM leads WHERE stage = 'new') as new_leads,
        (SELECT COUNT(*) FROM leads WHERE MONTH(created_at) = MONTH(CURDATE())) as month_leads,
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM blogs WHERE status = 'published') as published_blogs,
        (SELECT COUNT(*) FROM doctors WHERE is_active = 1) as active_doctors,
        (SELECT COUNT(*) FROM testimonials WHERE is_active = 1) as testimonials
    `, { type: sequelize.QueryTypes.SELECT });

    const recentAppointments = await Appointment.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      attributes: ['id', 'booking_id', 'patient_name', 'patient_phone', 'appointment_date', 'status', 'created_at'],
    });

    const recentLeads = await Lead.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      attributes: ['id', 'name', 'phone', 'stage', 'source', 'created_at'],
    });

    const monthlyData = await sequelize.query(`
      SELECT
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as appointments
      FROM appointments
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month ASC
    `, { type: sequelize.QueryTypes.SELECT });

    res.json({
      success: true,
      stats: stats,
      recentAppointments,
      recentLeads,
      monthlyData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get dashboard stats' });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { admin_id: req.admin.id },
      order: [['created_at', 'DESC']],
      limit: 20,
    });
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
};

const markNotificationsRead = async (req, res) => {
  try {
    await Notification.update(
      { is_read: true, read_at: new Date() },
      { where: { admin_id: req.admin.id, is_read: false } }
    );
    res.json({ success: true, message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update notifications' });
  }
};

const getContactSubmissions = async (req, res) => {
  try {
    const { sequelize } = require('../models');
    const { page, limit, offset } = buildPaginationOptions(req.query);
    const [rows] = await sequelize.query(
      `SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`
    );
    const [[{ count }]] = await sequelize.query(`SELECT COUNT(*) as count FROM contact_submissions`);
    res.json({ success: true, ...formatPaginationResponse(rows, parseInt(count), page, limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch submissions' });
  }
};

module.exports = { getDashboardStats, getNotifications, markNotificationsRead, getContactSubmissions };

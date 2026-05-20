const { Lead, Location, Treatment, Admin } = require('../models');
const { buildPaginationOptions, formatPaginationResponse } = require('../utils/queryHelpers');
const { sendEmail, leadNotificationTemplate } = require('../utils/mailer');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

const createLead = async (req, res) => {
  try {
    const { name, phone, email, age, city, treatment_id, location_id, message, source, utm_source, utm_medium, utm_campaign } = req.body;

    const lead = await Lead.create({
      name, phone, email, age, city, treatment_id, location_id, message,
      source: source || 'website',
      utm_source, utm_medium, utm_campaign,
    });

    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Lead: ${name} - ${phone}`,
      html: leadNotificationTemplate({ name, phone, email, message, source, location: city }),
    });

    res.status(201).json({ success: true, message: 'Thank you! Our team will contact you shortly.', lead: { id: lead.id } });
  } catch (error) {
    logger.error('Create lead error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry' });
  }
};

const getLeads = async (req, res) => {
  try {
    const { page, limit, offset } = buildPaginationOptions(req.query);
    const { stage, source, location_id, assigned_to, search, from_date, to_date } = req.query;

    const where = { is_active: true };
    if (stage) where.stage = stage;
    if (source) where.source = source;
    if (location_id) where.location_id = location_id;
    if (assigned_to) where.assigned_to = assigned_to;
    if (search) where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { phone: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
    ];
    if (from_date && to_date) where.created_at = { [Op.between]: [new Date(from_date), new Date(to_date)] };

    const { count, rows } = await Lead.findAndCountAll({
      where,
      include: [
        { model: Location, as: 'location', attributes: ['id', 'name', 'city'] },
        { model: Treatment, as: 'treatment', attributes: ['id', 'name'] },
        { model: Admin, as: 'assignedAdmin', attributes: ['id', 'name'] },
      ],
      order: [['created_at', 'DESC']],
      limit,
      offset,
    });

    res.json({ success: true, ...formatPaginationResponse(rows, count, page, limit) });
  } catch (error) {
    logger.error('Get leads error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leads' });
  }
};

const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

    const { stage, notes, assigned_to, follow_up_date } = req.body;
    const updates = { stage, notes, assigned_to, follow_up_date };
    if (stage === 'converted') updates.converted_at = new Date();

    await lead.update(updates);
    res.json({ success: true, message: 'Lead updated', lead });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update lead' });
  }
};

const getLeadStats = async (req, res) => {
  try {
    const { sequelize } = require('../models');
    const stats = await sequelize.query(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN stage = 'new' THEN 1 ELSE 0 END) as new_leads,
        SUM(CASE WHEN stage = 'contacted' THEN 1 ELSE 0 END) as contacted,
        SUM(CASE WHEN stage = 'qualified' THEN 1 ELSE 0 END) as qualified,
        SUM(CASE WHEN stage = 'converted' THEN 1 ELSE 0 END) as converted,
        SUM(CASE WHEN stage = 'lost' THEN 1 ELSE 0 END) as lost,
        SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) as today
      FROM leads WHERE is_active = 1
    `, { type: sequelize.QueryTypes.SELECT });

    res.json({ success: true, stats: stats[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get stats' });
  }
};

module.exports = { createLead, getLeads, updateLead, getLeadStats };

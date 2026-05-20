const { Doctor, Location, Treatment, Appointment } = require('../models');
const { buildPaginationOptions, formatPaginationResponse, slugify } = require('../utils/queryHelpers');
const { Op } = require('sequelize');
const { uploadToCloudinary } = require('../middleware/upload');
const logger = require('../utils/logger');

const getDoctors = async (req, res) => {
  try {
    const { page, limit, offset } = buildPaginationOptions(req.query);
    const { featured, location_id, search } = req.query;

    const where = { is_active: true };
    if (featured === 'true') where.is_featured = true;
    if (search) where.name = { [Op.like]: `%${search}%` };

    const include = [
      { model: Location, as: 'locations', through: { attributes: [] }, attributes: ['id', 'name', 'city', 'slug'] },
      { model: Treatment, as: 'treatments', through: { attributes: [] }, attributes: ['id', 'name', 'slug'] },
    ];

    const { count, rows } = await Doctor.findAndCountAll({
      where,
      include,
      order: [['sort_order', 'ASC'], ['name', 'ASC']],
      distinct: true,
      limit,
      offset,
    });

    res.json({ success: true, ...formatPaginationResponse(rows, count, page, limit) });
  } catch (error) {
    logger.error('Get doctors error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch doctors' });
  }
};

const getDoctorBySlug = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      where: { slug: req.params.slug, is_active: true },
      include: [
        { model: Location, as: 'locations', through: { attributes: [] } },
        { model: Treatment, as: 'treatments', through: { attributes: [] } },
      ],
    });
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
    res.json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch doctor' });
  }
};

const createDoctor = async (req, res) => {
  try {
    const data = req.body;
    data.slug = data.slug || slugify(data.name);

    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, 'doctors');
      data.profile_image = result.secure_url;
    }

    if (data.expertise && typeof data.expertise === 'string') data.expertise = JSON.parse(data.expertise);
    if (data.languages && typeof data.languages === 'string') data.languages = JSON.parse(data.languages);
    if (data.available_days && typeof data.available_days === 'string') data.available_days = JSON.parse(data.available_days);
    if (data.available_times && typeof data.available_times === 'string') data.available_times = JSON.parse(data.available_times);

    const doctor = await Doctor.create(data);

    if (data.location_ids) {
      const ids = JSON.parse(data.location_ids);
      const locations = await Location.findAll({ where: { id: ids } });
      await doctor.setLocations(locations);
    }

    if (data.treatment_ids) {
      const ids = JSON.parse(data.treatment_ids);
      const treatments = await Treatment.findAll({ where: { id: ids } });
      await doctor.setTreatments(treatments);
    }

    res.status(201).json({ success: true, message: 'Doctor created', doctor });
  } catch (error) {
    logger.error('Create doctor error:', error);
    res.status(500).json({ success: false, message: 'Failed to create doctor' });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    const data = req.body;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, 'doctors');
      data.profile_image = result.secure_url;
    }

    await doctor.update(data);
    res.json({ success: true, message: 'Doctor updated', doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update doctor' });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
    await doctor.update({ is_active: false });
    res.json({ success: true, message: 'Doctor deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete doctor' });
  }
};

module.exports = { getDoctors, getDoctorBySlug, createDoctor, updateDoctor, deleteDoctor };

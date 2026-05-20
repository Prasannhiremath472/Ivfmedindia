const { Appointment, Doctor, Location, Treatment, User } = require('../models');
const { sendEmail, appointmentConfirmationTemplate } = require('../utils/mailer');
const { buildPaginationOptions, formatPaginationResponse } = require('../utils/queryHelpers');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

const generateBookingId = () => {
  const prefix = 'IVF';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `${prefix}${timestamp}${random}`;
};

const createAppointment = async (req, res) => {
  try {
    const {
      patient_name, patient_phone, patient_email, patient_age, patient_gender,
      doctor_id, location_id, treatment_id, appointment_date, appointment_time,
      appointment_type, message, source,
    } = req.body;

    const booking_id = generateBookingId();

    const appointment = await Appointment.create({
      booking_id,
      user_id: req.user?.id || null,
      patient_name, patient_phone, patient_email, patient_age, patient_gender,
      doctor_id, location_id, treatment_id,
      appointment_date, appointment_time,
      appointment_type: appointment_type || 'consultation',
      message,
      source: source || 'website',
    });

    const [doctor, location] = await Promise.all([
      doctor_id ? Doctor.findByPk(doctor_id) : null,
      location_id ? Location.findByPk(location_id) : null,
    ]);

    if (patient_email) {
      sendEmail({
        to: patient_email,
        subject: `Appointment Confirmed - Booking ID: ${booking_id}`,
        html: appointmentConfirmationTemplate({
          patientName: patient_name,
          doctorName: doctor?.name || 'Our Specialist',
          appointmentDate: appointment_date,
          appointmentTime: appointment_time,
          location: location?.name || 'IVFMedIndia Clinic',
          bookingId: booking_id,
        }),
      });
    }

    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Appointment - ${patient_name} (${booking_id})`,
      html: `<h3>New Appointment</h3><p>Patient: ${patient_name}</p><p>Phone: ${patient_phone}</p><p>Date: ${appointment_date} at ${appointment_time}</p><p>Booking ID: ${booking_id}</p>`,
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      bookingId: booking_id,
      appointment,
    });
  } catch (error) {
    logger.error('Create appointment error:', error);
    res.status(500).json({ success: false, message: 'Failed to book appointment' });
  }
};

const getAppointments = async (req, res) => {
  try {
    const { page, limit, offset } = buildPaginationOptions(req.query);
    const { status, doctor_id, location_id, date } = req.query;

    const where = {};
    if (status) where.status = status;
    if (doctor_id) where.doctor_id = doctor_id;
    if (location_id) where.location_id = location_id;
    if (date) where.appointment_date = date;

    const { count, rows } = await Appointment.findAndCountAll({
      where,
      include: [
        { model: Doctor, as: 'doctor', attributes: ['id', 'name', 'profile_image'] },
        { model: Location, as: 'location', attributes: ['id', 'name', 'city'] },
        { model: Treatment, as: 'treatment', attributes: ['id', 'name'] },
      ],
      order: [['appointment_date', 'DESC'], ['appointment_time', 'ASC']],
      limit,
      offset,
    });

    res.json({ success: true, ...formatPaginationResponse(rows, count, page, limit) });
  } catch (error) {
    logger.error('Get appointments error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: { [Op.or]: [{ id: req.params.id }, { booking_id: req.params.id }] },
      include: [
        { model: Doctor, as: 'doctor' },
        { model: Location, as: 'location' },
        { model: Treatment, as: 'treatment' },
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
      ],
    });
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
    res.json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch appointment' });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, admin_notes, cancellation_reason } = req.body;
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

    const updates = { status, admin_notes };
    if (status === 'confirmed') updates.confirmed_at = new Date();
    if (status === 'cancelled') { updates.cancelled_at = new Date(); updates.cancellation_reason = cancellation_reason; }

    await appointment.update(updates);
    res.json({ success: true, message: 'Appointment updated', appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update appointment' });
  }
};

const getAvailableSlots = async (req, res) => {
  try {
    const { doctor_id, date } = req.query;
    const bookedSlots = await Appointment.findAll({
      where: { doctor_id, appointment_date: date, status: { [Op.in]: ['pending', 'confirmed'] } },
      attributes: ['appointment_time'],
    });
    const allSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
    const bookedTimes = bookedSlots.map((a) => a.appointment_time);
    const availableSlots = allSlots.filter((s) => !bookedTimes.includes(s));
    res.json({ success: true, availableSlots, bookedSlots: bookedTimes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get slots' });
  }
};

module.exports = { createAppointment, getAppointments, getAppointmentById, updateAppointmentStatus, getAvailableSlots };

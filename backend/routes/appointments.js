const express = require('express');
const router = express.Router();
const { createAppointment, getAppointments, getAppointmentById, updateAppointmentStatus, getAvailableSlots } = require('../controllers/appointmentController');
const { adminProtect, optionalAuth } = require('../middleware/auth');

router.post('/', optionalAuth, createAppointment);
router.get('/slots', getAvailableSlots);
router.get('/', adminProtect, getAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id/status', adminProtect, updateAppointmentStatus);

module.exports = router;

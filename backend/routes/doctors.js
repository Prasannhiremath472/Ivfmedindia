const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorBySlug, createDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const { adminProtect } = require('../middleware/auth');
const { uploadDoctor } = require('../middleware/upload');

router.get('/', getDoctors);
router.get('/:slug', getDoctorBySlug);
router.post('/', adminProtect, uploadDoctor.single('profile_image'), createDoctor);
router.put('/:id', adminProtect, uploadDoctor.single('profile_image'), updateDoctor);
router.delete('/:id', adminProtect, deleteDoctor);

module.exports = router;

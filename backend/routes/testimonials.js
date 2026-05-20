const express = require('express');
const router = express.Router();
const { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } = require('../controllers/testimonialController');
const { adminProtect } = require('../middleware/auth');

router.get('/', getTestimonials);
router.post('/', adminProtect, createTestimonial);
router.put('/:id', adminProtect, updateTestimonial);
router.delete('/:id', adminProtect, deleteTestimonial);

module.exports = router;

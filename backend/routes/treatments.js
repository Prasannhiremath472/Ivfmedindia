const express = require('express');
const router = express.Router();
const { getTreatments, getTreatmentBySlug, createTreatment, updateTreatment, deleteTreatment, getCategories } = require('../controllers/treatmentController');
const { adminProtect } = require('../middleware/auth');

router.get('/categories', getCategories);
router.get('/', getTreatments);
router.get('/:slug', getTreatmentBySlug);
router.post('/', adminProtect, createTreatment);
router.put('/:id', adminProtect, updateTreatment);
router.delete('/:id', adminProtect, deleteTreatment);

module.exports = router;

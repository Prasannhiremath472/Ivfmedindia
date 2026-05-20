const express = require('express');
const router = express.Router();
const { getLocations, getLocationBySlug, getLocationsByCity, createLocation, updateLocation } = require('../controllers/locationController');
const { adminProtect } = require('../middleware/auth');

router.get('/', getLocations);
router.get('/city/:city', getLocationsByCity);
router.get('/:slug', getLocationBySlug);
router.post('/', adminProtect, createLocation);
router.put('/:id', adminProtect, updateLocation);

module.exports = router;

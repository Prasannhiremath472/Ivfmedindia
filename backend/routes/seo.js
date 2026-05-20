const express = require('express');
const router = express.Router();
const { getSeoByPath, createOrUpdateSeo, getAllSeo, generateSitemap } = require('../controllers/seoController');
const { adminProtect } = require('../middleware/auth');

router.get('/sitemap', generateSitemap);
router.get('/', getSeoByPath);
router.get('/all', adminProtect, getAllSeo);
router.post('/', adminProtect, createOrUpdateSeo);

module.exports = router;

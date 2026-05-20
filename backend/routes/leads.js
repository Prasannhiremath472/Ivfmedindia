const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLead, getLeadStats } = require('../controllers/leadController');
const { adminProtect } = require('../middleware/auth');

router.post('/', createLead);
router.get('/', adminProtect, getLeads);
router.get('/stats', adminProtect, getLeadStats);
router.put('/:id', adminProtect, updateLead);

module.exports = router;

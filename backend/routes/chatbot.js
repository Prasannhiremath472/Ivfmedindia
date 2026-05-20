const express = require('express');
const router = express.Router();
const { chat, submitChatLead } = require('../controllers/chatbotController');

router.post('/message', chat);
router.post('/lead', submitChatLead);

module.exports = router;

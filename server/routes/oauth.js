const express = require('express');
const router = express.Router();
const oauthController = require('../controllers/oauth');

router.post('/callback', oauthController.kakao);
router.post('/callback', oauthController.google);

module.exports = router;

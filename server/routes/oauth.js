const express = require('express');
const router = express.Router();
const oauthController = require('../controllers/oauth');

router.post('/kakao', oauthController.kakao);
router.post('/google', oauthController.google);

module.exports = router;

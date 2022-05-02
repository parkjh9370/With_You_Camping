const express = require('express');
const router = express.Router();
const oauthController = require('../controllers/oauth');

router.post('/kakao', oauthController.kakao);
router.post('/google', oauthController.google);
router.post('/naver', oauthController.naver);

module.exports = router;

const express = require('express');
const router = express.Router();
const oauthController = require('../controllers/oauth');

// 카카오 로그인
router.post('/kakao', oauthController.kakao);

// 구글 로그인
router.post('/google', oauthController.google);

// 네버 로그인
router.post('/naver', oauthController.naver);

module.exports = router;

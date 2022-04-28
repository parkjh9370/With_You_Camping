const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/auth');

// 회원가입
router.post('/signup', authController.signup);

// 로그인
router.post('/login', authController.login);

// // 토큰 인증
// router.get('/token', authController.token);

// 어세스 토큰 인증
router.post('/token/validate', authController.validateToken)

// 리프레쉬 토큰을 통한 어세스 토큰 발급
router.get('/token', authController.refreshToken)

// 로그아웃
router.post('/signout', authController.signout);

module.exports = router;

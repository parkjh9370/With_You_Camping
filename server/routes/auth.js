const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const isAuth = require('../middlewares/auth');

// 회원가입
router.post('/signup', authController.signup);

// 로그인
router.post('/login', authController.login);

// 토큰 인증
router.get('/token', authController.token)

// 로그아웃
router.post('/signout', authController.signout);


module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// 회원가입
router.post('/signup',authController.signup);

router.post('/login', authController.login);

// 로그아웃
router.post('/logout', authController.logout);

// 회원탈퇴
router.delete('/:userId', async (req, res) => {});

module.exports = router;

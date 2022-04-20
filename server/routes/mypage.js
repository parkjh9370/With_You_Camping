const express = require('express');
const router = express.Router();
const mypageController = require('../controllers/mypage');
const isAuth = require('../middlewares/auth');

// 회원 비밀번호 확인 (회원 정보 수정 하기 전)
router.post('/pass', isAuth, mypageController.confirmPassword);
// 회원 정보 가져오기
router.get('/', isAuth, mypageController.get);
// 내 정보 수정하기
router.put('/edit', isAuth, mypageController.put);
// 회원 탈퇴하기
router.delete('/withdrawl/:userId', isAuth, mypageController.withdrwal);
// 마이페이지 게시글 불러오기
router.get('/boards', isAuth, mypageController.board);
// 마에페이지 좋아요 글 불러오기
router.get('/likes', isAuth, mypageController.like);

module.exports = router;

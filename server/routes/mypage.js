const express = require('express');
const router = express.Router();
const mypageController = require('../controllers/mypage');


// 회원 정보 가져오기
router.get('/', mypageController.get);
// 내 정보 수정하기
router.put('/', mypageController.put);
// 마이페이지 게시글 불러오기
router.get('/boards', mypageController.board);
// 마에페이지 좋아요 글 불러오기
router.get('/likes', mypageController.like);

module.exports = router;

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');

// 게시글 목록 (메인페이지)
router.get('/', mainController.list);

// 지역, 제목, 내용 검색
router.get('/search', mainController.search);

// 인기순 정렬 (최근 일주일 간)
router.get('/ranking', mainController.rank);

module.exports = router;

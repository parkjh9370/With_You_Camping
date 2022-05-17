const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');

// 게시글 목록 (메인페이지)
router.get('/', mainController.list);

// 지역, 제목, 내용 검색
router.get('/search', mainController.search);

module.exports = router;

const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board');

// 게시물 작성
router.post('/', boardController.post);

// 게시물 상세 가져오기
router.get('/:id', boardController.get);

// 게시물 수정
router.put('/:id', boardController.put);

// 게시물 삭제
router.delete('/:id', boardController.remove);

module.exports = router;

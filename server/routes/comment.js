const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

// 댓글 작성
router.post('/:id', commentController.post);

// 댓글 가져오기
router.get('/:id', commentController.get);

// 댓글 수정
router.put('/:id', commentController.put);

// 댓글 삭제
router.delete('/:id', commentController.remove);

module.exports = router;

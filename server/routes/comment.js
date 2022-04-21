const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/auth');
const commentController = require('../controllers/comment');

// 댓글 작성
router.post('/', isAuth, commentController.post);

// 댓글 가져오기
router.get('/', commentController.get);

// 댓글 수정
router.put('/', isAuth, commentController.put);

// 댓글 삭제
router.delete('/', isAuth, commentController.remove);

module.exports = router;

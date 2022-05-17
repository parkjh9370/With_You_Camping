const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/auth');
const commentController = require('../controllers/comment');

// 댓글 작성
router.post('/:id', isAuth, commentController.post);
 
// 댓글 가져오기
router.get('/:id', commentController.get);

// 댓글 수정
router.put('/:id', isAuth, commentController.put);

// 댓글 삭제
router.delete('/:id', isAuth, commentController.remove);

module.exports = router;

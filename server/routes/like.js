const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/auth');
const likeController = require('../controllers/like');

// 로그인한 유저가 현재 게시글 좋아요 유무
router.get('/:id', isAuth, likeController.get);
 
// 좋아요 추가
router.post('/', isAuth, likeController.post);
// 좋아요 취소
router.delete('/', isAuth, likeController.remove);

module.exports = router;

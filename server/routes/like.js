const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/auth');
const likeController = require('../controllers/like');

// 좋아요 추가
router.post('/:id', isAuth, likeController.post);
// 좋아요 취소
router.delete('/:id', isAuth, likeController.remove);

module.exports = router;

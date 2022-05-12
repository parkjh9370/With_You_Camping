const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const mainRouter = require('./main');
const boardRouter = require('./board');
const commentRouter = require('./comment');
const likeRouter = require('./like');
const mypageRouter = require('./mypage');
const oauthRouter = require('./oauth');

router.use('/auth', authRouter);
router.use('/main', mainRouter);
router.use('/boards', boardRouter);
router.use('/likes', likeRouter);
router.use('/comments', commentRouter);
router.use('/users', mypageRouter);
router.use('/oauth', oauthRouter);
 
module.exports = router;

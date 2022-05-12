const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/auth');
const boardController = require('../controllers/board');
const config = require('../config');
const User = require('../models/user');

// 게시물 작성
router.post('/', isAuth, boardController.post);

// 게시물 상세 가져오기
router.get('/:id', boardController.get);

// 게시물 수정
router.put('/:id', isAuth, boardController.put);

// 게시물 삭제
router.delete('/:id', isAuth, boardController.remove);

// 이미지 업로드
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  accessKeyId: config.AWS.accessId,
  secretAccessKey: config.AWS.secretKey,
  region: config.AWS.region,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'imgstorages',
    key: function (req, file, cb) {
      var ext = file.mimetype.split('/')[1];
      if (!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
        return cb(new Error('Only images are allowed'));
      }
      cb(null, Date.now() + '.' + file.originalname.split('.').pop());
    },
  }),
  acl: 'public-read-write',
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 이미지 업로드 요청
router.post('/img', upload.single('file'), async (req, res) => {

  res.status(200).json({ location: req.file.location });
});

router.post('/profile', upload.single('file'), isAuth, async (req, res) => {
  await User.update(
    {
      profile: req.file.location,
    },
    {
      where: {
        id: req.userId,
      },
    },
  );

  const userInfo = await User.findOne({
    attributes: ['id', 'email', 'nickname', 'profile', 'provider', 'snsId'],
    where: {
      id: req.userId,
    },
  });

  res.status(200).json({ userInfo });
});

module.exports = router;

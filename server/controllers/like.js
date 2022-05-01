const Like = require('../models/like');
require('dotenv').config();

module.exports = {
  get: async (req, res) => {
    const { id } = req.params;

    console.log(id)
    console.log(req.userId)

    let like = false
    const islike = await Like.findOne({
      where: {
        UserId: req.userId,
        BoardId: id
      }
    })

    if (islike) {
      console.log('dd')
      like = true
    }

    res.status(200).json({ like, message: "게시글의 좋아요 정보 입니다."})

  },
  post: async (req, res) => {
    try {
      const { id } = req.body;

      const what = await Like.create({
        UserId: req.userId,
        BoardId: id,
      });

      res.status(201).json({ message: `좋아요 추가했습니다.` });
    } catch (error) {
      console.error(error);
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.body;

      await Like.destroy({
        where: {
          UserId: req.userId,
          BoardId: id,
        },
      });

      res.status(201).json({ message: `좋아요 삭제했습니다.` });
    } catch (error) {
      console.error(error);
    }
  },
};

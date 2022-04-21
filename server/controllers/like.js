const Like = require('../models/like');
require('dotenv').config();

module.exports = {
  post: async (req, res) => {
    try {
      const { id } = req.params;

      await Like.create({
        UserId: req.userId,
        BoardId: id,
      });

      res.status(201).json({ message: `좋아요 추가했습니다.` });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;

      await Like.destroy({
        where: {
          UserId: req.userId,
          BoardId: id,
        },
      });

      res.status(201).json({ message: `좋아요 삭제했습니다.` });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

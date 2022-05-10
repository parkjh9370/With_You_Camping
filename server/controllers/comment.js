const User = require('../models/user');
const Comment = require('../models/comment');
const SQ = require('sequelize');
const SequelModel = SQ.Sequelize;

module.exports = {
  post: async (req, res) => {
    const {id} = req.params;
    const { comment } = req.body;

    await Comment.create({
      UserId: req.userId,
      BoardId: id,
      comment: comment,
    });

    res.status(200).json({ message: '댓글이 추가되었습니다' });
  },
  get: async (req, res) => {
    const { id } = req.params;

    console.log(id);

    const nowComment = await Comment.findAll({
      order: [['createdAt', 'desc']],
      where: {
        BoardId: id,
      },
      attributes: [
        'id',
        'comment',
        'createdAt',
        'updatedAt',
        [SequelModel.col('User.nickname'), 'nickname'],
        [SequelModel.col('User.id'), 'userId'],
        [SequelModel.col('User.profile'), 'profile']
      ],
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
    });

    res
      .status(200)
      .json({ comment: nowComment, message: '현재 게시글의 댓글 입니다.' });
  },
  put: async (req, res) => {
    // commentId
    const { id } = req.params
    const { comment } = req.body;

    const findComment = await Comment.findOne({
      where: {
        id: id,
        UserId: req.userId,
      },
    });

    if (!findComment) {
      return res.status(400).json({ message: '유저가 일치하지 않습니다.' });
    }

    await Comment.update(
      {
        comment: comment,
      },
      {
        where: {
          id: id,
          UserId: req.userId,
        },
      },
    );

    res
      .status(200)
      .json({ message: '댓글이 수정되었습니다' });
  },
  remove: async (req, res) => {

    const { id } = req.params

    const findComment = await Comment.findOne({
      where: {
        id: id,
        UserId: req.userId,
      },
    });

    if (!findComment) {
      return res.status(400).json({ message: '유저가 일치하지 않습니다.' });
    }

    await Comment.destroy({
      where: {
        id: id,
        UserId: req.userId,
      },
    });

    res.status(200).json({ message: '댓글을 삭제했습니다.' });
  },
};

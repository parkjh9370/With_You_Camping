const User = require('../models/user');
const Comment = require('../models/comment');
const SQ = require('sequelize');
const SequelModel = SQ.Sequelize;

module.exports = {
  post: async (req, res) => {
    const boardId = parseInt(req.query.boardId);
    const { comment } = req.body;

    const newComment = await Comment.create({
      UserId: req.userId,
      BoardId: boardId,
      comment: comment,
    });

    res
      .status(200)
      .json({ comment: newComment.id, message: '댓글이 추가되었습니다' });
  },
  get: async (req, res) => {
    const boardId = parseInt(req.query.boardId)

    const nowComment = await Comment.findAll({
      order: [['createdAt', 'desc']],
      where: {
        BoardId: boardId,
      },
      attributes: [
        'id',
        'comment',
        'createdAt',
        'updatedAt',
        [SequelModel.col('User.nickname'), 'nickname'],
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
    const boardId = parseInt(req.query.boardId);
    const commentId = parseInt(req.query.commentId);
    const { comment } = req.body;

    const findComment = await Comment.findOne({
      where: {
        id: commentId,
        UserId: req.userId,
        BoardId: boardId,
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
          id: commentId,
          UserId: req.userId,
          BoardId: boardId,
        },
      },
    );

    res
      .status(200)
      .json({ comment: `${commentId}`, message: '댓글이 수정되었습니다' });
  },
  remove: async (req, res) => {
    const boardId = parseInt(req.query.boardId);
    const commentId = parseInt(req.query.commentId);

    const findComment = await Comment.findOne({
      where: {
        id: commentId,
        UserId: req.userId,
        BoardId: boardId,
      },
    });

    if (!findComment) {
      return res.status(400).json({ message: '유저가 일치하지 않습니다.' });
    }

    await Comment.destroy({
      where: {
        id: commentId,
        UserId: req.userId,
        BoardId: boardId,
      },
    });

    res
      .status(200)
      .json({ message: '댓글을 삭제했습니다.' });
  },
};

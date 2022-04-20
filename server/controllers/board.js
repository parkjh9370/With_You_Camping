const User = require('../models/user');
const Board = require('../models/board');
const Comment = require('../models/comment');
const Like = require('../models/like');
const SQ = require('sequelize');
const SequelModel = SQ.Sequelize;
require('dotenv').config();

module.exports = {
  // 게시글 등록
  post: async (req, res) => {
    // 제목, 내용 필수값
    const { title, content, picture, siteInfo } = req.body;

    const board = await Board.create({
      UserId: req.userId,
      title,
      content,
      picture,
      siteInfo,
    });

    res
      .status(203)
      .json({ boardId: board.id, message: '게시물이 생성 되었습니다.' });
  },
  // 상세 게시글 정보
  get: async (req, res) => {
    const { id } = req.params;

    const board = await Board.findOne({
      where: {
        id: id,
      },
      attributes: [
        'id',
        [SequelModel.col('User.nickname'), 'nickname'],
        'title',
        'content',
        'picture',
        'siteInfo',
        'createdAt',
        'updatedAt',
        'userId',
      ],
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
    });

    const comment = await Comment.findAll({
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
      ],
      include: [
        {
          model: User,
          attributes: [],
        },
      ],
    });

    // const LikeBoard = await Like.findAll({});
    // 게시글 북마크 불러오기
    const LikeBoard = await Like.findAll({
      where: {
        BoardId: id,
      },
    });
    // 북마크 갯수
    const LikeCount = LikeBoard.length;


    // 유저의 해당 게시글 북마크 여부
    const checkLike = await Like.findOne({
      where: {
        UserId: req.userId,
        BoardId: id,
      },
    });
    let isBoardLike = false;
    // 유저가 북마크 안했으면 false, 했으면 true
    if (checkLike) {
      isBoardLike = true;
    }

    return res.status(200).json({
      board,
      comment,
      LikeCount,
      isBoardLike,
      message: '게시물을 가져왔습니다.',
    });
  },
  // 게시글 수정
  put: async (req, res) => {
    // 게시글 PK
    const { id } = req.params;
    const { title, content, picture, siteInfo } = req.body;

    const findBoard = await Board.findByPk(id);

    if (findBoard.UserId != req.userId) {
      return res.status(400).json({ message: '유저가 일치하지 않습니다' });
    }

    if (!findBoard)
      return res
        .status(400)
        .json({ message: '해당 게시물이 존재하지 않습니다' });

    await Board.update(
      {
        title,
        content,
        picture,
        siteInfo,
      },
      {
        where: {
          id,
        },
      },
    );

    res.status(200).json({ message: '게시물이 수정 되었습니다' });
  },
  // 게시글 삭제
  remove: async (req, res) => {
    const { id } = req.params;

    const findBoard = await Board.findByPk(id);

    if (findBoard.UserId != req.userId) {
      return res.status(400).json({ message: '유저가 일치하지 않습니다' });
    }

    if (!findBoard)
      return res
        .status(400)
        .json({ message: '해당 게시물이 존재하지 않습니다' });

    await Board.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ message: '게시물이 삭제 되었습니다' });
  },
};

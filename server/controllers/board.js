const User = require('../models/user');
const Board = require('../models/board');
const BoardData = require('../models/boarddata');
const Comment = require('../models/comment');
const Like = require('../models/like');
const SQ = require('sequelize');
const SequelModel = SQ.Sequelize;
require('dotenv').config();

module.exports = {
  // 게시글 등록
  post: async (req, res) => {
    // 제목, 내용 필수값
    const {
      title,
      content,
      picture,
      siteInfo,
      wifi,
      hotWater,
      parking,
      electricity,
      toiletType,
    } = req.body;

    const board = await Board.create({
      UserId: req.userId,
      title,
      content,
      picture,
      siteInfo,
    });

    const boardData = await BoardData.create({
      BoardId: board.dataValues.id,
      wifi,
      hotWater,
      parking,
      electricity,
      toiletType,
    });

    res
      .status(203)
      .json({
        boardId: board.id,
        boardDataId: boardData.id,
        message: '게시물이 생성 되었습니다.',
      });
  },
  // 상세 게시글 정보
  get: async (req, res) => {
    const { id } = req.params;

    // 게시물 가져오기
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

    // 게시물 옵션 가져오기
    const boardData = await BoardData.findOne({
      attributes: [
        'id',
        'wifi',
        'hotWater',
        'parking',
        'electricity',
        'toiletType',
      ],
      where: {
        BoardId: id,
      },
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

    // 게시글 북마크 불러오기
    const LikeBoard = await Like.findAll({
      where: {
        BoardId: id,
      },
    });
    // 북마크 갯수
    const likeCount = LikeBoard.length;

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
      boardData,
      comment,
      likeCount,
      isBoardLike,
      message: '게시물을 가져왔습니다.',
    });
  },
  // 게시글 수정
  put: async (req, res) => {
    // 게시글 PK
    const { id } = req.params;
    const {
      title,
      content,
      picture,
      siteInfo,
      wifi,
      hotWater,
      parking,
      electricity,
      toiletType,
    } = req.body;

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

    await BoardData.update({
      wifi,
      hotWater,
      parking,
      electricity,
      toiletType
    },{
      where: {
        boardId: id
      }
    })

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

const User = require('../../models/user');
const Board = require('../../models/board');
const BoardData = require('../../models/boarddata');
const Like = require('../../models/like');
const Comment = require('../../models/comment');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const SequelModel = sequelize.Sequelize;

module.exports = {
  // 메인 페이지
  getAllBoards: async (page, limit) => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      attributes: ['id', 'title', 'content', 'picture', 'createdAt', 'UserId'],
      include: [
        {
          model: Comment,
          attributes: ['comment'],
        },
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      limit: Number(limit), // 갯수
      offset: (page - 1) * 12, // 1페이지 15 ~ 6 -> 5 ~ 1
    });
  },
  getCategoryBoards: async (category, page, limit) => {
    return await BoardData.findAndCountAll({
      order: [['id', 'desc']],
      where: {
        area: category,
      },
      attributes: [],
      include: [
        {
          model: Board,
          attributes: [
            'id',
            'title',
            'content',
            'picture',
            'createdAt',
            'UserId',
          ],
          include: [
            {
              model: Comment,
              attributes: ['comment'],
            },
            {
              model: User,
              attributes: ['nickname'],
            },
          ],
        },
      ],
      limit: Number(limit), // 갯수
      offset: (page - 1) * 12, // 1페이지 15 ~ 6 -> 5 ~ 1
    });
  },
  getLikeBoards: async (page, limit) => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      attributes: ['id', 'title', 'content', 'picture', 'createdAt', 'UserId'],
      where: {
        createdAt: {
          [Op.gte]: new Date(Date.parse(new Date()) - 7 * 1000 * 60 * 60 * 24),
        },
      },
      include: [
        {
          model: Comment,
          attributes: ['comment'],
        },
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      // limit: Number(limit), // 갯수
      // offset: (page - 1) * 12, // 1페이지 15 ~ 6 -> 5 ~ 1
    });
  },
  // 좋아요 갯수 세기
  countLike: async boardIds => {
    const counting = [];

    for (let i = 0; i < boardIds.length; i++) {
      const count = await Like.count({
        where: {
          BoardId: boardIds[i],
        },
      });
      counting.push(count);
    }
    return counting;
  },
  // 제목 검색
  searchTitle: async (option, page, limit) => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      where: {
        title: {
          [Op.like]: '%' + option + '%', // 제목 검색
        },
      },
      attributes: ['id', 'title', 'content', 'picture', 'createdAt', 'UserId'],
      include: [
        {
          model: Comment,
          attributes: ['comment'],
        },
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
    });
  },
  // 내용 검색
  searchContent: async (option, page, limit) => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      where: {
        content: {
          [Op.like]: '%' + option + '%', // 내용 검색
        },
      },
      attributes: ['id', 'title', 'content', 'picture', 'createdAt', 'UserId'],
      include: [
        {
          model: Comment,
          attributes: ['comment'],
        },
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
    });
  },
  // 내가 쓴 글 조회
  myBoards: async (userId, page, limit) => {
    console.log('3333333333333333');
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      where: {
        UserId: userId,
      },
      include: [
        {
          model: Comment,
          attributes: ['comment'],
        },
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
      limit: Number(limit),
      offset: (page - 1) * 12, // 1페이지 15 ~ 6 -> 5 ~ 1
    });
  },
  // 내가 좋아요 한  글
  myLikes: async (userId, page, limit) => {
    return await Like.findAndCountAll({
      order: [['id', 'desc']],
      where: {
        UserId: userId,
      },
      attributes: ['id'],
      // join 문
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
        {
          model: Board,
          attributes: [
            'id',
            'title',
            'content',
            'picture',
            'createdAt',
            'userId',
          ],
          include: [
            {
              model: Comment,
              attributes: ['comment'],
            },
          ],
        },
      ],
      limit: Number(limit), // 한 페이지에 몇개를 보여줄 것인가
      // 시작점 1페이지 = 0 / 2페이지  = 10 / 3페이지 = 20
      offset: (page - 1) * 12,
      // subQuery: false,
    });
  },
};

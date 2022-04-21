const User = require('../../models/user');
const Board = require('../../models/board');
const Like = require('../../models/like');
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  // 메인 페이지
  getBoards: async (page, limit) => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      attributes: [
        'id',
        'title',
        'content',
        'picture',
        'siteInfo',
        'site',
        'createdAt',
        'UserId',
      ],
      limit: Number(limit), // 갯수
      offset: (page - 1) * 10, // 1페이지 15 ~ 6 -> 5 ~ 1
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
  // 장소 검색
  searchSite: async (option, page, limit) => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      where: {
        site: {
          [Op.like]: '%' + option + '%', // 위치 검색
        },
      },
      limit: Number(limit),
      offset: (page - 1) * 10,
    });
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
      limit: Number(limit),
      offset: (page - 1) * 10,
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
      limit: Number(limit),
      offset: (page - 1) * 10,
    });
  },
  // 내가 쓴 글 조회
  myBoards: async (userId, page, limit) => {
    return await Board.findAndCountAll({
      order: [['id', 'desc']],
      where: {
        UserId: userId,
      },
      limit: Number(limit),
      offset: (page - 1) * 10, // 1페이지 15 ~ 6 -> 5 ~ 1
    });
  },
  // 내가 북마크 한 글
  myBookmarks: async (userId, page, limit) => {
    return await User.findAndCountAll({
      attributes: ['id'],
      where: {
        id: userId,
      },
      // join 문
      include: [
        {
          model: Board,
          through: {
            attributes: ['createdAt'],
          },
          // order: [[db.sequelize.models.Bookmark, 'createdAt', 'desc']],
        },
      ],
      limit: Number(limit), // 한 페이지에 몇개를 보여줄 것인가
      // 시작점 1페이지 = 0 / 2페이지  = 10 / 3페이지 = 20
      offset: (page - 1) * 10,
      subQuery: false,
    });
  },
};

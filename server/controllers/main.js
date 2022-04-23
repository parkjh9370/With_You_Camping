const pagenation = require('./functions/pagenation');
const { sequelize } = require('../models/board');

module.exports = {
  list: async (req, res) => {
    let { pages, limit } = req.query;

    pages = Number(req.query.pages || 1);

    const boards = await pagenation.getBoards(pages, limit);
 
    // 좋아요 갯수 추가하기
    const boardsId = boards.rows.map(board => {
      return board.id;
    });

    const countLike = await pagenation.countLike(boardsId);

    for (let i = 0; i < boardsId.length; i++) {
      boards.rows[i].dataValues['totalLike'] = countLike[i];
    }

    if (boards.rows.length === 0) {
      return res.status(404).json({ message: '게시물이 존재하지 않습니다.' });
    }

    res
      .status(200)
      .json({ boards, message: `${pages}번 페이지 게시물들을 가져왔습니다.` });
  },
  search: async (req, res) => {
    // searchType: 검색 유형 (장소, 제목, 내용)
    const searchType = req.query.search_type;
    // site: 장소, titles: 제목, contents: 내용
    const { sites, titles, contents, pages, limit } = req.query;

    // 장소 검색
    if (searchType === 'site') {
      if (!sites) {
        return res.status(400).json({ message: '장소를 넣어 주세요' });
      }

      const boards = await pagenation.searchSite(sites, pages, limit);

      if (boards.count === 0) {
        return res
          .status(400)
          .json({ message: '검색 결과 게시물이 없습니다.' });
      }

      // 좋아요 갯수 추가하기
      const boardsId = boards.rows.map(board => {
        return board.id;
      });

      const countLike = await pagenation.countLike(boardsId);

      for (let i = 0; i < boardsId.length; i++) {
        boards.rows[i].dataValues['totalLike'] = countLike[i];
      }

      if (boards.rows.length === 0) {
        return res.status(404).json({ message: '게시물이 존재하지 않습니다.' });
      }

      return res
        .status(201)
        .json({ boards, message: '장소 검색에 성공 했습니다.' });
    }

    // 제목 검색
    if (searchType === 'title') {
      if (!titles) {
        return res.status(400).json({ message: '제목을 입력 해주세요.' });
      }

      const boards = await pagenation.searchTitle(titles, pages, limit);

      if (boards.count === 0) {
        return res
          .status(400)
          .json({ message: '검색 결과 게시물이 없습니다.' });
      }

      // 좋아요 갯수 추가하기
      const boardsId = boards.rows.map(board => {
        return board.id;
      });

      const countLike = await pagenation.countLike(boardsId);

      for (let i = 0; i < boardsId.length; i++) {
        boards.rows[i].dataValues['totalLike'] = countLike[i];
      }

      if (boards.rows.length === 0) {
        return res.status(404).json({ message: '게시물이 존재하지 않습니다.' });
      }

      return res
        .status(201)
        .json({ boards, message: '제목 검색에 성공 했습니다.' });
    }

    // 내용 검색
    if (searchType === 'content') {
      if (!contents) {
        return res.status(400).json({ message: '본문을 입력 해주세요.' });
      }
      const boards = await pagenation.searchContent(contents, pages, limit);

      if (boards.count === 0) {
        return res
          .status(400)
          .json({ message: '검색 결과 게시물이 없습니다.' });
      }

      // 좋아요 갯수 추가하기
      const boardsId = boards.rows.map(board => {
        return board.id;
      });

      const countLike = await pagenation.countLike(boardsId);

      for (let i = 0; i < boardsId.length; i++) {
        boards.rows[i].dataValues['totalLike'] = countLike[i];
      }

      if (boards.rows.length === 0) {
        return res.status(404).json({ message: '게시물이 존재하지 않습니다.' });
      }

      return res
        .status(201)
        .json({ boards, message: '본문 내용 검색에 성공 했습니다.' });
    }
  },
  // 일주일 간 좋아요 많이 눌린 게시글 순
  rank: async (req, res) => {
    // 7일전 ~ 현재까지 게시글
    const preboards = await sequelize.query(
      'SELECT * FROM boards WHERE createdAt BETWEEN DATE_ADD (NOW(), INTERVAL -1 WEEK) AND NOW() ORDER BY id DESC;',
    );

    if (!preboards) {
      return res.status(404).json({ message: '게시물이 존재하지 않습니다.' });
    }

    // 좋아요 갯수 추가하기
    const boardsId = preboards[0].map(board => {
      return board.id;
    });

    const countLike = await pagenation.countLike(boardsId);

    for (let i = 0; i < boardsId.length; i++) {
      preboards[0][i]['totalLike'] = countLike[i];
    }

    // 좋아요 순으로 정렬하기
    const boards = preboards[0].sort((a, b) => b.totalLike - a.totalLike);

    res
      .status(201)
      .json({ boards, message: '최근 일주일 간 좋아요가 많은 게시글 입니다.' });
  },
};

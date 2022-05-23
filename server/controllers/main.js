const pagenation = require('./functions/pagenation');
const { sequelize } = require('../models');

module.exports = {
  list: async (req, res) => {
    let { pages, limit, category } = req.query;
    pages = Number(req.query.pages || 1);
 
    if (category === '전체') {
      const boards = await pagenation.getAllBoards(pages, limit);
 
      // 좋아요 갯수 추가하기
      const boardsId = boards.rows.map(board => {
        return board.id;
      });

      const countLike = await pagenation.countLike(boardsId);

      for (let i = 0; i < boardsId.length; i++) {
        boards.rows[i].dataValues['totalLike'] = countLike[i];
      }

      return res.status(200).json({
        boards,
        message: `${pages}번 페이지 게시물들을 가져왔습니다.`,
      });
    } else if (category === '인기순') {
      // createdAt 7일전 이상으로 검색하기
      const boards = await pagenation.getLikeBoards(pages, limit);
      
      const boardsId = boards.rows.map(board => {
        return board.id;
      });
      
      const countLike = await pagenation.countLike(boardsId);

      for (let i = 0; i < boardsId.length; i++) {
        boards.rows[i].dataValues['totalLike'] = countLike[i];
      }
 
      // 좋아요 많은 기준으로 12개의 데이터만 추출
      const boardSort = {
        count: 12,
        rows: boards.rows
          .sort((a, b) => b.dataValues.totalLike - a.dataValues.totalLike)
          .slice(0, 12),
      };

      return res.status(200).json({
        boards: boardSort,
        message: `좋아요 순으로 게시물들을 가져왔습니다.`,
      });
    } else if (category) {

      const boards = await pagenation.getCategoryBoards(category, pages, limit);

      let boardsData = boards.rows.map(index => index.Board);

      const setBoards = { count: boards.count, rows: boardsData };
      const boardsId = setBoards.rows.map(board => {
        return board.id;
      });

      const countLike = await pagenation.countLike(boardsId);

      for (let i = 0; i < boardsId.length; i++) {
        setBoards.rows[i].dataValues['totalLike'] = countLike[i];
      }

      // if (setBoards.rows.length === 0) {
      //   return res.status(404).json({ message: '게시물이 존재하지 않습니다.' });
      // }

      return res.status(200).json({
        boards: setBoards,
        message: `${category} ${pages}번 페이지 게시물들을 가져왔습니다.`,
      });
    } else {
      return res.status(200).json({ message: '카테고리를 선택해주세요' });
    }
  },

  search: async (req, res) => {
    const { searchType, input, pages, limit } = req.query;

    // 제목 검색
    if (searchType === 'title') {
      const boards = await pagenation.searchTitle(input, pages, limit);

      // 좋아요 갯수 추가하기
      const boardsId = boards.rows.map(board => {
        return board.id;
      });

      const countLike = await pagenation.countLike(boardsId);

      for (let i = 0; i < boardsId.length; i++) {
        boards.rows[i].dataValues['totalLike'] = countLike[i];
      }

      return res
        .status(201)
        .json({ boards, message: '제목 검색 결과 게시글 입니다' });
    }

    // // 내용 검색
    if (searchType === 'content') {
      const boards = await pagenation.searchContent(input, pages, limit);

      // 좋아요 갯수 추가하기
      const boardsId = boards.rows.map(board => {
        return board.id;
      });

      const countLike = await pagenation.countLike(boardsId);

      for (let i = 0; i < boardsId.length; i++) {
        boards.rows[i].dataValues['totalLike'] = countLike[i];
      }

      return res
        .status(201)
        .json({ boards, message: '내용 검색 결과 게시물입니다.' });
    }

    res.status(401).json({ message: '제목 및 내용 검색에 실패하였습니다' });
  },
};

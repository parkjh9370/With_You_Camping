const User = require('../models/user');
const bcrypt = require('bcrypt');
const pagenation = require('./functions/pagenation');
const { hashPassword } = require('./functions/security');

module.exports = {
  // 비밀번호 확인
  confirmPassword: async (req, res) => {
    const { nowPassword } = req.body;

    const userFind = await User.findByPk(req.userId);

    if (!userFind) {
      return res.status(400).json({ message: '유저가 존재 하지 않습니다.' });
    }

    const isValidPassword = await bcrypt
      .compare(nowPassword, userFind.password)
      .catch(err => console.log(err));

    if (!isValidPassword) {
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    res.status(201).json({ message: '유저정보 수정 및 탈퇴가 가능합니다' });
  },
  // 유저 정보
  get: async (req, res) => {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });
    delete user.dataValues.password;

    if (!user) {
      return res.status(401).json({ message: '해당 유저가 없습니다.' });
    }

    return res.status(200).json({
      user: user.dataValues,
      message: '회원 정보를 가져왔습니다.',
    });
  },
  // 유저 정보 수정
  put: async (req, res) => {
    const { nickname, password } = req.body;

    const userFind = await User.findByPk(req.userId);

    if (!userFind) {
      return res.status(400).json({ message: '유저가 존재 하지 않습니다.' });
    }

    // 유저 정보 업데이트
    const hashedPassword = await hashPassword(password);

    await User.update(
      {
        password: hashedPassword,
        nickname,
      },
      {
        where: { id: req.userId },
      },
    );

    res.status(200).json({ message: '유저 정보가 수정되었습니다.' });
  },
  // 회원 탈퇴
  withdrwal: async (req, res) => {
    // 탈퇴할 회원의 PK
    const { userId } = req.params;

    if (req.userId != userId) {
      return res.status(400).json({ message: '유저가 일치하지 않습니다.' });
    }

    await User.destroy({
      where: { id: req.userId },
    });

    res.status(204).json({ message: '회원이 탈퇴처리 되었습니다.' });
  },
  // 유저가 작성한 게시글 내려주기
  board: async (req, res) => {
    const { pages, limit } = req.query;
    const userId = req.userId;

    const boards = await pagenation.myBoards(userId, pages, limit);

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

    return res.status(200).json({
      boards,
      message: '내가 쓴 게시물을 불러왔습니다,',
    });
  },
  // 유저가 좋아요 한 게시글 내려주기
  like: async (req, res) => {
    const { pages, limit } = req.query;
    const userId = req.userId;

    const boards = await pagenation.myLikes(userId, pages, limit);

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

    return res.status(200).json({
      boards,
      message: '내가 쓴 게시물을 불러왔습니다,',
    });
  },
};

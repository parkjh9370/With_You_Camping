const { User } = require('../models');
const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  sendToken,
  checkToken,
  generateRefreshToken,
} = require('./functions/jwtToken');
const { hashPassword } = require('./functions/security');

module.exports = {
  // 회원가입
  signup: async (req, res, next) => {
    try {
      const { email, password, nickname, name } = req.body;
      const exUser = await User.findOne({
        where: {
          email,
        },
      });
      if (exUser) {
        return res.status(401).send('중복된 이메일 입니다.');
      }

      const hashPw = await hashPassword(password);

      await User.create({
        email,
        password: hashPw,
        nickname,
        name,
      });
      return res.status(201).send('ok');
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  // 로그인
  login: async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
      const userInfo = await User.findOne({ where: { email } });

      if (!userInfo) {
        return res.status(401).json({
          success: false,
          message: '이메일 이 존재하지 않습니다.',
        });
      }
      const match = await bcrypt.compare(
        password,
        userInfo.dataValues.password,
      ); 
      if (!match) {
        return res.status(401).json({
          success: false,
          message: '비밀번호가 잘못되었습니다.',
        });
      }
      delete userInfo.dataValues.password;

      const accessToken = generateAccessToken(userInfo.dataValues.id);
      const refreshToken = generateRefreshToken();
      sendToken(res, accessToken, refreshToken);
      res.status(200).json({ userId: userInfo.id, accessToken });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  token: async (req, res) => {
    try {
      // 쿠키에 에세스 토큰이 유무 확인.
      const { accessToken } = req.cookies;
      if (!accessToken) {
        return res.status(401).json({ message: 'Access token not provided!' });
      }

      // 에세스 토큰이 유효한지 확인.
      const accessTokenData = checkToken(accessToken);
      if (!accessTokenData) {
        return res.status(401).json({ message: 'Invalid token!' });
      }

      // 에세스 토큰 정보가 유효한지 확인.

      const { email } = accessTokenData;
      const userInfo = await User.findOne({ where: { email } });
      if (!userInfo) {
        return res.status(403).json({ message: 'Not authorized!' });
      }
      return res.status(200).json(accessTokenData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error!' });
    }
  },
  // 로그아웃
  signout: async (req, res, next) => {
    try {
      // 로그아웃 할 때는 쿠키를 삭제한다.
      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');
      // 로그아웃 성공시 200을 보냄.
      res.status(200).json({ message: 'ok' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error!' });
    }
  },
};

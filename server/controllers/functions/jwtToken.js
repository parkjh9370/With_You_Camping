require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  // Access token으로 sign
  generateAccessToken: data => {
    return jwt.sign(data, process.env.ACCESS_SECRET, {
      expiresIn: '3h',
    });
  }, 
  generateRefreshToken: () => {
    return jwt.sign({}, process.env.ACCESS_SECRET, {
      expiresIn: '14d',
    });
  },
  // JWT 토큰을 쿠키로 전달
  sendToken: (res, accessToken, refreshToken) => {
    const cookieOptions = {
      httpOnly: true,
    };
    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);
  },
  // JWT 토큰 정보를 받아서 검증
  checkToken: token => {
    try {
      return jwt.verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};

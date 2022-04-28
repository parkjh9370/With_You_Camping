const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
  // Access token으로 sign
  generateAccessToken: data => {
    return jwt.sign(data, config.jwt.accessSecretKey, {
      expiresIn: config.jwt.expiresInSec, // 3시간
    });
  },
  generateRefreshToken: () => {
    return jwt.sign({}, config.jwt.accessSecretKey, {
      expiresIn: config.jwt.expiresInSec, // 3일
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
      return jwt.verify(token, config.jwt.accessSecretKey);
    } catch (err) {
      return null;
    }
  },
};

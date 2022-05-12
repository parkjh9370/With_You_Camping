const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config')

module.exports = async (req, res, next) => {

  let token;
  // 토큰이 헤더로 전달되었을 때
  const authHeader = req.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } 

  // 토큰이 쿠키로 전달되었을 때
  if (!token) {
    token = req.cookies['token'];
  }



  if (!token) {
    return res.status(401).json({ message: '유저가 아닙니다.' });
  }

  jwt.verify(token, config.jwt.accessSecretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: '인증되지 않은 토큰입니다.' });
    }

    const user = await User.findByPk(decoded.data);
    if (!user) {
      return res.status(401).json({ message: '인증되지 않았습니다.' });
    }
    req.userId = user.id; // req.customData

    req.token = token;
    next();
  });
};

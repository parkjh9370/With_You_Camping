const { User } = require('../models');
const { checkToken } = require('../controllers/functions/jwtToken');

require('dotenv').config();

module.exports = async (req, res, next) => {
  // console.log('cookies:', req.cookies);
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken || !refreshToken) {
    return res.status(401).json({ message: 'Token error!' });
  }
  // 에세스 토큰이 유효한지 확인.
  const accessTokenData = checkToken(accessToken);
  const refreshTokenData = checkToken(refreshToken);
  if (accessTokenData === null) {
    if (refreshTokenData === undefined) {
      return res.status(401).json({ message: 'Not invalid token error!' });
    }
  }
  // 에세스 토큰 정보가 유효한지 확인.
  const { email } = accessTokenData;
  const userInfo = await User.findOne({ where: { email } });
  if (!userInfo) {
    return res.status(401).json({ message: 'Not signed user!' });
  }
  req.userId = userInfo.id;
  next();
};

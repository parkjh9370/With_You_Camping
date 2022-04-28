const User = require('../models/user');
const axios = require('axios');
const config = require('../config');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('./functions/jwtToken');

module.exports = {
  // oauth/kakao
  kakao: async (req, res) => {
    try {
      const oauthData = {
        grant_type: 'authorization_code',
        client_id: config.kakao.clientID,
        redirect_uri: config.kakao.redirectURI,
        // 클라이언트에서 받은 인가 코드
        code: req.query.code,
      };

      const url = `https://kauth.kakao.com/oauth/token?code=${oauthData.code}&client_id=${oauthData.client_id}&redirect_uri=${oauthData.redirect_uri}&grant_type=${oauthData.grant_type}`;

      //  access_token 값 요청
      const response = await axios.post(
        url,
        {},
        {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      );

      const { access_token } = response.data;

      // access_toke을 통해 유저 정보 요청
      const getKakaoUserInfo = await axios.get(
        `https://kapi.kakao.com/v2/user/me`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-type': 'application/x-www-form-urlencoded',
          },
        },
      );

      // 유저 정보 세팅
      const { profile } = getKakaoUserInfo.data.kakao_account;

      const userInfo = await User.findOrCreate({
        where: {
          nickname: profile.nickname,
          provider: 'kakao',
          snsId: getKakaoUserInfo.data.kakao_account.email,
        },
      });
      // console.log(userInfo.data)
      const userId = userInfo[0].dataValues.id;
      // console.log(userId)

      const accessToken = generateAccessToken(userId);
      const refreshToken = generateRefreshToken(userId);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/api/auth/token',
        maxAge: 60 * 60 * 24 * 7,
      });

      res.status(200).json({ userId: userId, accessToken });
    } catch (err) {
      console.error(err);
    }
  },

  google: async (req, res) => {},
};

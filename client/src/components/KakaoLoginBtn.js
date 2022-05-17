import React, { useEffect } from "react";
import styled from "styled-components";
import kakaoIcon from "../img/kakao_login_icon.png";

const Container = styled.div`
  img {
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 24%) 0px 2px 2px 0px,
      rgb(0 0 0 / 24%) 0px 0px 1px 0px;
    cursor: pointer;
    transition: 0.1s;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export default function KakaoLoginBtn() {
  const kakaoClientID = process.env.REACT_APP_KAKAO_CLIENTID;
  const kakaoCallbackURI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  useEffect(() => {
    kakaoInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const kakao = window.Kakao;
  const kakaoInit = () => {
    if (kakao.isInitialized() === false) {
      kakao.init(kakaoClientID);
    }
  };

  const kakaoSignIn = () => {
    kakao.Auth.authorize({
      redirectUri: kakaoCallbackURI,
    });
  };

  return (
    <Container>
      <img
        src={kakaoIcon}
        alt="kakao_icon"
        width="50"
        onClick={() => kakaoSignIn()}
      />
    </Container>
  );
}

import React from "react";
import styled from "styled-components";
import naverIcon from "../img/naver_login_icon.png";

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

export default function NaverLoginBtn() {
  const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
  const naverRedirectUrl = process.env.REACT_APP_NAVER_REDIRECT_URL;
  const naverState = process.env.REACT_APP_NAVER_STATE;

  const loginHandler = async () => {
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${naverRedirectUrl}&state=${naverState}`;
    window.location.replace(url);
  };

  return (
    <Container>
      <img src={naverIcon} alt="naver_icon" width="50" onClick={loginHandler} />
    </Container>
  );
}

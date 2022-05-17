import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import styled from "styled-components";

import googleIcon from "../img/google_login_icon.png";

const Container = styled.div`
  button {
    width: 50px;
    height: 50px;
    background: ${`url(${googleIcon})`};
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    transition: 0.1s;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export default function GoogleLoginBtn() {
  const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENTID;
  const sessionStorage = window.sessionStorage;
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const navigate = useNavigate();

  const onSuccess = async (e) => {
    const code = e.tokenId;

    const getToken = await axios.post(`${serverPath}/oauth/google`, {
      code: code,
    });
    if (getToken.status === 200) {
      sessionStorage.setItem("userId", getToken.data.userId);
      sessionStorage.setItem("loginToken", getToken.data.accessToken);
      sessionStorage.setItem("nickname", getToken.data.nickname);
      sessionStorage.setItem("loginMethod", "google");

      navigate("/");
      window.location.reload();
    }
  };

  const onFailure = (error) => {
    //console.log(error);
  };

  return (
    <Container>
      {/* 클라이언트 ID와 함께 accessToken(code) 요청 */}
      <GoogleLogin
        clienId={clientId}
        buttonText={false}
        icon={false}
        responseType={"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </Container>
  );
}

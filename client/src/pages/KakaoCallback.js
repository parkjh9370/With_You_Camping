import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
`;

export default function KakaoLogin({ setIsLogin, isLogin }) {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get("code");
  const serverPath = process.env.REACT_APP_SERVER_PATH;

  useEffect(() => {
    axios
      .post(`${serverPath}/oauth/kakao?code=${authorizationCode}`, {})
      .then((res) => {
        //이후의 모든 요청에 이 헤더 적용된다.
        // axios.defaults.headers.common[
        //   'Authorization'
        // ] = `Bearer ${res.data.accToken}`;

        sessionStorage.setItem("userId", res.data.userId);
        sessionStorage.setItem("loginToken", res.data.accessToken);
        sessionStorage.setItem("nickname", res.data.nickname);
        sessionStorage.setItem("loginMethod", "kakao");
        navigate("/");
        window.location.reload();
        // navigate("/");
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LoadingContainer>로딩중입니다</LoadingContainer>
    </>
  );
}

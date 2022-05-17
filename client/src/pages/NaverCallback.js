import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingIndicator } from "../components/loadingIndicator";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  top: 200px;

  width: 100%;

  .wrapper {
    text-align: center;

    div {
      margin-bottom: 50px;
      font-size: 1.1rem;
      color: #888;
    }
  }
`;

export default function NaverCallback() {
  const sessionStorage = window.sessionStorage;
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const naverState = process.env.REACT_APP_NAVER_STATE;
  const navigate = useNavigate();

  const nidCode = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    axios
      .post(`${serverPath}/oauth/naver`, {
        code: nidCode,
        state: naverState,
      })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem("userId", res.data.userId);
          sessionStorage.setItem("loginToken", res.data.accessToken);
          sessionStorage.setItem("nickname", res.data.nickname);
          sessionStorage.setItem("loginMethod", "naver");
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div className="wrapper">
        <div>리다이렉팅 중</div>
        <LoadingIndicator size={"5rem"} />
      </div>
    </Container>
  );
}

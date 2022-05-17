import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ModifyMyinfo from "./ModifyMyinfo";
import MyPost from "../components/mypages/MyPost";
import LikePost from "../components/mypages/LikePost";

const TabContainer = styled.div`
  display: flex;
  right: 50px;
  width: 20%;
  height: 90vh;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-top: 2em;
  margin-bottom: 2em;

  div {
    border-bottom: #c0c0c0 solid 1px;
    padding-top: 2em;
    padding-bottom: 2em;
    width: 70%;
    span {
      height: 50%;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    align-content: space-around;
    .active {
      color: #fc9f77;
    }

    * {
      margin-top: 4em;
      :hover {
        color: #fc9f77;
        cursor: pointer;
      }
    }
  }
  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
    height: max-content;
    div {
      border-bottom: #c0c0c0 solid 1px;

      width: 60%;
      span {
        height: 10%;
        width: 200%;
      }
    }

    ul {
      display: flex;
      flex-direction: column;
    }
  }
`;

const ContentsContainer = styled.div`
  display: grid;
  position: relative;
  left: 60px;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 70%;
  height: max-content;
  .modify-user {
    position: relative;
    left: 100%;
  }

  @media screen and (max-width: 500px) {
    display: grid;

    grid-template-rows: 1fr;
    grid-template-columns: 1fr;

    height: max-content;
    left: 30px;

    .modify-user {
      margin: 0px;
      position: relative;
      left: -30px;
      width: 100%;
    }
  }
`;

const MyPageContainer = styled.div`
  font-family: "Lato", sans-serif;

  display: flex;

  width: 100%;

  height: max-content;
  @media screen and (max-width: 500px) {
    height: max-content;
    width: 100%;
  }
`;

//const SignContainer = styled.div``;

function Mypage(page) {
  const navigate = useNavigate();
  const userId = window.sessionStorage.getItem("userId");
  const tabContents = ["게시글", "좋아요", "회원 정보수정"];

  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageName = [
    "/mypage/mypost",
    "/mypage/likepost",
    "/mypage/modifymyinfo",
  ];

  return (
    <MyPageContainer>
      <TabContainer className="container">
        <div>
          <span>마이페이지</span>
        </div>
        <ul>
          {tabContents.map((e, idx) => {
            return (
              <li
                key={idx}
                onClick={() => {
                  navigate(pageName[idx]);
                }}
                className={page["page"] === idx + "" ? "active" : null}
              >
                {e}
              </li>
            );
          })}
        </ul>
      </TabContainer>
      <ContentsContainer className="post-list">
        {page["page"] === "0" && <MyPost />}
        {page["page"] === "1" && <LikePost />}
        <div className="modify-user">
          {page["page"] === "2" && (
            <ModifyMyinfo
              AppuserInfo={page.userInfo}
              setAppUserInfo={page.setUserInfo}
            />
          )}
        </div>
      </ContentsContainer>
    </MyPageContainer>
  );
}

export default Mypage;

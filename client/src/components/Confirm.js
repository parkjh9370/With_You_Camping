import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 5, 12, 0.5);
  z-index: 1000;

  /* left: 3%; */
  .back-arrow {
    font-size: 20px;
    margin-left: 10px;
    margin-top: 70px;
    /* margin-bottom: 10px; */
    font-weight: 800;
    cursor: pointer;
  }
`;

const MessageBox = styled.div`
  background-color: white;
  width: 500px;
  height: 250px;
  z-index: 10;
  border-radius: 5px;

  h2 {
    text-align: center;
    margin-bottom: 3rem;
  }
  button {
    display: block;
    width: 140px;
    height: 40px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    margin: auto;
  }
  @media screen and (max-width: 500px) {
    width: 400px;
    border-radius: 10px;
  }
`;

function Confirm({ message, handleMessage }) {
  const [curMessage, setCurMessage] = useState("");
  const [btnInfo, setBtnInfo] = useState("");

  useEffect(() => {
    if (message === "userinfo_blank") {
      setCurMessage("회원가입 하려면 모든 항목을 작성 하셔야 합니다.");
      setBtnInfo("닫 기");
    } else if (message === "nickname_validate_fail") {
      setCurMessage("닉네임은 2~12자, 특수문자는 사용 불가능 합니다.");
      setBtnInfo("닫 기");
    } else if (message === "email_validate_fail") {
      setCurMessage("이메일 형식에 맞게 작성 해주세요");
      setBtnInfo("닫 기");
    } else if (message === "username_validate_fail") {
      setCurMessage("이름은 한글/영문만 사용 가능 합니다");
      setBtnInfo("닫 기");
    } else if (message === "password_validate_fail") {
      setCurMessage("비밀번호와 비밀번호 확인란이 일치하지 않습니다.");
      setBtnInfo("닫 기");
    } else if (message === "loginInfo_blank") {
      setCurMessage("이메일, 비밀번호를 입력해 주세요");
      setBtnInfo("닫 기");
    } else if (message === "signup_success") {
      setCurMessage("회원가입 완료되었습니다.");
      setBtnInfo("닫 기");
    } else if (message === "signup_failed") {
      setCurMessage("중복된 이메일이 존재합니다.");
      setBtnInfo("닫 기");
    } else if (message === "login_success") {
      setCurMessage("로그인 성공하였습니다.");
      setBtnInfo("닫 기");
    } else if (message === "login_failed") {
      setCurMessage("이메일 또는 비밀번호가 올바르지 않습니다.");
      setBtnInfo("닫 기");
    } else if (message === "login_check") {
      setCurMessage("로그인 후 사용해 주세요.");
      setBtnInfo("닫 기");
    } else if (message === "post_full_check") {
      setCurMessage("게시물의 모든 항목을 작성 해주세요");
      setBtnInfo("닫 기");
    } else if (message === "add_post_success") {
      setCurMessage("게시물 작성 되었습니다.");
      setBtnInfo("닫 기");
    } else if (message === "login_feature") {
      setCurMessage("로그인 후 사용해 주세요.");
      setBtnInfo("닫 기");
    } else if (message === "comment_full") {
      setCurMessage("댓글을 입력해 주세요");
      setBtnInfo("닫 기");
    } else if (message === "comment_post_message") {
      setCurMessage("댓글이 등록 되었습니다.");
      setBtnInfo("닫 기");
    } else if (message === "password_check_fail") {
      setCurMessage("비밀번호 확인란이 일치하지 않습니다.");
      setBtnInfo("닫 기");
    }
  }, [message]);

  const handleCancel = () => {
    handleMessage("");
  };
  return (
    <Container>
      <MessageBox>
        <div className="back-arrow">
          <h2>{curMessage}</h2>
          <button type="button" onClick={handleCancel}>
            {btnInfo}
          </button>
        </div>
      </MessageBox>
    </Container>
  );
}

export default Confirm;

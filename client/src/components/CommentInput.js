import axios from "axios";
import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
// import { setLoginModal, setMessageModal } from '../actions';
import styled from "styled-components";
import Confirm from "./Confirm";

const CommentInputArea = styled.section`
  margin: {
    top: 1rem;
    bottom: 3rem;
  }
  width: 100%;
  height: 6rem;

  textarea {
    width: 96%;
    height: 6rem;
    padding: 1rem;
    background-color: #f6f3f2;
    outline: none;
    border: none;
    border-radius: 1rem;
    resize: none;
  }
  button {
    float: right;
    display: grid;
    place-items: center;
    margin-top: 10px;
    padding-top: 0.3rem;
    width: 5rem;
    height: 2rem;
    border-radius: 10px;
    border: 0;
    outline: 0;
    cursor: pointer;
    background-color: #ccf3cb;
    /* color: #c7c4ba;  */
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.1);
    }
  }
`;

const SignContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 809;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CommentInput = ({ getCommentList, id, comments, isLogin }) => {
  const [comment, setComment] = useState("");
  //   const dispatch = useDispatch();

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const loginToken = window.sessionStorage.getItem("loginToken");

  const sendCommentToServer = () => {
    if (!isLogin) {
      setMessage("login_check");
      return;
    } else if (comment === "") {
      setMessage("comment_full");
      return;
    }
    axios
      .post(
        `${serverPath}/comments/${id}`,
        {
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setMessage("comment_post_message");
        getCommentList();
        setComment("");
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  const [message, setMessage] = useState("");

  const resetMessage = () => {
    setMessage("");
  };

  return (
    <div>
      {message ? (
        <SignContainer>
          <ModalBackdrop>
            <Confirm message={message} handleMessage={resetMessage} />
          </ModalBackdrop>
        </SignContainer>
      ) : null}

      <CommentInputArea>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력해주세요"
          maxLength="300"
        ></textarea>
        <button className="btn" onClick={sendCommentToServer}>
          등록
        </button>
      </CommentInputArea>
    </div>
  );
};

export default CommentInput;

import axios from "axios";
import React, { useState } from "react";

import styled from "styled-components";

const CommmentAreaContainer = styled.section`
  padding: 0.5rem;
  .header {
    display: flex;
    justify-content: space-between;
    .nickname {
      display: flex;
      /* margin-left: 5px; */
      font: {
        weight: 700;
        size: 1.2rem;
      }
    }
    i {
      padding-left: 0.4rem;
      cursor: pointer;
    }
  }
  .date {
    color: gray;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  .hide {
    display: none;
  }
  textarea {
    width: 100%;
    height: 4rem;
    padding: 0.5rem;
    resize: none;
    font-size: 0.8rem;
  }

  .content {
    padding-bottom: 0.8rem;
    margin-top: 10px;
    margin-bottom: 0;
    font-size: 1rem;
  }

  hr {
    margin: {
      top: 1rem;
      bottom: 1rem;
    }
  }
`;

const CommentListEntry = ({ comment, getCommentList, id }) => {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const loginToken = window.sessionStorage.getItem("loginToken");
  const userId = parseInt(window.sessionStorage.getItem("userId"));

  const commentData = comment.createdAt.slice(0, 10);

  const [isEdit, setIsEdit] = useState(false);
  const [commentValue, setCommentValue] = useState(comment.comment);

  const editComment = () => {
    axios
      .put(
        `${serverPath}/comments/${comment.id}`,
        {
          comment: commentValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginToken}`,
          },
        }
      )
      .then(() => {
        setIsEdit(false);
        getCommentList();
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  const deleteComment = () => {
    axios
      .delete(`${serverPath}/comments/${comment.id}`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      })
      .then(() => {
        getCommentList();
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  return (
    <CommmentAreaContainer>
      <div className="header">
        <div className="nickname">
          <img
            alt="profile"
            src={comment.profile}
            width="30"
            height="30"
            style={{
              borderRadius: "50%",
              marginRight: "8px",
              marginBottom: "9px",
            }}
          ></img>
          <div style={{ marginTop: "14px" }}>{comment.nickname}</div>
        </div>
        {comment.userId === userId ? (
          <React.Fragment>
            <div className={isEdit ? null : "hide"}>
              <i className="fas fa-check" onClick={editComment}></i>
              <i
                className="fas fa-times font-size"
                onClick={() => {
                  setIsEdit(false);
                  setCommentValue(comment.comment);
                }}
              ></i>
            </div>
            <div className={isEdit ? "hide" : null}>
              <i className="fas fa-edit" onClick={() => setIsEdit(true)}></i>
              <i className="fas fa-trash-alt" onClick={deleteComment}></i>
            </div>
          </React.Fragment>
        ) : null}
      </div>

      <div className="date">{commentData}</div>
      <textarea
        className={isEdit ? null : "hide"}
        type="text"
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        maxLength="300"
      ></textarea>
      <div className={isEdit ? "hide" : "content"}>{comment.comment}</div>
      {/* <hr /> */}
    </CommmentAreaContainer>
  );
};

export default CommentListEntry;

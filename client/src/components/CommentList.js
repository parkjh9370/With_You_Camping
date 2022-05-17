// import '../scss/CommentList.scss';
import React from "react";
import CommentListEntry from "./CommentListEntry";
import styled from "styled-components";

const CommentListContainer = styled.section`
  margin-bottom: 1rem;
`;

// const CommentList = ({ comments, getCommentList, userId }) => {
const CommentList = ({ getCommentList, id, comments, isLogin }) => {
  if (comments === null) {
    return <></>;
  }

  return (
    <CommentListContainer>
      {comments.map((comment, i) => (
        <CommentListEntry
          key={comment.id}
          comment={comment}
          getCommentList={getCommentList}
          id={id}
        />
      ))}
    </CommentListContainer>
  );
};

export default CommentList;

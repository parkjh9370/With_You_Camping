import React from "react";
import styled from "styled-components";
import PostListComponent from "../components/PostListComponent";

const Container = styled.section`
  margin-top: -30px;
  /* width: 1292px; */
  @media screen and (max-width: 500px) {
    height: max-content;
    width: 90%;
  }
`;

const PostList = () => {
  return (
    <Container>
      <PostListComponent />
    </Container>
  );
};

export default PostList;

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import comment from "../img/svg/comment.svg";
import Heart from "../img/svg/Heart.svg";

const Container = styled.div`
  display: grid;
  width: 320px;
  max-width: 1300px;
  height: max-content;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  margin-top: 20px;
`;

const InnerContainer = styled.div`
  position: relative;
  height: max-content;
`;

const CampingElement = styled.div`
  transition: all 300ms;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 270px;
  height: 270px;
  background: #ffffff;
  border: 3px solid #f0f0f0;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  &&:hover {
    cursor: pointer;
    transform: translateY(-10px);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.9);
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    aspect-ratio: 1 / 1;
    /* display: block; */
  }
`;

const CampingElementImg = styled.img`
  border: none;
  outline: none;
  width: 270px;
  height: 198px;
`;

const CampingElementDesignLine = styled.div`
  width: 270px;
  height: 3px;
  background-color: #f0f0f0;
`;

const CampingElementTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 270px;
  height: 80px;
`;

const CampingElementTitle = styled.p`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  color: #343434;
  margin-left: 25px;
  margin-top: 8px;
`;

const CampingElementEmojiAria = styled.div`
  display: flex;
  align-items: center;
`;

const CampingElementName = styled.p`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  color: #878395;
  margin-top: 5px;
  margin-left: 25px;
  margin-right: 40px;
`;

const CampingElementIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-left: 20px;
  margin-right: 5px;
  margin-top: 1px;
`;

const CampingElementEmojiText = styled.p`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 15px;
  color: #878395;
  margin-top: 1px;
`;

const Card = ({ post, LikePost }) => {
  const navigate = useNavigate();

  if (post) {
    return post.map((x, index) => {
      return (
        <Container key={index}>
          <InnerContainer>
            <CampingElement
              onClick={() => {
                navigate(`/post/${x.id}`);
              }}
            >
              <CampingElementImg src={x.picture} />
              <CampingElementDesignLine />
              <CampingElementTextBox>
                <CampingElementTitle>{x.title}</CampingElementTitle>
                <CampingElementEmojiAria>
                  <CampingElementName>{x.User.nickname}</CampingElementName>
                  <CampingElementIcon src={Heart} />
                  <CampingElementEmojiText>
                    {x.totalLike}
                  </CampingElementEmojiText>
                  <CampingElementIcon src={comment} />
                  <CampingElementEmojiText>
                    {x.Comments.length}
                  </CampingElementEmojiText>
                </CampingElementEmojiAria>
              </CampingElementTextBox>
            </CampingElement>
          </InnerContainer>
        </Container>
      );
    });
  } else {
    return LikePost.map((x, index) => {
      return (
        <Container key={index}>
          <InnerContainer>
            <CampingElement
              onClick={() => {
                navigate(`/post/${x.Board.id}`);
              }}
            >
              <CampingElementImg src={x.Board.picture} />
              <CampingElementDesignLine />
              <CampingElementTextBox>
                <CampingElementTitle>{x.Board.title}</CampingElementTitle>
                <CampingElementEmojiAria>
                  <CampingElementName>
                    {x.Board.User.nickname}
                  </CampingElementName>
                  <CampingElementIcon src={Heart} />
                  <CampingElementEmojiText>
                    {x.totalLike}
                  </CampingElementEmojiText>
                  <CampingElementIcon src={comment} />
                  <CampingElementEmojiText>
                    {x.Board.Comments.length}
                  </CampingElementEmojiText>
                </CampingElementEmojiAria>
              </CampingElementTextBox>
            </CampingElement>
          </InnerContainer>
        </Container>
      );
    });
  }
};

export default Card;

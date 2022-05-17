import React from "react";
import styled from "styled-components";

import image from "../img/camping.jpeg";
import image1 from "../img/camping1.jpg";
import image2 from "../img/camping2.jpg";
import image3 from "../img/camping3.jpg";
import image4 from "../img/camping4.jpg";
import image5 from "../img/campingMedia.jpg";

const Container = styled.section`
  /* font-family: "Lato", sans-serif; */
  font-family: "Stylish", sans-serif;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  /* width: 100vw; */
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid rgba(1, 0, 0, 0.5);
`;

const Picture = styled.div`
  position: absolute;
  top: -80px;
  left: 0;
  display: grid;
  place-items: center;
  width: 100%;
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 1) 100%
    ),
    url(${image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 450px;

  .wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    width: 100%;
    height: max-content;

    .intro {
      grid-column: 2 / 12;
      /* position: absolute; */
      left: 0;
      top: 0;
      display: grid;
      width: 100%;
      padding: 70px;
      box-sizing: border-box;
      font-size: 2.1rem;
      height: max-content;

      p {
        color: white;
        margin-top: 20px;
        margin-bottom: 20px;
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }

  @media screen and (max-width: 500px) {
    min-height: 300px;
    height: max-content;

    background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 60%,
        rgba(255, 255, 255, 1) 100%
      ),
      url(${image5});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    .wrapper {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;

      .intro {
        position: absolute;
        top: 0;
        grid-column: 0 / -1;
        font-size: 1.3rem;
        height: 150px;
        padding: 20px;

        p {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
`;

const InnerContainer = styled.div`
  position: relative;
  grid-column: 2 / 12;
  width: 100%;
  height: max-content;
  margin-top: 350px;

  section {
    position: relative;
    display: flex;
    align-items: center;
    height: 500px;
    width: 100%;
    .image {
      display: grid;
      place-items: center;
      width: 40%;
      height: 400px;
      img {
        height: 400px;
      }
    }

    .text {
      position: absolute;
      right: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      /* font-size: 0.8rem; */
      width: 700px;
      height: 400px;

      .wrapper {
        display: flex;
      }
      p {
        font-size: 1.8rem;

        margin-bottom: 20px;
        margin-right: 20px;
      }
    }
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    margin-top: 250px;

    section {
      display: grid;
      place-items: center;
      height: max-content;

      margin-top: 30px;

      .image {
        display: flex;
        justify-content: center;
        height: 200px;

        z-index: -1;
        img {
          width: 300px;
          height: auto;
        }
      }

      .text {
        &:first:child {
          margin-top: -20px;
        }
        position: static;
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
        height: 100px;

        .wrapper {
          display: flex;
        }

        p {
          font-size: 1rem;
        }
      }
    }
  }
`;

function Landing() {
  return (
    <Container>
      <Picture>
        <div className="wrapper">
          <div className="intro">
            {/* <p>오늘은 어디로 가볼까?</p>
            <p>지금 With You Camping</p>
            <p> 가슴 설레는</p>
            <p>캠핑 여행을 떠나보아요</p> */}
            &nbsp;
            <p>가족, 친구와 함께 떠나는 캠핑</p>
            <p>추억에 남는 캠핑 SITE</p>
            <p>지금 With You Camping 과 공유해요</p>
            <p></p>
          </div>
        </div>
      </Picture>
      <InnerContainer>
        <section>
          <div className="image">
            <img src={image1} alt="1" />
          </div>
          <div className="text first-text">
            {/* <p> 나만 알기 아쉬웠던 장소를 </p>
            <p>정확하게 공유 할 수 있어요</p> */}
            <p>캠핑지의 위치, 조건, 평점 등</p>
            <p>필요한 정보를 한 눈에 볼 수 있어요.</p>
          </div>
        </section>
        <section>
          <div className="image">
            <img src={image2} alt="2" />
          </div>
          <div className="text">
            <p> 캠핑지의 일주일 간 날씨 정보를 통해 </p>
            <p> 구체적인 캠핑 계획을 세울 수 있어요</p>
          </div>
        </section>
        <section>
          <div className="image">
            <img src={image3} alt="3" />
          </div>
          <div className="text">
            <p> 지역별 카테고리와 검색 기능을 통해</p>
            <p> 원하는 캠핑 정보를 쉽게 얻어 갈 수 있어요</p>
            <p> </p>
          </div>
        </section>
        <section>
          <div className="image">
            <img src={image4} alt="4" />
          </div>
          <div className="text">
            {/* <p> 생생한 후기와 소통을 통해 </p> */}
            <p> 등록된 게시글의 반응을 비교하고 </p>
            <p> 나에게 유용한 정보를 얻어갈 수 있어요</p>
            {/* <p> </p> */}
          </div>
        </section>
      </InnerContainer>
    </Container>
  );
}

export default Landing;

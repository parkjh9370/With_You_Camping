import React, { useState } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

const Container = styled.section`
  position: fixed;
  display: grid;
  place-items: center;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  width: 100vw;
  height: 100vh;

  z-index: 998;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 998;
`;

const Modal = styled.div`
  position: relative;
  top: -100px;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  height: 600px;
  width: 600px;

  z-index: 999;

  background-color: #fff;

  border-radius: 10px;

  h2 {
    margin-top: 30px;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  .result_length {
    position: absolute;
    top: 125px;
    left: 117px;

    font-size: 0.8rem;
    color: #555;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 85%;

  margin: 50px;

  /* background-color: #ddd; */
`;

const SearchContainer = styled.div`
  position: relative;
  background-color: #ddd;
  display: flex;
  justify-content: center;

  width: 100%;
  height: 40px;

  input {
    width: 100%;
    font-size: 1.2rem;
    padding-top: 3px;
    padding-left: 10px;
    padding-right: 80px;

    border: 1px solid #aaa;
    border-radius: 3px;

    &:focus {
      outline: 3px solid #ffd600;
      border: none;
    }

    &::placeholder {
      position: relative;
      top: -2px;
      font-size: 0.9rem;
    }
    /* border: none; */
  }

  .searchBtn {
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80px;
    height: 100%;

    cursor: pointer;
    transition: 0.05s;
    &:active {
      color: #ffd600;
      font-size: 1.1rem;
    }

    span {
      position: relative;
      top: 1px;
    }
    svg {
      margin-left: 5px;
    }
  }
`;

const PlaceContainer = styled.div`
  width: 100%;
  height: 400px;

  overflow: auto;

  &:before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;

    margin-bottom: 3px;
    background-color: #ddd;
  }
`;

const PlaceResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  width: 100%;
  height: 50px;
  padding-top: 2px;
  padding-left: 3px;

  box-sizing: border-box;

  transition: 0.15s;

  cursor: pointer;

  .place_name {
    font-size: 1.1rem;
    margin-bottom: 4px;
  }

  .address_name {
    font-size: 0.8rem;
    color: #888;
  }

  &:hover {
    background-color: #ffd600;
  }

  @keyframes up {
    0% {
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  animation: up 0.5s forwards;
  /* animation-delay : ${(props) => `0.${props.idx}s`} */
`;

const NoSearch = styled.div`
  display: grid;
  place-items: center;

  width: 100%;
  height: 400px;

  color: #888;
`;

export const PlaceSearch = ({ setLocation, closeFn }) => {
  const kakao = window.kakao;

  const [searchValue, setSearchValue] = useState("");
  const [placeData, setPlaceData] = useState([]);

  const inputHandler = (e) => {
    setSearchValue(e.target.value);

    if (e.keyCode === 13) {
      e.preventDefault();
      getPlaces();
    }
  };

  const getPlaces = () => {
    const ps = new kakao.maps.services.Places();

    const psCallback = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaceData([]);
        setPlaceData(data);
      } else setPlaceData([]);
    };

    if (searchValue) {
      ps.keywordSearch(`${searchValue}`, psCallback);
    }
  };

  const getPlaceCoords = (lat, lng) => {
    setLocation({
      latitude: lat, //위도
      longitude: lng, //경도
    });
    closeFn();
  };

  return (
    <Container>
      <Backdrop onClick={closeFn} />
      <Modal>
        <InnerContainer>
          <SearchContainer>
            <input
              spellCheck={false}
              placeholder="찾으시는 장소를 입력해주세요! 예) 경기도 캠핑장"
              onKeyDown={(e) => inputHandler(e)}
            />
            <div className="searchBtn" onClick={getPlaces}>
              <span>검색</span>
              <IoSearch />
            </div>
          </SearchContainer>
          <h2>검색결과</h2>
          <span className="result_length">
            {placeData.length
              ? `${placeData.length}개의 결과가 있습니다.`
              : null}
          </span>
          <PlaceContainer>
            {placeData.length ? (
              placeData.map((place, idx) => {
                return (
                  <PlaceResult
                    key={idx}
                    idx={idx}
                    onClick={() => getPlaceCoords(place.y, place.x)}
                  >
                    <div className="place_name"> {place.place_name}</div>
                    <div className="address_name">{place.address_name}</div>
                  </PlaceResult>
                );
              })
            ) : (
              <NoSearch>
                <p>검색 결과가 없거나 검색하지 않으셨습니다.</p>
              </NoSearch>
            )}
          </PlaceContainer>
        </InnerContainer>
      </Modal>
    </Container>
  );
};

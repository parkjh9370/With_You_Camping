import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BsGeoAltFill, BsMapFill } from "react-icons/bs";
import { FaSearchLocation, FaCommentDots } from "react-icons/fa";
import { DetailBtnComponent as Btn } from "../components/DetailBtnComponent";

import StarRating from "../components/StarRating";
import markerImg from "../img/marker.png";
import TagComponent from "../components/TagComponent";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";
import LikeComponent from "../components/LikeComponent";
import { TwoBtnModal } from "../components/TwoBtnModal";

import { useParams } from "react-router-dom";

import {
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherCloudy,
  TiWeatherSunny,
} from "react-icons/ti";
import { WiRain, WiDust } from "react-icons/wi";

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  height: max-content;
  section {
    margin-bottom: 20px;
  }
  .wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .category {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

const InnerContainer = styled.div`
  position: relative;
  grid-column: 2 / 12;
  height: max-content;
`;

const TitleContainer = styled.div`
  float: right;
  width: 45%;
  border-left-width: 5%;
  text-align: center;
  font-family: "Sriracha", cursive;
  font-size: 1.9rem;
`;

const TagContainer = styled.section`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 10px;
  font-size: 0.8rem;
  justify-content: space-between;
  width: 100%;
  min-height: 50px;
  height: max-content;
  margin-top: 50px;
  .tag_none {
    position: absolute;
    top: calc(50% - 15px);
    width: 160px;
    color: #888;
    text-align: center;
  }
`;

const ImgContainer = styled.section`
  display: grid;
  place-items: center;
  aspect-ratio: 1.5 / 1;
  width: 50%;
  /* float: left; */
  object-fit: cover;
  background: ${(props) => `url(${props.img})`};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  @media screen and (max-width: 500px) {
    aspect-ratio: 1 / 1;
  }
`;

const LocationLink = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  height: 1.5rem;
  padding: 0 6px;
  background-color: #fff;
  border-radius: 1.5rem;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
  color: #666;
  z-index: 2;
  cursor: pointer;
  .wrapper span {
    position: relative;
    top: 2px;
    font-size: 0.9rem;
  }
  .wrapper svg {
    margin-right: 5px;
  }
  transition: 0.1s;
  &:hover {
    background-color: #ffd600;
    color: #000;
  }
`;

const DescContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 50px;
  max-height: 500px;
  box-sizing: border-box;
  font-family: sans-serif;
  .title_wrapper {
    color: #333;
    font-size: 1.4rem;
    display: flex;
    margin-top: 80px;
    margin-bottom: 10px;
    svg {
      position: relative;
      top: -2px;
      margin-right: 5px;
      color: #333;
    }
    .nickname {
      font-size: 1.2rem;
    }
    .createdAt {
      font-size: 0.7rem;
    }
  }
  pre {
    min-height: 20px;
    padding: 10px;
    border-left: 3px solid #27dbb7;
    border-radius: 3px;
    white-space: pre-wrap;
    line-height: 1.4rem;
    margin-top: 15px;
    font-size: 1.2rem;
  }
`;

const MapContainer = styled.section`
  .title_wrapper {
    color: #333;
    display: flex;
    margin-top: 80px;
    margin-bottom: 10px;
    font-size: 1.2rem;
    svg {
      position: relative;
      top: -2px;
      margin-right: 5px;
      color: #333;
    }
  }
`;
const KakaoMap = styled.section`
  width: 70%;
  aspect-ratio: 2 / 1;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  @media screen and (max-width: 500px) {
    height: 150px;
  }
`;

const CommentContainer = styled.section`
  width: 100%;
  min-height: 300px;
  height: max-content;
  .title_wrapper {
    color: #333;
    display: flex;
    margin-top: 80px;
    margin-bottom: 10px;
    font-size: 1.2rem;
    svg {
      position: relative;
      top: -2px;
      margin-right: 5px;
      color: #333;
    }
  }
  @media screen and (max-width: 500px) {
    .title_wrapper {
      margin-bottom: 0px;
    }
  }
`;

const WeatherContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 50px;
  max-height: 500px;
  box-sizing: border-box;
  font-family: sans-serif;
  .title_wrapper {
    color: #333;
    display: flex;
    margin-top: 80px;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
  @media screen and (max-width: 500px) {
    .title_wrapper {
      margin-bottom: 0px;
    }
  }
`;

const ShowWeather = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  color: #192b4d;
  font-family: sans-serif;
  @media screen and (max-width: 500px) {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    width: 20%;
  }
`;

const ModifyBtnContainer = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: space-between;
`;

const ProfileContainer = styled.div`
  margin-top: -8px;
  margin-right: 6px;
`;

export default function DetailPost({ isLogin, userInfo }) {
  const kakao = window.kakao;

  const navigate = useNavigate();

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const loginToken = window.sessionStorage.getItem("loginToken");
  const userId = parseInt(window.sessionStorage.getItem("userId"));
  const weatherAppID = process.env.REACT_APP_WEATHER_ID;

  const [weather, setWeather] = useState([]);

  const { id } = useParams();

  // 게시글 정보
  const [postData, setPostData] = useState({});
  // 게시글 별점
  const [postRating, setPostRating] = useState(0);
  // 게시글 작성 시간
  const [boardCreated, setBoardCreated] = useState("");
  // 게시글 태그 정보
  const [postTagData, setPostTagData] = useState([]);
  // 게시글 위치 정보
  const [postMapData, setPostMapData] = useState({});

  //const [isLoading, setIsLoading] = useState(false);

  const [coords, setCoords] = useState([]);

  const [showOnMap, setShowOnMap] = useState(false);

  // 상세 페이지 데이터 세팅
  useEffect(() => {
    window.scrollTo(0, 0);
    getPostDetail();
    getCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords.latitude, coords.roadAdd]);

  async function getWeather() {
    const params = {
      lon: coords.longitude,
      lat: coords.latitude,
      exclude: "minutely,hourly",
      appid: weatherAppID,
    };
    await axios
      .get("https://api.openweathermap.org/data/2.5/onecall", { params })
      .then((res) => {
        const data = res.data;
        setWeather(data.daily.slice(0, 7));
      });
  }

  useEffect(() => {
    setCoords({
      latitude: postMapData.latitude,
      longitude: postMapData.longtitude,
      roadAdd: postMapData.roadAdd,
    });
  }, [postMapData]);

  function show(item) {
    if (item === "Clouds") {
      return <TiWeatherCloudy size={"4rem"} color={"#1E90FF"} />;
    } else if (item === "Rain") {
      return <WiRain size={"4rem"} color={"#2F4F4F"} />;
    } else if (item === "Snow") {
      return <TiWeatherSnow size={"4rem"} color={"#87CEEB"} />;
    } else if (item === "Thunderstorm") {
      return <TiWeatherStormy size={"4rem"} color={"#000000"} />;
      // return <img src={image2} width="70%" />;
    } else if (item === "Drizzle") {
      return <TiWeatherShower size={"4rem"} color={"#696969"} />;
    } else if (item === "Atmosphere") {
      return <WiDust size={"4rem"} color={"#708090"} />;
    } else {
      return <TiWeatherSunny size={"4rem"} color={"#FF6347"} />;
    }
  }

  async function getPostDetail() {
    await axios
      .get(`${serverPath}/boards/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setPostData(res.data.board);
          setBoardCreated(res.data.board.createdAt.slice(0, 10));
          setPostRating(res.data.board.rating);
          setPostTagData([
            `${res.data.boardData.area}`,
            `인터넷 ${res.data.boardData.wifi}`,
            `주차장 ${res.data.boardData.parking}`,
            `전기사용 ${res.data.boardData.electricity}`,
            `화장실 ${res.data.boardData.toiletType}`,
          ]);
          setPostMapData(res.data.locate);
        }
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  const kakaoMap = useRef();

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      const imageSrc = markerImg, // 마커이미지 주소
        imageSize = new kakao.maps.Size(50, 45), // 마커이미지 크기
        imageOption = { offset: new kakao.maps.Point(13, 38) };

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(coords.latitude, coords.longitude),
        image: markerImage,
      });

      const staticMapContainer = kakaoMap.current, // 이미지 지도를 표시할 div
        staticMapOption = {
          center: new kakao.maps.LatLng(coords.latitude, coords.longitude), // 이미지 지도의 중심좌표
          level: 3, // 이미지 지도의 확대 레벨
        };

      const map = new kakao.maps.Map(staticMapContainer, staticMapOption);
      map.setDraggable(false);
      map.setZoomable(false);

      marker.setMap(map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords]);

  const openKakaoMap = () => {
    const address = coords.roadAdd ? coords.roadAdd : coords.lotAdd;
    window.open(
      `https://map.kakao.com/link/map/${address},${coords.latitude},${coords.longitude}`
    );
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const modalHandler = (modal) => {
    if (modal === "delete") {
      openDeleteModal ? setOpenDeleteModal(false) : setOpenDeleteModal(true);
    }
  };

  const deletePost = async () => {
    try {
      const res = await axios.delete(`${serverPath}/boards/${id}`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      if (res.status === 200) {
        navigate("/posts");
      }
    } catch (err) {
      // err
    }
  };

  const navigateToModify = () => {
    navigate("modify");
  };

  const [comments, setComments] = useState([]);

  const getCommentList = () => {
    axios
      .get(`${serverPath}/comments/${id}`)
      .then((res) => {
        setComments(res.data.comment);
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  return (
    <Container>
      {openDeleteModal ? (
        <TwoBtnModal
          main={"정말로 게시글을 삭제하시겠습니까?"}
          close={() => modalHandler("delete")}
          action={deletePost}
        />
      ) : null}
      <InnerContainer>
        <TitleContainer>
          <LikeComponent userId={userId} id={id} isLogin={isLogin} />
          <div className="title">{postData.title}</div>
          <div className="wrapper">
            <TagContainer>
              {postTagData.length ? (
                postTagData.map((tag, idx) => (
                  <TagComponent key={idx}>{tag}</TagComponent>
                ))
              ) : (
                <p className="tag_none">설정된 태그가 없습니다.</p>
              )}
            </TagContainer>
          </div>
          <StarRating postRating={postRating} />
        </TitleContainer>
        <ImgContainer img={postData.picture}></ImgContainer>

        <DescContainer>
          <div className="title_wrapper">
            <ProfileContainer>
              <img
                alt="profile"
                src={postData.profile}
                width="32"
                style={{ borderRadius: "50%" }}
              />
            </ProfileContainer>
            <h3 className="nickname"> {postData.nickname} 님의 게시글</h3>
          </div>
          <hr />
          <div className="createdAt"> ({boardCreated}) </div>
          <pre>{postData.content}</pre>
        </DescContainer>

        <MapContainer>
          <div className="title_wrapper">
            <BsGeoAltFill />
            <h3>캠핑 장소</h3>
          </div>
          <hr />
          <KakaoMap ref={kakaoMap}>
            <LocationLink
              onClick={openKakaoMap}
              onMouseOver={() => setShowOnMap(true)}
              onMouseLeave={() => setShowOnMap(false)}
            >
              {showOnMap ? (
                <div className="wrapper">
                  <BsMapFill />
                  <span>카카오 지도로 이동하기</span>
                </div>
              ) : (
                <div className="wrapper">
                  <BsGeoAltFill />
                  <span>{coords.roadAdd ? coords.roadAdd : coords.lotAdd}</span>
                </div>
              )}
            </LocationLink>
          </KakaoMap>
        </MapContainer>

        <WeatherContainer>
          <div className="title_wrapper">
            <FaSearchLocation />
            <h3 className="nickname">이 지역의 날씨는?</h3>
            &nbsp; &nbsp;
            <span style={{ fontSize: "1.1rem" }}> {postMapData.lotAdd}</span>
          </div>
          <hr />
          <ShowWeather>
            <>
              {weather.map((item, i) => (
                <div key={i}>
                  <div>
                    <div
                      style={{
                        fontSize: "medium",
                        margin: "12px 15px",
                      }}
                    >
                      {new Date(weather[i].dt * 1000).toLocaleDateString(
                        "ko-KR",
                        { weekday: "long" }
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        margin: "12px 23px",
                      }}
                    >
                      {new Date(weather[i].dt * 1000) //년도 빼고 월 일만 짤라준다
                        .toLocaleDateString("ko-KR")
                        .slice(6, -1)}
                    </div>
                    <div style={{ margin: "10px 3% 10px", height: "70px" }}>
                      {show(item.weather[0].main)}
                    </div>
                    <div style={{ fontSize: "15px", margin: "9px 8px" }}>
                      <span style={{ color: "#4169E1" }}>
                        {Math.floor(weather[i].temp.min - 273.15)}℃
                      </span>
                      &nbsp;/&nbsp;
                      <span style={{ color: "#DC143C" }}>
                        {Math.floor(weather[i].temp.max - 273.15)}℃
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          </ShowWeather>
        </WeatherContainer>

        <CommentContainer>
          <div className="title_wrapper">
            <FaCommentDots />
            <h3>댓글</h3>
          </div>
          <hr />
          <CommentList
            getCommentList={getCommentList}
            id={id}
            comments={comments}
            isLogin={isLogin}
          />
          <CommentInput
            getCommentList={getCommentList}
            userId={userId}
            id={id}
            comments={comments}
            isLogin={isLogin}
          />
        </CommentContainer>

        {postData.userId === userId ? (
          <ModifyBtnContainer>
            <Btn
              width={"100%"}
              color={"#ddd"}
              hover={"#bde0bc"}
              action={navigateToModify}
            >
              수정하기
            </Btn>
            <Btn
              width={"100%"}
              color={"#ddd"}
              hover={"#e99358"}
              action={() => modalHandler("delete")}
            >
              삭제하기
            </Btn>
          </ModifyBtnContainer>
        ) : null}
      </InnerContainer>
    </Container>
  );
}

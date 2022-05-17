import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { BsCameraFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { IoLocateSharp as LocationPin, IoSearch } from "react-icons/io5";

import { PageTitle } from "../components/pageTitle";

import { LoadingIndicator } from "../components/loadingIndicator";
import { AddBtnComponent as Btn } from "../components/AddBtnComponent";
import { PlaceSearch } from "../modals/placeSearch";
import Checkinfo from "../components/Checkinfo";
import StarRatingCheck from "../components/StarRatingCheck";
import Confirm from "../components/Confirm";

import markerImg from "../img/marker.png";

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  width: 1200px;
  height: max-content;

  section {
    margin-bottom: 20px;
  }

  .category {
    font-size: 1.4rem;
    margin-top: 50px;
    margin-bottom: 5px;
  }

  .position {
    font-size: 1rem;
    margin-bottom: 20px;
    justify-content: space-between;
  }

  input,
  textarea {
    border-radius: 3px;
    border: 1px solid #aaa;
  }
`;

const InnerContainer = styled.div`
  grid-column: 2 / 12;
  height: max-content;
`;

const UploadImageBox = styled.section`
  display: grid;
  place-items: center;

  width: calc(35% - 5px);
  aspect-ratio: 2 / 1.5;

  background-color: ${(props) => (props.img ? "#000" : "#fff")};
  background-image: ${(props) => (props.img ? `url(${props.img})` : null)};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);

  border-radius: 10px;

  transition: 0.2s;

  color: #aaa;

  &:hover {
    background-color: ${(props) => (props.img ? "#000" : "#FFEA7C")};
    color: #555;
  }

  .click_for_upload {
    text-align: center;

    user-select: none;

    svg {
      font-size: 3rem;
    }
  }
  cursor: pointer;

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const KakaoMapBox = styled.section`
  /* width: calc(50% - 5px); */
  width: 70%;
  aspect-ratio: 1.5 / 1;
  background-color: #aaa;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);

  border-radius: 10px;

  @media screen and (max-width: 500px) {
    width: 100%;
    aspect-ratio: 1.5 / 1;
  }
`;

const BtnOnMap = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  width: max-content;
  height: 1.5rem;
  padding: 0 6px;

  /* background-color: #ffd600; */
  background-color: #f5deb3;
  border-radius: 1.5rem;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.5);

  color: #000;

  z-index: 2;

  cursor: pointer;

  span {
    position: relative;
    top: 1px;

    font-size: 0.9rem;
  }

  svg {
    margin-left: 5px;
  }

  transition: 0.1s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
  }
`;
const MyLocationBtn = styled(BtnOnMap)`
  top: 17px;
  right: 17px;
`;

const LocationSearchBtn = styled(BtnOnMap)`
  bottom: 17px;
  right: 17px;
`;

const TitleContainer = styled.section`
  input {
    width: 100%;
    height: 35px;

    box-sizing: border-box;

    padding-left: 10px;
    font-size: 1.2rem;

    outline: none;
    &:focus {
      /* outline: 3px solid #FFD600; */
      outline: 3px solid #a7aaad;
      border: #ffd600;
    }
  }
`;

const DescContainer = styled.section`
  textarea {
    width: 100%;
    min-height: 300px;
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 30px;
    font-family: sans-serif;
    font-size: 1.1rem;

    resize: none;
    overflow: hidden;

    &:focus {
      outline: 3px solid #a7aaad;
      border: #a7aaad;
    }
  }
`;

const BtnContainer = styled.section`
  height: 100px;

  .requires_wrapper {
    position: relative;
    height: 32px;

    .requires {
      position: absolute;
      right: 0;
      display: flex;

      svg {
        position: relative;
        top: 2px;

        margin-left: 4px;
      }

      .msg {
        margin-left: 10px;
        svg {
          color: #91d92e;
        }
      }
      .msg.check {
        svg {
          color: #ff796b;
        }
      }
    }
  }
`;

const OuterCheckContainer = styled.section`
  /* width: 100%; */
  h3 {
    font-size: 1rem;
    margin-top: 17px;
    margin-bottom: 7px;
  }
`;

const StarCheckContainer = styled.div`
  margin-top: 20px;
  height: 20px;
  font-size: 2rem;
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

function ModifyPost() {
  const navigate = useNavigate();

  const kakao = window.kakao;
  // const daum = window.daum

  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const accessToken = window.sessionStorage.getItem("loginToken");
  const userId = parseInt(window.sessionStorage.getItem("userId"));
  const { id } = useParams();

  // 모든 항목 작성했는지 체크
  const [isFull, setIsFull] = useState(false);

  // 제목
  const [title, setTitle] = useState("");

  // 내용
  const [content, setContent] = useState("");

  // 이미지 url
  const [imgHostUrl, setImgHostUrl] = useState("");

  const [nowCheckDetail, setNowCheckDeatail] = useState(null);
  // 게시물 세부 사항 체크
  const [checkDetail, setCheckDetail] = useState({
    area: null,
    internet: null,
    parking: null,
    electronic: null,
    toilet: null,
  });

  // 평가
  const [checkRating, setCheckRating] = useState(0);

  // 카카오 위치 정보
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState([]);

  // 이미지 로딩
  const [isUploading, setIsUploading] = useState(false);
  // 위치 찾기 로딩
  const [isLoadingMyLocation, setIsLoadingMyLocation] = useState(false);

  const [message, setMessage] = useState("");

  const [openSearchModal, setOpenSearchModal] = useState(false);

  const imgInput = useRef();
  const kakaoMap = useRef();
  const descArea = useRef();
  // 이미지 업로드 및 사진 미리보기

  useEffect(() => {
    (async () => {
      const res = await axios.get(`${serverPath}/boards/${id}`);

      if (res.status === 200) {
        if (res.data.board.userId !== userId) {
          navigate("/posts");
        }
        const { board, locate } = res.data;
        setTitle(board.title);
        setContent(board.content);
        setImgHostUrl(board.picture);
        setLocation({
          latitude: locate.latitude,
          longitude: locate.longtitude,
        });
        setCheckRating(board.rating);
        // setNowCheckDeatail({
        //   area: boardData.area,
        //   internet: boardData.wifi,
        //   parking: boardData.parking,
        //   electronic: boardData.electricity,
        //   toilet: boardData.toiletType,
        // });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadImage = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file", img);

    const res = await axios.post(`${serverPath}/boards/img`, formData);
    setImgHostUrl(res.data.location);
  };

  // 업로드 시 로딩 표현
  useEffect(() => {
    setTimeout(() => {
      setIsUploading(false);
    }, 900);
  }, [imgHostUrl]);

  // 상태에 따라 로딩 이미지 상태 변경
  const ImageContainer = () => {
    if (isUploading) {
      return <LoadingIndicator size="7rem" />;
    }
    if (!isUploading && !imgHostUrl) {
      return (
        <div className="click_for_upload">
          <BsCameraFill />
          <p>클릭하여 이미지 업로드</p>
        </div>
      );
    }
    if (imgHostUrl) {
      return null;
    }
  };

  // 카카오 지도 API 사용
  useEffect(() => {
    const container = kakaoMap.current;
    let options = {
      center: new kakao.maps.LatLng(37.5666805, 126.9784147), //지도의 중심좌표, 추후에 위치 지정하기.
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    const imageSrc = markerImg, // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(50, 45), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(25, 38) };

    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    const marker = new kakao.maps.Marker({ image: markerImage });

    marker.setMap(map);

    // 현재 위치가 있는 경우 해당 위치에 마커를 표시한다.
    if (location) {
      marker.setPosition(
        new kakao.maps.LatLng(location.latitude, location.longitude)
      );
      const latlng = marker.getPosition(); // 이동한 좌표
      map.setCenter(latlng);
    }

    kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      let latlng = mouseEvent.latLng;
      marker.setPosition(latlng); // 클릭한 좌표

      setLocation({
        latitude: latlng.getLat(), //위도
        longitude: latlng.getLng(), //경도
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // location 상태가 바뀔 때
  useEffect(() => {
    let geocoder = new kakao.maps.services.Geocoder();
    if (location) {
      geocoder.coord2Address(
        location.longitude,
        location.latitude,
        (result, status) => {
          if (
            status === kakao.maps.services.Status.OK &&
            result[0].road_address
          ) {
            setAddress({
              roadAdd: result[0].road_address.address_name, // 도로명 주소
              lotAdd: result[0].address.address_name, // 지번 주소
            });
          } else {
            setAddress({
              roadAdd: null,
              lotAdd: result[0].address.address_name,
              // 도로명 주소는 없을 수 있으므로, 도로명 주소가 없다면 null 을 전달한다.
            });
          }
        }
      );
    }
  }, [kakao.maps.services.Geocoder, kakao.maps.services.Status.OK, location]);

  // 내 위치 가져오기
  const getMyLocation = () => {
    setIsLoadingMyLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoadingMyLocation(false);
        }
      });
    } else {
      setIsLoadingMyLocation(false);
      // 모달 상태
    }
  };

  // 내용 편집 시 크기 리사이징
  const autoResizing = () => {
    const textarea = descArea.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  // 모든 항목이 채워졌는지 체크
  useEffect(() => {
    if (
      title &&
      content &&
      imgHostUrl &&
      location &&
      checkDetail.toilet &&
      checkRating > 0
    ) {
      setIsFull(true);
    }
  }, [title, content, imgHostUrl, location, checkDetail, checkRating]);

  const modifyPost = async () => {
    if (isFull) {
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const body = {
        title: title,
        content: content,
        picture: imgHostUrl,
        location: {
          // 위도
          latitude: location.latitude,
          // 경도
          longitude: location.longitude,
          // 도로명 주소
          roadAdd: address.roadAdd,
          // 지번 주소
          lotAdd: address.lotAdd,
        },
        siteInfo: checkDetail,
        rating: checkRating,
      };

      try {
        const res = await axios.put(
          `${serverPath}/boards/${id}`,
          body,
          headers
        );
        if (res.status === 200) {
          navigate(`/post/${id}`);
        }
      } catch (err) {
        //err
      }
    } else {
      setMessage("post_full_check");
    }
  };

  const resetMessage = () => {
    setMessage("");
  };

  const modalHandler = (modal) => {
    if (modal === "search") {
      openSearchModal ? setOpenSearchModal(false) : setOpenSearchModal(true);
    }
  };

  return (
    <Container>
      {message ? (
        <SignContainer>
          <ModalBackdrop>
            <Confirm message={message} handleMessage={resetMessage} />
          </ModalBackdrop>
        </SignContainer>
      ) : null}
      {openSearchModal ? (
        <PlaceSearch
          setLocation={setLocation}
          closeFn={() => modalHandler("search")}
        />
      ) : null}
      <InnerContainer>
        <PageTitle>게시글 수정</PageTitle>

        <TitleContainer>
          <h3 className="category">제목</h3>
          <input
            type="text"
            spellCheck={false}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </TitleContainer>

        <DescContainer>
          <h3 className="category">내용</h3>
          <textarea
            ref={descArea}
            onKeyUp={autoResizing}
            spellCheck={false}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        </DescContainer>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={imgInput}
          id="img"
          onChange={uploadImage}
        />
        <h3 className="category">사진 등록</h3>
        <UploadImageBox
          onClick={() => imgInput.current.click()}
          img={imgHostUrl}
        >
          <ImageContainer />
        </UploadImageBox>
        {/* <BoxContianer> */}
        <h3 className="category">위치 등록</h3>
        <KakaoMapBox ref={kakaoMap}>
          <MyLocationBtn onClick={getMyLocation}>
            <span>
              {isLoadingMyLocation ? "위치를 가져오는 중..." : "내 위치"}
            </span>
            <LocationPin />
          </MyLocationBtn>
          <LocationSearchBtn onClick={() => modalHandler("search")}>
            <span>주소로 검색하기</span>
            <IoSearch />
          </LocationSearchBtn>
        </KakaoMapBox>
        <h4 className="position">
          <GiCheckMark /> 현재 등록된 위치가 맞으신가요?
          <span style={{ textDecoration: "underline" }}>{address.lotAdd}</span>
        </h4>

        <OuterCheckContainer>
          <h3 className="category">추가 정보</h3>
          <Checkinfo
            nowCheckDetail={nowCheckDetail}
            checkDetail={checkDetail}
            setCheckDetail={setCheckDetail}
            setNowCheckDeatail={setNowCheckDeatail}
          />
        </OuterCheckContainer>

        <h3 className="category"> 캠핑장 어떠셨나요? </h3>
        <StarCheckContainer>
          <StarRatingCheck
            checkRating={checkRating}
            setCheckRating={setCheckRating}
          />
        </StarCheckContainer>

        <BtnContainer>
          <Btn action={modifyPost} width={"100%"}>
            게시물 수정하기
          </Btn>
        </BtnContainer>
      </InnerContainer>
    </Container>
  );
}
export default ModifyPost;

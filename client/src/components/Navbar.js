import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import { TwoBtnModal } from "./TwoBtnModal";
import Confirm from "./Confirm";
import image3 from "../img/15logo.jpg";

import { BsList } from "react-icons/bs";

const Container = styled.header`
  font-family: "Comforter", cursive;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;

  height: 50px;
  margin: 20px;
  font-size: 1rem;

  .menu_hamburger {
    display: none;
  }

  @media screen and (max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;

    .normal-btn {
      display: none;
    }
    .menu_hamburger {
      display: block;
      margin-left: 130px;
      cursor: pointer;
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

const Logo = styled.div`
  font-family: "Stylish", sans-serif;
  font-size: 4.3rem;

  text-align: center;
  cursor: pointer;
  img {
    margin-top: 25px;
    margin-right: 0px;
    margin-left: 100px;
    height: 70px;
    width: 200px;
    object-fit: contain;
    /* float: left; */
  }

  @media screen and (max-width: 500px) {
    margin-left: -20px;
  }
`;

const Page = styled.div`
  display: flex;
`;

const Div = styled.div`
  margin: 40px 30px;

  cursor: pointer;
  &:hover {
    color: red;
  }
  @media screen and (max-width: 500px) {
    margin: 0px;
  }
`;

const ImgDiv = styled.div`
  margin-top: 33px;
  right: 100%;
  margin-right: -20px;
  border-radius: 50%;
  /* margin: 40px 5px; */
  cursor: pointer;

  @media screen and (max-width: 500px) {
    margin-top: -10px;
    margin-left: -20px;
  }
`;

const UserDiv = styled.div`
  margin: 42px 30px;
  font-family: "Malgun Gothic";
  font-size: 80%;
  color: #c428bf;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    margin: 0px;
    margin-top: -20px;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 0.7rem;
  }
`;

const HamburgurSelect = styled.section`
  @media screen and (max-width: 500px) {
    text-align: center;
    position: absolute;
    top: 49px;
    right: 40px;
    display: grid;
    width: 30%;
    margin: 0px;

    height: max-content;

    grid-row-gap: 30px;

    box-sizing: border-box;
    padding: 20px;
    border-radius: 30px 10px;
    background-color: rgba(167, 251, 211, 0.7);

    font-size: 1rem;
    z-index: 800;
    .category {
      display: grid;
      grid-row-gap: 20px;
    }
  }
`;

function Navber({ isLogin, setIsLogin, userInfo, setUserInfo }) {
  const [openModal, setOpenModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openTwoBtnModal, setOpenTwoBtnModal] = useState(false);
  // 회원가입 완료시 모달
  const [confirmSignupModal, setConfirmSignupModal] = useState(false);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  // 메세지 모달
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const modalHandler = (modal) => {
    openModal ? setOpenModal(false) : setOpenModal(true);

    if (modal === "login") {
      openLoginModal ? setOpenLoginModal(false) : setOpenLoginModal(true);
    } else if (modal === "signup") {
      openSignupModal ? setOpenSignupModal(false) : setOpenSignupModal(true);
    } else if (modal === "logout") {
      openTwoBtnModal ? setOpenTwoBtnModal(false) : setOpenTwoBtnModal(true);
    }
    setHamburgerMenu(false);
  };

  const HamburgerMenuClick = () => {
    hamburgerMenu ? setHamburgerMenu(false) : setHamburgerMenu(true);
  };

  // const [newNickname, setNewNickname] = useState("");

  // 로그아웃 시 실행
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const confirmLoginModal = () => {
    setMessage("login_check");
    setHamburgerMenu(false);
  };

  const navigateClick = () => {
    setHamburgerMenu(false);
    navigate("/mypage/mypost");
  };

  const resetMessage = () => {
    setMessage("");
  };

  return (
    <div>
      {/* 로그인 X, 게시물 작성 버튼 클릭 시 모달 */}
      {message ? (
        <SignContainer>
          <ModalBackdrop>
            <Confirm message={message} handleMessage={resetMessage} />
          </ModalBackdrop>
        </SignContainer>
      ) : null}
      {/* 로그아웃 확인 모달 */}
      {openTwoBtnModal ? (
        <TwoBtnModal
          main={"로그아웃 하시겠습니까?"}
          close={() => modalHandler("logout")}
          action={() => handleLogout()}
          navigate={"/"}
        />
      ) : null}
      {openLoginModal ? (
        <LoginModal
          closeFn={() => modalHandler("login")}
          setOpenLoginModal={setOpenLoginModal}
          setOpenSignupModal={setOpenSignupModal}
          confirmSignupModal={confirmSignupModal}
          setConfirmSignupModal={setConfirmSignupModal}
        />
      ) : null}
      {openSignupModal ? (
        <SignupModal
          closeFn={() => modalHandler("signup")}
          setOpenLoginModal={setOpenLoginModal}
          setOpenSignupModal={setOpenSignupModal}
          setConfirmSignupModal={setConfirmSignupModal}
        />
      ) : null}
      <Container>
        <Logo onClick={() => navigate("/")}>
          <img
            src={image3}
            alt="logo3"
            style={{ margin: "20px 20px 0px 0px" }}
          />
        </Logo>

        <BsList
          className="menu_hamburger"
          size={"2.5rem"}
          onClick={HamburgerMenuClick}
        />

        {isLogin ? (
          <Page className="normal-btn">
            <Div>
              <NavLink
                to="/posts"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                게시물 목록
              </NavLink>
            </Div>
            <Div>
              <NavLink
                to="/add_post"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                게시물 작성
              </NavLink>
            </Div>
            <Div>
              <NavLink
                to="/mypage/mypost"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                마이페이지
              </NavLink>
            </Div>

            <Div>
              <div className="logout" onClick={() => modalHandler("logout")}>
                로그아웃
              </div>
            </Div>
            <ImgDiv>
              <img
                alt="profile"
                src={userInfo.profile}
                width="32"
                height="32"
                style={{ borderRadius: "50%", objectFit: "cover" }}
                onClick={() => navigate("/mypage/mypost")}
              />
            </ImgDiv>

            <UserDiv className="user-profile" style={{}}>
              {userInfo.nickname} 님 안녕하세요
            </UserDiv>
          </Page>
        ) : (
          <Page className="normal-btn">
            <Div>
              <NavLink
                to="/posts"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                게시물 목록
              </NavLink>
            </Div>
            <Div onClick={confirmLoginModal}>게시물 작성</Div>
            <Div
              className="login"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => modalHandler("login")}
            >
              로그인
            </Div>
          </Page>
        )}
        {hamburgerMenu && (
          <HamburgurSelect>
            {isLogin ? (
              <React.Fragment>
                <NavLink
                  to="/posts"
                  onClick={HamburgerMenuClick}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  게시글 목록
                </NavLink>
                <NavLink
                  to="/add_post"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={HamburgerMenuClick}
                >
                  게시물 작성
                </NavLink>
                <NavLink
                  to="/mypage/mypost"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={HamburgerMenuClick}
                >
                  마이페이지
                </NavLink>
                <div className="logout" onClick={() => modalHandler("logout")}>
                  로그아웃
                </div>
                <ImgDiv>
                  <img
                    alt="profile"
                    src={userInfo.profile}
                    width="32"
                    height="32"
                    style={{ borderRadius: "50%" }}
                    onClick={navigateClick}
                  />
                </ImgDiv>
                <UserDiv className="user-profile" style={{}}>
                  {userInfo.nickname} 님 안녕하세요
                </UserDiv>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink
                  to="/posts"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={HamburgerMenuClick}
                >
                  게시글 목록
                </NavLink>
                <Div onClick={confirmLoginModal}>게시물 작성</Div>
                <Div
                  className="login"
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => modalHandler("login")}
                >
                  로그인
                </Div>
              </React.Fragment>
            )}
          </HamburgurSelect>
        )}
      </Container>
    </div>
  );
}

export default Navber;

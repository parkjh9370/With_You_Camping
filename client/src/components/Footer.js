import React from "react";
import styled from "styled-components";
import { DiGithubBadge } from "react-icons/di";
// import { AiFillGithub } from "react-icons/ai";
import image from "../img/logo3.jpg";

const Container = styled.div`
  .footer {
    margin-top: -100px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 4rem;
    max-width: 800px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .footer div {
    display: flex;
    flex-flow: column nowrap;
  }
  .footer div .bold-text {
    font-weight: 500;
    margin-bottom: 2rem;
  }
  .footer .logo-full {
    font-family: "Stylish", sans-serif;
    font-size: 4rem;
    width: 8rem;
    height: 100%;
    bject-fit: contain;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .footer .front {
    margin-top: 0px;
    margin-bottom: 1rem;
  }
  .footer .full {
    display: flex;
    flex-flow: row;
    margin-top: rem;
    margin-bottom: 1rem;
  }
  .footer .front a {
    margin-top: 0.5rem;
  }
  .footer .full a {
    margin-right: 1rem;
  }

  a {
    text-decoration: none;
    color: black;
    margin-top: 0.5rem;
  }

  @media screen and (max-width: 500px) {
    .footer {
      dipslay: flex;
      position: relative;
      right: 30px;
      width: 100%;
    }
    .logo-full {
      margin: 0px;
      display: none;
      position: relative;
      left: 40px;
      width: 100%;
    }
  }
`;
const Copyright = styled.div`
  display: grid;
  justify-content: center;
  margin-bottom: 30px;
  font-weight: lighter;
  font-size: 0.8rem;
`;
const curruntYear = () => {
  const date = new Date();
  const year = date.getFullYear();

  return year;
};

const GithubIcon = () => {
  return <DiGithubBadge size={"1rem"} style={{ margin: "0px 0px 0px 0px" }} />;
  //   return <AiFillGithub size={"1rem"} />;
};

function Footer() {
  return (
    <Container>
      <div className="footer">
        <div className="logo-full">
          <img src={image} alt="logo" style={{ margin: "-10px 0px 0px 0px" }} />
        </div>
        <div className="contact">
          <p className="bold-text"></p>
        </div>
        <div className="about-us">
          <p
            className="bold-text"
            style={{ fontSize: "80%", margin: "0px 10px 25px 0px" }}
          >
            ABOUT US
          </p>

          <a
            href="https://github.com/codestates/With_You_Camping/tree/main"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: "80%" }}
          >
            Repository
          </a>
          <a
            href="https://github.com/codestates/With_You_Camping/wiki"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: "80%" }}
          >
            Wiki
          </a>
        </div>
        <div className="team-members">
          <p
            className="bold-text"
            style={{ fontSize: "80%", margin: "0px 10px 35px 0px" }}
          >
            TEAM MEMBERS
          </p>
          <div style={{ fontSize: "80%" }}>Front-End</div>
          <div
            className="front"
            style={{ fontSize: "80%", margin: "5px 0px 20px 0px" }}
          >
            <span>
              오일중
              <a
                href="https://github.com/happy8131"
                target="_blank"
                rel="noreferrer"
                style={{ margin: "10px 0px 0px 7px" }}
              >
                <GithubIcon />
              </a>
            </span>
          </div>
          <div style={{ fontSize: "80%" }}>Full-Stack</div>
          <div
            className="full"
            style={{ fontSize: "80%", margin: "10px 0px 0px 0px" }}
          >
            박재현
            <span style={{ margin: "-3px 0px 0px 7px" }}>
              <a
                href="https://github.com/parkjh9370"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />
              </a>
            </span>
          </div>
          <div
            className="full"
            style={{ fontSize: "80%", margin: "10px 0px 0px 0px" }}
          >
            이은주
            <span style={{ margin: "-2px 0px 0px 7px" }}>
              <a
                href="https://github.com/adrienne20"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon />
              </a>
            </span>
          </div>
        </div>
      </div>
      <Copyright>
        <div className="copy">
          Copyright © {curruntYear()} WYC All rights reserved
        </div>
      </Copyright>
    </Container>
  );
}
export default Footer;

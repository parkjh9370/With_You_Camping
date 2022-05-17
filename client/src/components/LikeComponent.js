import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Confirm from "./Confirm";

const LikeButton = styled.div`
  text-align: right;
  margin-bottom: 50px;
  font-size: 1.7rem;
  .fas {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.1);
      /* background-color: ${(props) =>
        props.hover ? `${props.hover}` : null}; */
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

// post, isLogin, userId, history
export default function LikeComponent({ isLogin, id }) {
  const serverPath = process.env.REACT_APP_SERVER_PATH;
  const loginToken = window.sessionStorage.getItem("loginToken");

  const [message, setMessage] = useState("");

  const [interestIconColor, setInterestIconColor] = useState("#cccccc");

  useEffect(() => {
    if (isLogin) {
      getInterestInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  async function getInterestInfo() {
    await axios
      .get(`${serverPath}/likes/${id}`, {
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      })
      .then((res) => {
        if (res.data.like) {
          setInterestIconColor("#e8b791");
        }
      })
      .catch((err) => {
        if (err) throw err;
      });
  }

  const checkLoginStatus = (callback) => {
    if (isLogin) {
      callback();
    } else {
      setMessage("login_feature");
    }
    return;
  };

  const interestPost = () => {
    if (interestIconColor === "#cccccc") {
      axios
        .post(
          `${serverPath}/likes`,
          {
            id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${loginToken}`,
            },
          }
        )
        .then(() => {
          setInterestIconColor("#e8b791");
        })
        .catch((err) => {
          if (err) throw err;
        });
    } else {
      axios
        .delete(`${serverPath}/likes`, {
          data: {
            id: id,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginToken}`,
          },
        })
        .then(() => {
          setInterestIconColor("#cccccc");
        });
    }
  };

  const resetMessage = () => {
    setMessage("");
  };

  return (
    <LikeButton>
      {message ? (
        <SignContainer>
          <ModalBackdrop>
            <Confirm message={message} handleMessage={resetMessage} />
          </ModalBackdrop>
        </SignContainer>
      ) : null}
      <i
        className="fas fa-heart fa-lg"
        style={{
          color: `${interestIconColor}`,
        }}
        onClick={() => checkLoginStatus(interestPost)}
      />
    </LikeButton>
  );
}

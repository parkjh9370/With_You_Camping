/* eslint-disable no-useless-escape */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Backdrop = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;
const Modal = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 380px;

  background-color: #fff;

  border-radius: 10px;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 5%;

  display: grid;
  place-items: center;
  height: 50%;
  width: 85%;

  .body {
    line-height: 1.4rem;
  }
`;

const BtnContainer = styled.div`
  position: absolute;
  bottom: 60px;

  display: flex;
  width: 60%;
  justify-content: space-between;
`;

const YesBtn = styled.button`
  display: grid;
  place-items: center;
  width: 100px;
  height: 30px;
  background-color: #ddd;

  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);

  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: #cbc4bf;
  }

  span {
    position: relative;
    top: 2px;
  }
`;

const NoBtn = styled.button`
  display: grid;
  place-items: center;
  width: 100px;
  height: 30px;
  background-color: #fff;

  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);

  cursor: pointer;

  transition: 0.1s;
  &:hover {
    background-color: #cbc4bf;
  }

  span {
    position: relative;
    top: 2px;
  }
`;

export const TwoBtnModal = ({ main, close, nav, action }) => {
  const navigate = useNavigate();

  const functionSet = () => {
    close();
    if (action) {
      action();
    }
    if (nav) {
      navigate(nav);
    }
  };

  const closeModal = () => {
    close();
  };
  return (
    <Backdrop>
      <Modal>
        <TextContainer>
          <pre className="body">
            {main
              ? main
              : '-props 안내-\n  main={내용}을 입력하세요.\n    " \\n " 을 입력하여 줄바꿈 가능\n  close={닫는함수} nav={이동할 path}\n  action={OK 시 실행시킬 함수}'}
          </pre>
        </TextContainer>
        <BtnContainer>
          <YesBtn onClick={functionSet}>
            <span>예</span>
          </YesBtn>
          <NoBtn onClick={closeModal}>
            <span>아니오</span>
          </NoBtn>
        </BtnContainer>
      </Modal>
    </Backdrop>
  );
};

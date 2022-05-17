import styled from "styled-components";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  display: grid;
  place-items: center;

  width: 100%;
`;

const Title = styled.div`
  display: flex;

  position: relative;

  width: 100%;
  margin-bottom: 15px;

  font-size: 1.5rem;

  h2 {
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  div {
    width: 200px;
    text-align: center;

    position: absolute;
    left: calc(50% - 100px);
    top: -23px;
    font-size: 0.8rem;
    color: #888;
  }
`;

const GoBackBtn = styled(BsChevronLeft)`
  position: absolute;
  left: -7px;
  top: -3px;

  font-size: 1.5rem;
  color: #aaa;
  cursor: pointer;
`;

const HLine = styled.div`
  display: block;
  margin-bottom: 50px;

  width: 100%;
  height: 1px;

  background-color: #aaa;
`;

export const PageTitle = ({ children, author, goBackBtn }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>
        <h2>{children}</h2>
        {author ? <div>by. {author}</div> : null}
      </Title>
      {goBackBtn ? <GoBackBtn onClick={() => navigate(-1)} /> : null}
      <HLine />
    </Container>
  );
};

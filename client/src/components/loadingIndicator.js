import styled from "styled-components";
import { AiOutlineLoading } from "react-icons/ai";

const Container = styled.div``;
const Indicator = styled(AiOutlineLoading)`
  font-size: ${(props) => (props.size ? props.size : "3rem")};
  color: ${(props) => (props.color ? props.color : "#FFD600")};
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation: rotate ${(props) => (props.duration ? props.duration : "1s")}
    linear infinite;
`;

export const LoadingIndicator = ({ size, duration, color }) => {
  return (
    <Container>
      <Indicator size={size} duration={duration} color={color} />
    </Container>
  );
};

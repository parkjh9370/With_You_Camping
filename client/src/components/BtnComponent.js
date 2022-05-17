import styled from 'styled-components';

const Btn = styled.div`
  font-size: 1rem;
  display: grid;
  place-items: center;

  width: ${props => props.width ? props.width : '305px'};
  height: 40px;

  background-color: ${props => props.color ? `${props.color}` : '#FFD600'};
  background-color: ${props => props.disabled ? '#DDDDDD' : null};

  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 3px 3px rgba(0,0,0,0.2);

  cursor : ${props => props.disabled ? 'default' : 'pointer'};

  transition: 0.1s;

  &:hover{
    transform: ${props => props.disabled ? 'null' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'null' : '0px 5px 4px rgba(0,0,0,0.1)'};
    background-color: ${props => props.hover ? `${props.hover}` : null};
  }

    span{
    position: relative;
    top: 2px;
  }
`

export const BtnComponent = ({ children, disabled, color, width, action, hover }) => {

  return (
    <Btn disabled={disabled} color={color} width={width} onClick={action} hover={hover}>{children}</Btn>
  );
};


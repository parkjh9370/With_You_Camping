import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: min-content;
  height: 25px;

  border-radius: 10px;
  overflow: hidden;

  /* background-color: #FFEA7C; */
  background-color: #a0dfe1;
  // usage props가 존재하지 않고(기본 태그), 선택되지 않은 태그인 경우 회색,
  // 만약 선택된 상태라면 테마색을 표시한다.
  box-shadow: 0px 3px 3px rgba(0,0,0,0.2);
  
  cursor : pointer;
  
  transition: 0.2s;

  &:hover{
    /* background-color: #FFD600; */
  }

  &:active{
    box-shadow: none;
  }
`

const CommonTag = styled.div`
  display: grid;
  place-items: center;
  
  width: max-content;
  min-width: 60px;
  height: 25px;
  
  box-sizing: border-box;
  padding: 3px 10px 0px 10px;

  user-select: none;

  overflow: hidden;
`

export default function TagComponent({ children, action }) {
    const doAction = () => {
        if(action){
          action()
        }
      }
    
      return (
        <Wrapper>
          <CommonTag onClick={doAction}>{children}</CommonTag>
        </Wrapper>
      );
}


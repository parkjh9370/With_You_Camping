// import React from "react";
// import styled from "styled-components";
// import { FiSearch } from "react-icons/fi";

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   select {
//     width: 80px;
//   }
// `;

// function Search() {
//   return (
//     <Container>
//       <select name="types">
//         <option value="title">제목</option>
//         <option value="content">내용</option>
//       </select>

//       <input
//         className="search_input"
//         type="text"
//         placeholder="검색어를 입력해주세요"
//       />
//       <FiSearch size={"1.5rem"} />
//     </Container>
//   );
// }

// export default Search;

import React, { useState } from "react";

import styled from "styled-components";

const Container = styled.section`
  /* right: 30%; */
  /* float: right; */
  /* right: 5%; */
  height: 2.5rem;
  width: 100%;
  max-width: 1000px;
  border: 1px solid;
  border-color: lightgray;
  padding-top: 3px;
  padding-left: rem;
  padding-right: 0.6rem;
  padding-bottom: 0px;
  margin: {
    left: 0rem;
    right: 0.8rem;
  }
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  select {
    min-width: 4rem;
    max-width: 6rem;
    width: 20%;
    border: none;
    font-size: 0.9rem;
  }

  div {
    display: flex;
    width: 100%;
    background-color: white;
  }

  .search-input {
    border: none;
    outline: none;
    /* padding-left: 1rem; */
    width: 100%;
  }
  @media screen and (max-width: 500px) {
    position: relative;
    left: -30px;
    height: 2.5rem;
    width: 100%;
    max-width: 300px;
    border: 1px solid;
    border-color: lightgray;
    padding-top: 3px;
    padding-left: rem;
    padding-right: 0.6rem;
    padding-bottom: 0px;

    margin-top: 1rem;
    margin-left: 6rem;
    margin: {
      left: 0.5rem;
      right: 0.8rem;
    }
    select {
      min-width: 2rem;
      max-width: 4rem;
      width: 30%;
      border: none;
      font-size: 0.9rem;
    }

    div {
      display: flex;
      width: 100%;
      background-color: white;
    }

    .search-bar {
      border: none;
      outline: none;
      /* padding-left: 1rem; */
      width: 100%;
      margin-top: 20px;
    }
  }
`;

export default function Search({ setInputSearch, setTypeSearch }) {
  const [input, setInput] = useState("");
  const [searchType, setSearchType] = useState("title");

  function getSearchPosts(type, input) {
    setTypeSearch(type);
    setInputSearch(input);
  }

  const changeQueryString = (e) => {
    setInput(e.target.value);
  };

  const changeSearchType = (e) => {
    setSearchType(e.target.value);
  };

  const checkKeycode = (e) => {
    if (e.keyCode === 13) {
      getSearchResult();
    }
  };

  const getSearchResult = () => {
    getSearchPosts(searchType, input);
    setInput("");
  };

  return (
    <div>
      <Container>
        <select name="types" onChange={changeSearchType}>
          <option value="title">제목</option>
          <option value="content">내용</option>
          {/* <option value="nickname">작성자</option> */}
        </select>
        <input
          className="search-input"
          type="text"
          value={input}
          onChange={changeQueryString}
          onKeyDown={checkKeycode}
          placeholder="검색어를 입력해주세요"
        />
        <i className="fas fa-search" onClick={getSearchResult}></i>
      </Container>
    </div>
  );
}

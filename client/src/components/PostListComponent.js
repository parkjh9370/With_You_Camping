import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "./Search";
import SelectList from "./SelectList";
import CardList from "./CardList";
import axios from "axios";
import { list } from "./data/data";

const HLine = styled.div`
  display: grid;
  margin-top: 20px;
  margin-bottom: 10px;
  width: 1240px;
  height: 1px;
  margin-left: 0px;
  background-color: #dad8d6;
  @media screen and (max-width: 500px) {
    position: relative;
    width: 100%;
    margin-left: -30px;
  }
`;

const Container = styled.section`
  width: 113%;
  display: grid;
  word-break: break-all;
  height: auto;
  padding-bottom: 2rem;
  border-bottom: 1px solid $color-grey-border;
  @media screen and (max-width: 500px) {
    width: 100%;
    .search-bar {
      position: relative;
      left: 60px;
    }
  }
`;

const InnerContainer = styled.div`
  display: flex;
  @media screen and (max-width: 500px) {
    display: block;
    width: 100%;
    margin-bottom: 90px;
  }
  &:hover {
    box-shadow: 0px 0px 8px $color-grey-border;
    img {
      transform: scale(1.02, 1.02);
    }
  }
`;

const TitleContainer = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  /* width: 100%; */
  width: 1250px;
  @media screen and (max-width: 500px) {
    position: relative;
    display: grid;
    place-items: center;
    width: 500px;
    /* place-items: ; */
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  justify-content: space-between;

  margin-top: 40px;
  width: 1px;
  /* height: max-content; */

  @media screen and (max-width: 500px) {
    position: relative;
    left: 13%;
    display: grid;
    width: 90%;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    margin-top: -50px;
    justify-content: center;
  }
`;

const DownContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  justify-content: center;
  float: left;
  @media screen and (max-width: 500px) {
  }
`;

const ButtonContainer = styled.div`
  margin-top: 30px;
  margin-right: 30px;
`;

const ClickButton = styled.button`
  cursor: pointer;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 26px;
  color: #605c59;

  background: #f1f3ef;
  border: none;
  border: 1px solid none;
  box-sizing: border-box;
  border-radius: 100px;
  width: auto;
  height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  @media screen and (max-width: 500px) {
    font-weight: 300;
    font-size: 20px;
    height: 30px;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export default function PostListComponent() {
  const serverPath = process.env.REACT_APP_SERVER_PATH;

  const [LocationList, setLocationList] = useState(list.location);
  const [CategoryList, setCategoryList] = useState(list.category);
  // 현재 클릭된 카테고리 리스트
  const listStatus = [...LocationList, ...CategoryList];

  const [inputSearch, setInputSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");

  const [nowCategory, setNowCategory] = useState("");

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState([]);

  useEffect(() => {
    categoryPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, LocationList, CategoryList]);

  useEffect(() => {
    searchPost();
    window.scroll(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch, typeSearch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function searchPost() {
    if (inputSearch.length !== 0 && typeSearch.length !== 0) {
      const res = await axios.get(
        `${serverPath}/main/search?searchType=${typeSearch}&input=${inputSearch}&pages=${page}&limit=12`
      );
      setPosts(res.data.boards.rows);
      let pageArray = [];
      if (pageArray.length > 0) pageArray = [];

      if (res.data.boards.count) {
        if (res.data.boards.count <= 12) {
          pageArray.push(1);
        } else {
          for (let i = 1; i <= res.data.boards.count / 12; i++) {
            pageArray.push(i);
          }
        }
      }
      setPageNumber(pageArray);
      for (let i = 0; i < listStatus.length; i++) {
        listStatus[i].onOff = false;
      }
      setInputSearch("");
      setTypeSearch("");
    }
  }

  useEffect(() => {
    categoryPost();
    window.scroll(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, setLocationList, setCategoryList]);

  async function categoryPost() {
    let category =
      listStatus[listStatus.findIndex((index) => index.onOff === true)].name;

    setNowCategory(category);
    if (nowCategory !== category) setPage(1);

    setNowCategory(category);
    if (nowCategory !== category) setPage(1);

    const res = await axios.get(
      `${serverPath}/main?&category=${category}&pages=${page}&limit=12`
    );

    setPosts(res.data.boards.rows);

    let pageArray = [];
    // if (pageArray.length > 0 ) pageArray = [];

    if (res.data.boards.count) {
      if (res.data.boards.count <= 12) {
        pageArray.push(1);
      } else {
        for (let i = 1; i <= res.data.boards.count / 12; i++) {
          pageArray.push(i);
        }
      }
    }

    setPageNumber(pageArray);
  }

  const pageButton = pageNumber.map((page, i) => {
    return (
      <ButtonContainer key={i}>
        <ClickButton onClick={() => setPage(page)}>{page}</ClickButton>
      </ButtonContainer>
    );
  });

  return (
    <>
      <Container>
        <TitleContainer>
          게시글 목록 <HLine />
        </TitleContainer>
        <InnerContainer>
          <SelectList
            LocationList={LocationList}
            CategoryList={CategoryList}
            setLocationList={setLocationList}
            setCategoryList={setCategoryList}
          />
          <Search
            className="search-bar"
            setInputSearch={setInputSearch}
            setTypeSearch={setTypeSearch}
          />
        </InnerContainer>
        <CardContainer>
          <CardList posts={posts} />
        </CardContainer>
      </Container>
      <DownContainer>{pageButton}</DownContainer>
    </>
  );
}

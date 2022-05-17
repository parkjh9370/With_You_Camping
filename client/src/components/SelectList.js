import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: grid;
  margin-top: -20px;

  width: 70%;
  @media screen and (max-width: 500px) {
    position: relative;
    left: 50px;
    width: 80%;
  }
`;

const ListBox = styled.div`
  transition: all 300ms;

  display: flex;
  margin-top: 25px;

  @media screen and (max-width: 500px) {
    display: block;
     
`;

const LocationBefore = styled.button`
  cursor: pointer;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: #605c59;

  background: #f1f3ef;
  border: none;
  border: 1px solid none;
  box-sizing: border-box;
  border-radius: 100px;
  width: auto;
  height: 38px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 5px;
  margin-right: 5px;
  @media screen and (max-width: 500px) {
    display: inline-block;
    font-size: 12px;
    width: auto;
    height: 34px;
    padding-left: 8px;
    padding-right: 8px;
    margin-left: 1.5px;
    margin-right: 1.5px;
  }
`;

const LocationAfter = styled.button`
  cursor: pointer;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;

  background: #bffcc7;
  border: none;
  border: 1px solid none;
  border-radius: 100px;
  width: auto;
  height: 38px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 5px;
  margin-right: 5px;
  @media screen and (max-width: 500px) {
    display: inline-block;
    font-size: 13px;
    width: auto;
    height: 33px;
    padding-left: 13px;
    padding-right: 13px;
    margin-left: 1.5px;
    margin-right: 1.5px;
  }
`;

const CategoryBox = styled.div`
  display: flex;
  margin-left: 170px;
  @media screen and (max-width: 768px) {
    display: inline-block;
    margin-left: 0px;
    margin-top: 12px;
  }
`;

const CategoryBefore = styled.button`
  cursor: pointer;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: #605c59;

  background: #f1f3ef;
  border: none;
  border: 1px solid none;
  box-sizing: border-box;
  border-radius: 100px;
  width: auto;
  height: 38px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 5px;
  margin-right: 0px;
  @media screen and (max-width: 500px) {
    display: block;
    font-size: 13px;
    width: auto;
    height: 33px;
    padding-left: 12px;
    padding-right: 12px;
    margin-left: 3px;
    margin-right: 3px;
  }
`;

const CategoryAfter = styled.button`
  cursor: pointer;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;

  background: #f9d79b;
  border: none;
  border: 1px solid none;
  border-radius: 100px;
  width: auto;
  height: 38px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 5px;
  margin-right: 5px;
  @media screen and (max-width: 500px) {
    display: block;
    font-size: 13px;
    width: auto;
    height: 33px;
    padding-left: 12px;
    padding-right: 12px;
    margin-left: 3px;
    margin-right: 3px;
  }
`;

function SelectList({
  LocationList,
  CategoryList,
  setLocationList,
  setCategoryList,
}) {
  const TagOnClick = (e) => {
    const { name } = e.target;
    // eslint-disable-next-line array-callback-return
    LocationList.map((x, index) => {
      if (name === String(x.id)) {
        let copyList = [...LocationList];
        copyList[index].onOff = !copyList[index].onOff;
        setLocationList(copyList);
      } else {
        x.onOff = false;
      }
    });
    // eslint-disable-next-line array-callback-return
    CategoryList.map((x, index) => {
      if (name === String(x.id)) {
        let copyList = [...CategoryList];
        copyList[index].onOff = !copyList[index].onOff;
        setCategoryList(copyList);
      } else {
        x.onOff = false;
      }
    });
  };

  const LocationMap = LocationList.map((x, index) => {
    return x.onOff ? (
      <LocationAfter onClick={TagOnClick} name={x.id} key={x.id}>
        {x.name}
      </LocationAfter>
    ) : (
      <LocationBefore onClick={TagOnClick} name={x.id} key={x.id}>
        {x.name}
      </LocationBefore>
    );
  });

  const CategoryMap = CategoryList.map((x, index) => {
    return x.onOff ? (
      <CategoryAfter onClick={TagOnClick} name={x.id} key={x.id}>
        {x.name}
      </CategoryAfter>
    ) : (
      <CategoryBefore onClick={TagOnClick} name={x.id} key={x.id}>
        {x.name}
      </CategoryBefore>
    );
  });

  return (
    <Container>
      <ListBox>
        {LocationMap}
        <CategoryBox>{CategoryMap}</CategoryBox>
      </ListBox>
    </Container>
  );
}

export default SelectList;

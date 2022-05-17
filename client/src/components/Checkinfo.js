import styled from "styled-components";
import { IoPaperPlaneSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

const InnerContainer = styled.div`
  margin-top: 10px;
  .checked {
    position: relative;
    color: #fff;
    border-color: #00aeff;
    background-color: #00aeff;
  }

  .checked:after {
    position: absolute;
    z-index: 2;
    top: -15px;
    right: -15px;
    padding: 5px;
    font-size: 70%;
    border-radius: 4px;
    background-color: tomato;
    content: "Selected";
  }
`;

const CheckContainer = styled.div`
  justify-content: space-between;
  position: relative;
  flex-direction: column;
  margin-top: 10px;
  float: left;
`;

const TitleContainer = styled.div``;

export default function Checkinfo({ setCheckDetail, checkDetail }) {
  const [area, setArea] = useState([
    { contents: "서울", checked: false, info: "area" },
    { contents: "경기도", checked: false, info: "area" },
    { contents: "충청도", checked: false, info: "area" },
    { contents: "강원도", checked: false, info: "area" },
    { contents: "경상도", checked: false, info: "area" },
    { contents: "전라도", checked: false, info: "area" },
    { contents: "제주도", checked: false, info: "area" },
  ]);
  const [internet, setInternet] = useState([
    { contents: "가능", checked: false, info: "internet" },
    { contents: "불가", checked: false, info: "internet" },
  ]);
  const [parking, setParking] = useState([
    { contents: "여유", checked: false, info: "parking" },
    { contents: "협소", checked: false, info: "parking" },
  ]);
  const [electronic, setElectronic] = useState([
    { contents: "가능", checked: false, info: "electronic" },
    { contents: "불가", checked: false, info: "electronic" },
  ]);
  const [toilet, setToilet] = useState([
    { contents: "양호", checked: false, info: "toilet" },
    { contents: "불량", checked: false, info: "toilet" },
  ]);

  // const [precheckDetail, setPreCheckDetail] = useState({
  //   area: null,
  //   internet: null,
  //   parking: null,
  //   electronic: null,
  //   toilet: null,
  // });

  // const [areaflag, setAreaFlag] = useState(0);
  // const [internetflag, setinternetFlag] = useState(0);

  // const serverPath = process.env.REACT_APP_SERVER_PATH;
  // const { id } = useParams();

  // useEffect(() => {
  //   (async () => {
  //     if (id !== undefined) {
  //       const res = await axios.get(`${serverPath}/boards/${id}`);

  //       if (res.status === 200) {
  //         setCheckDetail({
  //           area: res.data.boardData.area,
  //           internet: res.data.boardData.wifi,
  //           parking: res.data.boardData.parking,
  //           electronic: res.data.boardData.electricity,
  //           toilet: res.data.boardData.toiletType,
  //         });
  //         setAreaFlag(1);
  //         setinternetFlag(1);
  //       }
  //     }
  //   })();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // // console.log(precheckDetail)



  useEffect(() => {
    let findArea = area.findIndex((index) => index.checked === true);
    if (findArea === -1) findArea = 0;

    let findInternet = internet.findIndex((index) => index.checked === true);
    if (findInternet === -1) findInternet = 0;

    let findParking = parking.findIndex((index) => index.checked === true);
    if (findParking === -1) findParking = 0;

    let findElectronic = electronic.findIndex(
      (index) => index.checked === true
    );
    if (findElectronic === -1) findElectronic = 0;

    let findToilet = toilet.findIndex((index) => index.checked === true);
    if (findToilet === -1) findToilet = 0;

    setCheckDetail({
      area: area[findArea].contents,
      internet: internet[findInternet].contents,
      parking: parking[findParking].contents,
      electronic: electronic[findElectronic].contents,
      toilet: toilet[findToilet].contents,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, internet, parking, electronic, toilet]);

  const handleChange = (data) => {
    if (data.info === "area") {
      const copyProducts = [...area];
      const modifiedProducts = copyProducts.map((area) => {
        if (data.contents === area.contents) {
          area.checked = !area.checked;
        } else {
          area.checked = false;
        }
        return area;
      });

      setArea(modifiedProducts);
    }

    if (data.info === "internet") {
      const copyProducts = [...internet];
      const modifiedProducts = copyProducts.map((internet) => {
        if (data.contents === internet.contents) {
          internet.checked = !internet.checked;
        } else {
          internet.checked = false;
        }
        return internet;
      });
      setInternet(modifiedProducts);
    }

    if (data.info === "parking") {
      const copyProducts = [...parking];
      const modifiedProducts = copyProducts.map((parking) => {
        if (data.contents === parking.contents) {
          parking.checked = !parking.checked;
        } else {
          parking.checked = false;
        }
        return parking;
      });
      setParking(modifiedProducts);
    }

    if (data.info === "electronic") {
      const copyProducts = [...electronic];
      const modifiedProducts = copyProducts.map((electronic) => {
        if (data.contents === electronic.contents) {
          electronic.checked = !electronic.checked;
        } else {
          electronic.checked = false;
        }
        return electronic;
      });
      setElectronic(modifiedProducts);
    }

    if (data.info === "toilet") {
      const copyProducts = [...toilet];
      const modifiedProducts = copyProducts.map((toilet) => {
        if (data.contents === toilet.contents) {
          toilet.checked = !toilet.checked;
        } else {
          toilet.checked = false;
        }
        return toilet;
      });
      setToilet(modifiedProducts);
    }
  };

  return (
    <div>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>
        <IoPaperPlaneSharp /> 지역
      </TitleContainer>

      {area &&
        area.map((area, idx) => (
          <CheckContainer key={idx}>
            <input
              type="checkbox"
              className="custom-control-input"
              checked={area.checked}
              onChange={() => {
                handleChange(area);
              }}
            />
            <label className="custom-control-label">
              {area.contents}
              {/* {checkData.area} */}
            </label>
            {/* </div> */}
          </CheckContainer>
        ))}

      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>

      <TitleContainer>
        <IoPaperPlaneSharp /> 인터넷
      </TitleContainer>

      {internet &&
        internet.map((internet, idx) => (
          <CheckContainer key={idx}>
            <input
              type="checkbox"
              className="custom-control-input"
              checked={internet.checked}
              onChange={() => {
                handleChange(internet);
              }}
            />
            <label className="custom-control-label">{internet.contents}</label>
          </CheckContainer>
        ))}
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>

      <TitleContainer>
        <IoPaperPlaneSharp /> 주차장 공간
      </TitleContainer>
      {parking &&
        parking.map((parking, idx) => (
          <CheckContainer key={idx}>
            <input
              type="checkbox"
              className="custom-control-input"
              checked={parking.checked}
              onChange={() => {
                handleChange(parking);
              }}
            />
            <label className="custom-control-label">{parking.contents}</label>
          </CheckContainer>
        ))}
      <InnerContainer> </InnerContainer>

      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>

      <InnerContainer> </InnerContainer>
      <TitleContainer>
        <IoPaperPlaneSharp /> 전기 사용
      </TitleContainer>
      {electronic &&
        electronic.map((electronic, idx) => (
          <CheckContainer key={idx}>
            <input
              type="checkbox"
              className="custom-control-input"
              checked={electronic.checked}
              onChange={() => {
                handleChange(electronic);
              }}
            />
            <label className="custom-control-label">
              {electronic.contents}
            </label>
          </CheckContainer>
        ))}
      <InnerContainer> </InnerContainer>

      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>
      <TitleContainer>&nbsp;</TitleContainer>

      <TitleContainer>
        <IoPaperPlaneSharp /> 화장실 상태
      </TitleContainer>
      {toilet &&
        toilet.map((toilet, idx) => (
          <CheckContainer key={idx}>
            <input
              type="checkbox"
              className="custom-control-input"
              checked={toilet.checked}
              onChange={() => {
                handleChange(toilet);
              }}
            />
            <label className="custom-control-label">{toilet.contents}</label>
          </CheckContainer>
        ))}
      <InnerContainer> </InnerContainer>
      <TitleContainer>&nbsp;</TitleContainer>
    </div>
  );
}

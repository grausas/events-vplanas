import styled from "styled-components";
// categories icons
import Susirinkimas from "../../assets/icons/categories/IKONOS RENGINIAI 300x180-01.png";
import SportoRenginys from "../../assets/icons/categories/IKONOS RENGINIAI 300x180-02.png";
import Koncertas from "../../assets/icons/categories/IKONOS RENGINIAI 300x180-03.png";
import Filmavimas from "../../assets/icons/categories/IKONOS RENGINIAI 300x180-04.png";
import Muge from "../../assets/icons/categories/IKONOS RENGINIAI 300x180-05.png";
import RenginysSeimai from "../../assets/icons/categories/IKONOS RENGINIAI 300x180-06.png";
import ValstybinisRenginys from "../../assets/icons/categories/IKONOS RENGINIAI 300x180-07.png";
import ViesasisRenginys from "../../assets/icons/categories/IKONOS RENGINIAI 300x180-08.png";

export const Wrapper = styled.div`
  position: absolute;
  width: 360px;
  top: 50px;
  border-radius: 5px;
  right: 20px;
  background-color: var(--white);
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  z-index: 1;
  animation: popup 0.3s;

  @keyframes popup {
    0% {
      transform: scale(0.6);
    }
    100% {
      transform: scale(1);
    }
  }

  @media only screen and (max-width: 768px) {
    top: 5px;
    right: 10px;
    left: 10px;
    margin: 0 auto;
    width: 95%;
  }
`;

export const Content = styled.div`
  padding: 10px 20px;
`;

export const Close = styled.div`
  position: relative;
  height: 180px;
  background-color: var(--grey);
  width: 100%;
  border-radius: 5px 5px 0 0;
  background: var(--white);

  &:after {
    content: "";
    position: absolute;
    width: 90%;
    height: 2px;
    bottom: 0;
    right: 0;
    left: 0;
    margin: 0 auto;
    background-color: ${(props) =>
      props.backgroundColor === 1
        ? "rgb(237,81,81,255)"
        : props.backgroundColor === 2
        ? "rgb(20,158,206,255)"
        : props.backgroundColor === 3
        ? "rgb(158,85,156,255)"
        : props.backgroundColor === 4
        ? "rgb(252,146,31,255)"
        : props.backgroundColor === 5
        ? "rgb(167,198,54,255)"
        : props.backgroundColor === 6
        ? "rgb(255,222,62,255)"
        : props.backgroundColor === 7
        ? "rgb(0,92,230,255)"
        : "rgb(255,115,223,255)"};
  }

  /* &:before {
    content: "Filmavimas";
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    margin: 0 auto;
    z-index: 2;
  } */
`;

export const Logo = styled.div`
  position: absolute;
  width: 300px;
  height: 100%;
  border: none;
  left: calc(50% - 150px);
  background: url(${(props) =>
    props.backgroundImage === 1
      ? Susirinkimas
      : props.backgroundImage === 2
      ? SportoRenginys
      : props.backgroundImage === 3
      ? Koncertas
      : props.backgroundImage === 4
      ? Filmavimas
      : props.backgroundImage === 5
      ? Muge
      : props.backgroundImage === 6
      ? RenginysSeimai
      : props.backgroundImage === 7
      ? ValstybinisRenginys
      : ViesasisRenginys});
`;

export const CloseImage = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 24px;
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;

  :hover {
    background-color: var(--silver);
  }
`;

export const EditIcon = styled.img`
  position: absolute;
  width: 26px;
  left: 10px;
  top: 10px;
  padding: 4px;
  border-radius: 20%;
  cursor: pointer;
  z-index: 22;

  :hover {
    background-color: var(--silver);
  }
`;

export const Title = styled.div`
  margin-bottom: 15px;
`;

export const Text = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: flex-start;

  p,
  a {
    color: var(--grey);
  }

  a {
    text-decoration: none;

    :hover {
      font-weight: 600;
      color: var(--lightBlue);
      cursor: pointer;
    }
  }
  img {
    margin-right: 7px;
    width: 20px;
  }
`;

export const EventDates = styled.div``;

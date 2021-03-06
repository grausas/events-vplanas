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
    top: unset;
    bottom: 5px;
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

  @media only screen and (max-width: 768px) {
    height: 30px;
  }

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
        ? "rgb(241,105,99,255)"
        : props.backgroundColor === 2
        ? "rgb(0,173,214,255)"
        : props.backgroundColor === 3
        ? "rgb(158,74,155,255)"
        : props.backgroundColor === 4
        ? "rgb(240,90,40,255)"
        : props.backgroundColor === 5
        ? "rgb(180,203,67,255)"
        : props.backgroundColor === 6
        ? "rgb(250,175,64,255)"
        : props.backgroundColor === 7
        ? "rgb(59,114,183,255)"
        : "rgb(227,148,191,255)"};
  }
`;

export const Logo = styled.div`
  position: absolute;
  width: 300px;
  height: 100%;
  border: none;
  left: calc(50% - 150px);
  background-size: 100% 100%;
  transition: 0.3s ease-in-out;

  @media only screen and (max-width: 768px) {
    display: none;
  }

  background-image: url(${(props) =>
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

  &:hover {
    transform: scale(0.9);
  }
`;

export const CloseImage = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 26px;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;

  :hover {
    background-color: var(--silver);
  }

  @media only screen and (max-width: 768px) {
    right: 3px;
    top: 3px;
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

  @media only screen and (max-width: 768px) {
    left: 3px;
    top: 3px;
  }
`;

export const Title = styled.div`
  margin-bottom: 15px;

  @media only screen and (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

export const Text = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: flex-start;

  @media only screen and (max-width: 768px) {
    margin-bottom: 5px;
  }

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

export const CategoryDiv = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
  bottom: -10px;
  display: flex;
  justify-content: center;
  z-index: 1;
`;

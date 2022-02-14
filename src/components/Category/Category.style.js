import styled from "styled-components";

// category icons
import Susirinkimas from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-01.png";
import SportoRenginys from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-02.png";
import Koncertas from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-03.png";
import Filmavimas from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-04.png";
import Muge from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-05.png";
import RenginysSeimai from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-06.png";
import ValstybinisRenginys from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-07.png";
import ViesasisRenginys from "../../assets/icons/categories/IKONOS RENGINIAI 32x32-08.png";

export const Wrapper = styled.div`
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 5px 5px 5px 25px;
  color: var(--white);
  text-transform: uppercase;
  border-radius: 5px;
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

  span {
    position: relative;
    display: flex;
    justify-content: center;
  }
`;

export const Icon = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  left: -25px;
  top: -2px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
`;

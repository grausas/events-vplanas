import styled from "styled-components";

import { Button } from "../index";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: var(--grey);
  border-radius: 5px;
  color: var(--dark);
  left: 430px;
  padding: 10px;
  top: 10px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  background-color: var(--silver);
  z-index: 99;
`;

export const IconFilter = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;

  img {
    width: 21px;
    user-select: none;
  }

  div {
    display: flex;
  }
`;

export const Content = styled.div`
  max-width: 300px;
  user-select: none;

  h5 {
    font-weight: 600;
  }
`;

export const DateFilter = styled.div`
  display: flex;
`;

export const FilterContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const CheckBoxDiv = styled.div`
  display: flex;
  justify-content: space-between;

  label {
    &:hover input ~ span {
      opacity: 0.8;
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
    input:checked ~ span {
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
  }

  span {
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
`;

export const Colors = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
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
`;

export const CloseImage = styled.img`
  padding: 5px;
`;

export const CloseImageDiv = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  border-radius: 50%;
  padding: 2px;
  cursor: pointer;

  :hover {
    background-color: var(--white);
  }
`;

export const ClearButton = styled(Button)`
  float: right;
  padding: 1px 7px;
  font-size: var(--fontSmall);
  background-color: var(--white);
  color: var(--dark);
  border: 1px solid var(--darkSilver);

  &:hover {
    background-color: var(--silver);
    color: var(--dark);
    border: 1px solid var(--darkSilver);
  }
`;

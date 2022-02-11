import styled from "styled-components";

import { Button } from "../index";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--dark);
  padding: 0 10px 0 10px;
  background-color: var(--silver);

  @media only screen and (max-width: 768px) {
    padding: 0 5px 0 5px;
  }
`;

export const Content = styled.div`
  max-width: 100%;
  user-select: none;
  padding-bottom: 5px;
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
  position: sticky;
  left: 10px;
  border: 1px solid var(--darkSilver);
  border-radius: 10px;
  background-color: var(--white);
  width: 100%;
  padding: 5px 10px;
`;

export const CheckBoxDiv = styled.div`
  display: flex;
  justify-content: space-between;

  &:hover {
    background: var(--silver);
  }

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
  position: absolute;
  width: 30%;
  bottom: 4px;
  right: 4px;
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

export const ButtonDivs = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
`;

export const FilterButton = styled(Button)`
  font-size: var(--fontSmall);
  padding: 2px 5px 2px 20px;
  position: relative;

  img {
    position: absolute;
    left: 1px;
    top: 3px;
    width: 20px;
    border-radius: 50%;
  }
`;

export const DayButton = styled(Button)`
  font-size: var(--fontSmall);
  padding: 2px 5px;
  background: var(-green);
`;

export const Dropdown = styled.div`
  margin-top: 10px;
  position: relative;
  background: var(--white);
  border: 1px solid var(--darkSilver);
  padding: 2px 15px;
  border-radius: 5px;
  margin-bottom: 1px;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
`;

export const ExpandImage = styled.img`
  position: absolute;
  right: 5px;
  top: 3px;
  width: 22px;
  border-radius: 50%;
`;

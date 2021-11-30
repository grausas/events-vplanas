import styled from "styled-components";

import { Button } from "../index";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: var(--grey);
  border-radius: 5px;
  color: var(--white);
  left: 310px;
  padding: 10px;
  top: 2%;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.close ? "var(--white)" : "none")};
  color: ${(props) => (props.close ? "var(--dark)" : "none")};
  opacity: 0.9;
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
    cursor: pointer;
  }
`;

export const Content = styled.div`
  max-width: 400px;
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
  flex-wrap: wrap;
`;

export const CloseImage = styled.img`
  position: absolute;
  right: 5px;
  top: 5px;
  background-color: var(--silver);
  /* height: 18px; */
  /* width: 15px; */
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;

  :hover {
    background-color: var(--darkSilver);
  }
`;

export const ClearButton = styled(Button)`
  float: right;
  padding: 3px 7px;
  background-color: var(--darkSilver);
  color: var(--dark);

  &:hover {
    background-color: var(--grey);
    color: var(--white);
  }
`;

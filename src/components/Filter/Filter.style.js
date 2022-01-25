import styled from "styled-components";

import { Button } from "../index";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: var(--grey);
  border-radius: 5px;
  color: var(--white);
  left: 300px;
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

export const CloseImage = styled.img`
  padding: 5px;
`;

export const CloseImageDiv = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;

  :hover {
    background-color: var(--silver);
  }
`;

export const ClearButton = styled(Button)`
  float: right;
  padding: 1px 7px;
  font-size: var(--fontSmall);
  background-color: var(--darkSilver);
  color: var(--dark);

  &:hover {
    background-color: var(--grey);
    color: var(--white);
  }
`;

import styled from "styled-components";
import Btn from "../Button/Button";

export const Wrapper = styled.div`
  position: absolute;
  max-width: 500px;
  max-height: 80%;
  width: 100%;
  top: 5%;
  background: var(--white);
  left: calc(50% - 200px);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  overflow-x: hidden;

  h3 {
    margin-bottom: 20px;
  }
`;

export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Button = styled(Btn)`
  background-color: var(--grey);
  padding: 5px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:nth-child(even) {
    padding-left: 5px;
  }

  :hover {
    background-color: var(--grey);
    color: var(--white);
    opacity: 0.9;
  }
`;

export const CloseImage = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  padding: 3px;
  cursor: pointer;

  :hover {
    border-radius: 50%;
    background-color: var(--silver);
  }
`;

export const DeleteImage = styled.img`
  width: 20px;
`;

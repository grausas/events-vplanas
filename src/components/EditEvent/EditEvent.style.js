import styled from "styled-components";
import Btn from "../Button/Button";

export const Wrapper = styled.div`
  position: absolute;
  max-width: 600px;
  max-height: 90%;
  top: 5%;
  background: var(--white);
  left: calc(50% - 200px);
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  overflow-x: hidden;

  h3 {
    margin-bottom: 10px;
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
  font-size: var(--fontSmall);

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
  width: 28px;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;

  :hover {
    background-color: var(--silver);
  }
`;

export const DeleteImage = styled.img`
  width: 18px;
`;

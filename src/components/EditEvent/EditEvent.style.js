import styled from "styled-components";
import Btn from "../Button/Button";

export const Wrapper = styled.div`
  position: absolute;
  max-width: 300px;
  /* max-height: 100vh; */
  top: 140px;
  background: var(--white);
  right: 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;

  input,
  select,
  textarea {
    padding: 0 5px;
    height: 30px;
  }

  h3 {
    background-color: var(--silver);
    padding: 5px;
    text-align: center;
    margin: 0;
  }

  form {
    padding: 5px;
  }
`;

export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

export const Button = styled(Btn)`
  background-color: var(--grey);
  padding: 3px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--fontSmall);

  &:nth-child(even) {
    padding-left: 8px;
    background-color: var(--red);
    color: var(--white);
  }

  &:hover {
    opacity: 0.8;
  }

  &:hover:nth-child(odd) {
    background-color: var(--grey);
    color: var(--white);
  }
`;

export const CloseImage = styled.img`
  position: absolute;
  right: 1px;
  top: 1px;
  width: 22px;
  padding: 3px;
  border-radius: 50%;
  cursor: pointer;

  :hover {
    background-color: var(--white);
  }
`;

export const DeleteImage = styled.img`
  width: 18px;
  margin-right: 5px;
`;

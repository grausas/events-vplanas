import styled from "styled-components";

import Btn from "../Button/Button";

export const Wrapper = styled.div`
  max-width: 300px;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: calc(50% - 100px);
  background: var(--white);
  top: 10px;
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  z-index: 999;

  span {
    text-align: center;
  }
`;

export const ButtonDiv = styled(Btn)`
  background-color: var(--grey);
  padding: 3px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--fontSmall);

  &:nth-child(odd) {
    padding-left: 8px;
    background-color: var(--red);
    color: var(--white);
    border: 1px solid var(--white);
  }

  &:hover {
    opacity: 0.8;
  }

  &:hover:nth-child(even) {
    background-color: var(--grey);
    color: var(--white);
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

export const DeleteImage = styled.img`
  width: 18px;
  margin-right: 5px;
`;

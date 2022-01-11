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
  padding: 5px 10px;
  font-size: var(--fontSmall);
  opacity: 0.8;

  &:nth-child(odd) {
    background-color: var(--red);
  }
  &:nth-child(even) {
    background-color: var(--grey);
  }

  &:hover {
    color: var(--white);
    opacity: 1;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

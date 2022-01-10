import styled from "styled-components";

import Btn from "../Button/Button";

export const Wrapper = styled.div`
  width: 300px;
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
  &:hover:nth-child(odd) {
    background: var(--grey);
    color: var(--white);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

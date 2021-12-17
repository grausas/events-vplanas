import styled from "styled-components";

import Btn from "../Button/Button";

export const Wrapper = styled.div`
  width: 300px;
  padding: 1rem;
  position: absolute;
  left: calc(50% - 200px);
  background: var(--white);
  top: 60px;
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  z-index: 999;

  span {
    text-align: center;
  }
`;

export const ButtonDiv = styled(Btn)`
  &:hover {
    background: var(--grey);
    color: var(--white);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

import styled from "styled-components";

import Button from "../Button/Button";

export const Wrapper = styled.div`
  position: absolute;
  width: 350px;
  max-height: 600px;
  top: 2%;
  border-radius: 5px;
  right: 20px;
  background-color: var(--white);
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  z-index: 2;
`;

export const Content = styled.div`
  padding: 20px;
`;

export const Close = styled.div`
  position: relative;
  height: 170px;
  background-color: var(--grey);
  width: 100%;
  border-radius: 5px 5px 0 0;

  span {
    font-weight: 600;
  }
`;

export const Logo = styled.img`
  position: absolute;
  width: 150px;
  left: calc(50% - 75px);
  top: calc(50% - 60px);
`;

export const CloseImage = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;

  :hover {
    background-color: var(--white);
  }
`;

export const Title = styled.div`
  margin-bottom: 15px;
`;

export const Text = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: flex-start;

  p {
    color: var(--grey);
  }

  img {
    margin-right: 7px;
    width: 20px;
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: var(--grey);
  padding: 3px 8px;
  margin-top: 10px;

  :hover {
    background: var(--lightBlue);
    color: var(--white);
  }
`;

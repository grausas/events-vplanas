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

export const FormWrapper = styled.div`
  position: absolute;
  max-width: 500px;
  width: 100%;
  top: 10%;
  background: var(--white);
  left: calc(50% - 200px);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);

  h3 {
    margin-bottom: 20px;
  }
`;

export const Close = styled.div`
  position: relative;
  height: 170px;
  background-color: var(--grey);
  width: 100%;
  border-radius: 5px 5px 0 0;
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

export const EditIcon = styled.img`
  position: absolute;
  width: 25px;
  left: 10px;
  top: 10px;
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

  p,
  a {
    color: var(--grey);
  }

  a {
    text-decoration: none;

    :hover {
      font-weight: 600;
      color: var(--lightBlue);
    }
  }
  img {
    margin-right: 7px;
    width: 20px;
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: var(--grey);
  padding: 5px 20px;
  margin-top: 20px;

  :hover {
    background: var(--lightBlue);
    color: var(--white);
  }
`;

export const EventDates = styled.div``;

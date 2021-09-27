import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  width: 350px;
  max-height: 600px;
  top: 50px;
  border-radius: 5px;
  right: 20px;
  background-color: var(--white);
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
`;

export const Content = styled.div`
  padding: 20px;

  p {
    color: var(--grey);
  }
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

export const CloseImage = styled.img`
  position: absolute;
  right: 5px;
  top: 5px;
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
  align-items: center;

  img {
    margin-right: 7px;
    width: 20px;
  }
`;

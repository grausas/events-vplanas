import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  width: 350px;
  max-height: 600px;
  padding: 20px;
  top: 50px;
  border-radius: 5px;
  right: 20px;
  background-color: var(--white);
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
`;

export const Content = styled.div`
  div {
    margin-top: 15px;
  }
`;

export const Close = styled.div`
  text-align: right;
  position: absolute;
  right: 10px;
  top: 10px;

  img {
    width: 25px;
    height: 25px;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;

    :hover {
      background-color: #eee;
    }
  }
`;

export const Title = styled.div`
  margin-bottom: 20px;
  padding-top: 20px;

  h3 {
    font-weight: 500;
  }
`;

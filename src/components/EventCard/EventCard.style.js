import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  width: 400px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 25px;
    height: 25px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
    padding: 5px;
    cursor: pointer;

    :hover {
      background-color: #eee;
    }
  }
`;

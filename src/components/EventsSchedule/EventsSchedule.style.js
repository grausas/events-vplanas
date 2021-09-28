import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  width: 300px;
  height: 80%;
  left: 20px;
  top: 10%;
  /* padding: 25px 0; */
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  overflow: auto;
`;

export const Content = styled.div`
  padding: 0 20px 20px 20px;
  overflow: auto;

  div {
    border-bottom: 1px solid var(--grey);
    padding: 10px 0;
  }
`;

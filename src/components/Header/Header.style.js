import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--dark);
  z-index: 2;
  padding: 0 20px;
  height: 50px;
`;

export const Content = styled.div`
  max-width: 1920px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  span {
    color: var(--white);
  }
`;

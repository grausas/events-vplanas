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
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

export const Logo = styled.img`
  width: 45px;
`;

export const LinksDiv = styled.div`
  position: absolute;
  background-color: var(--white);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  top: 45px;
  right: 0;

  a {
    text-decoration: none;
    color: var(--dark);
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style-type: none;

    &:hover {
      color: var(--lightBlue);
      text-decoration: underline;
    }
  }
`;

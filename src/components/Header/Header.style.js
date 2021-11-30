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

export const LogoDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  width: 45px;
`;

export const Text = styled.span`
  color: var(--silver);
  font-size: var(--big);
  margin-left: 1rem;
`;

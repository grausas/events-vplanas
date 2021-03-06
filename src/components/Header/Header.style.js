import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--dark);
  z-index: 2;
  padding: 0 20px;
  height: 50px;

  @media screen and (max-width: 768px) {
    padding: 0 10px;
    height: 40px;
  }
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
  height: 40px;

  @media screen and (max-width: 768px) {
    height: 35px;
  }
`;

export const Text = styled.span`
  color: var(--silver);
  font-size: var(--fontBig);
  margin-left: 1rem;

  @media screen and (max-width: 768px) {
    font-size: var(--fontSmall);
    line-height: 18px;
    margin-left: 0.7rem;
  }
`;

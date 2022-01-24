import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 20px;
  bottom: 30px;
  border: 1px solid var(--darkSilver);
  border-radius: 10px;
  padding: 3px;
  background-color: var(--white);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  opacity: 0.8;
`;

export const Button = styled.button`
  border: none;
  font-size: var(--fontMed);
  font-weight: 700;
  background: none;
  padding: 2px 8px;
  cursor: pointer;

  &:hover {
    color: var(--grey);
  }

  :nth-child(1) {
    border-bottom: 1px solid var(--darkSilver);
  }
  :nth-child(2) {
    border-top: 1px solid var(--darkSilver);
  }
`;

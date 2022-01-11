import styled from "styled-components";

export const InputDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: unset;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.1rem 0.4rem 0.1rem 1.5rem;
  font-size: 1rem;
  border: none;
  color: var(--dark);
  box-sizing: border-box;
  outline: none;
  border-radius: 5px;
  border: 1px solid var(--darkSilver);

  &&:focus {
    outline: none;
    border-color: var(--lightBlue);
  }
`;

export const Icon = styled.img`
  position: absolute;
  left: 0px;
  z-index: 1;
  width: 28px;
  padding: 0 0.3rem;
`;

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
  padding: 0.3rem 2.2rem;
  font-size: 1em;
  border: none;
  color: var(--dark);
  box-sizing: border-box;
  outline: none;
  border-radius: 5px;
  border: 2px solid var(--dark);

  &&:focus {
    outline: none;
    border-color: var(--lightBlue);
  }
`;

export const Icon = styled.img`
  position: absolute;
  left: 0;
  z-index: 1;
  width: 40px;
  padding: 0 0.7rem;
`;
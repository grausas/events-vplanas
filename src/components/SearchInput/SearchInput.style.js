import styled from "styled-components";

export const InputDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: unset;
  padding: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.3rem 1.8rem;
  font-size: 1em;
  border: none;
  color: var(--dark);
  box-sizing: border-box;
  outline: none;
  border-radius: 5px;
  border: 1px solid var(--silver);

  &&:focus {
    outline: none;
    border-color: var(--lightBlue);
  }
`;

export const Icon = styled.img`
  position: absolute;
  left: 3px;
  z-index: 1;
  width: 40px;
  padding: 0 0.7rem;
`;

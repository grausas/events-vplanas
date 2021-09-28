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
  padding: 0.2em 2.2em;
  font-size: 1em;
  border: none;
  color: #111;
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
  color: #292f38;
  z-index: 1;
  left: 0;
  padding: 0 1em;
`;

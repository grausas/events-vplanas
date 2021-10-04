import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 0 1em;
  border: none;
  border-bottom: 1px solid var(--grey);
  background: var(--white);
  box-sizing: border-box;
  color: var(--dark);
  &:focus {
    border-bottom: 1px solid var(--lightBlue);
    outline: none;
  }
`;

export const Label = styled.label`
  font-size: 0.9rem;
`;

import styled from "styled-components";

export const Wrapper = styled.button`
  background: var(--lightBlue);
  color: var(--white);
  padding: 0.5rem 1.2rem;
  font-size: var(--font-small);
  font-weight: 600;
  border-radius: 10px;
  border: 1px solid var(--color-light);
  cursor: pointer;

  :hover {
    background: var(--white);
    color: var(--lightBlue);
    border: 1px solid var(--color-dark);
    transition: ease-in-out 0.2s;
  }
`;

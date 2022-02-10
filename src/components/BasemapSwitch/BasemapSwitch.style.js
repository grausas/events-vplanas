import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 30px;
  left: calc(50% - 90px);
  max-width: 200px;
  background: var(--white);
  border-radius: 10px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  user-select: none;
`;

export const BasemapDiv = styled.div`
  font-weight: 600;
  /* padding: 10px; */
  background: var(--white);
  border-radius: 5px;
  /* z-index: 2; */

  &:hover {
    color: var(--lightBlue);
  }

  :nth-child(1) input:checked + label {
    border-radius: 5px 0 0 5px;
  }

  :nth-child(2) input:checked + label {
    border-radius: 0 5px 5px 0;
  }

  label {
    display: block;
    padding: 5px 10px;
    cursor: pointer;
  }

  input {
    position: fixed;
    visibility: hidden;
  }

  input:checked + label {
    background: var(--grey);
    color: var(--white);
  }
`;

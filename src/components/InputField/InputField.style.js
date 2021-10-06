import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;

  && input:focus ~ label,
  input:valid ~ label {
    transform: translateY(-45px);
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 600;
    opacity: 1;
  }
`;

export const Label = styled.label`
  position: absolute;
  cursor: text;
  font-size: 0.9rem;
  transform: translate(20px, -20px);
  transition: all 0.3s ease-in-out;
  left: 0;
  bottom: -12px;
  opacity: 0.5;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0 1rem;
  height: 40px;
  border: none;
  border-bottom: 1px solid var(--grey);
  background: var(--white);
  box-sizing: border-box;
  color: var(--dark);
  font-size: 14px;

  &:focus {
    border-bottom: 2px solid var(--lightBlue);
    outline: none;
  }
`;

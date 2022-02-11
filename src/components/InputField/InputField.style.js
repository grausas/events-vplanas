import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 5px;
`;

export const Label = styled.label`
  cursor: text;
  font-size: 0.9rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0 1rem;
  height: 40px;
  border: 1px solid var(--darkSilver);
  border-radius: 5px;
  background: var(--white);
  box-sizing: border-box;
  color: var(--dark);
  font-size: var(--fontSmall);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);

  &:focus {
    border: 2px solid var(--lightBlue);
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  border: 1px solid var(--darkSilver);
  border-radius: 5px;
  box-sizing: border-box;
  padding: 5px 1rem;
  font-size: var(--fontSmall);
  resize: none;
  color: var(--dark);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);

  &:focus {
    border: 2px solid var(--lightBlue);
    outline: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0 1rem;
  height: 40px;
  border: 1px solid var(--darkSilver);
  border-radius: 5px;
  box-sizing: border-box;
  text-transform: capitalize;
  font-size: var(--fontSmall);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);

  &:focus {
    border: 2px solid var(--lightBlue);
    outline: none;
  }
`;

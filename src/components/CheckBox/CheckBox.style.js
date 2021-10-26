import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 10px 10px 0 0;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 0.9rem;

  :hover input ~ span {
    background-color: var(--silver);
  }

  input:checked ~ span {
    background-color: var(--lightBlue);
  }

  input:checked ~ span:after {
    display: block;
  }
`;

export const CheckInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const Span = styled.span`
  position: absolute;
  top: 2px;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: var(--darkSilver);
  border-radius: 5px;

  :after {
    content: "";
    position: absolute;
    display: none;
    left: 6px;
    top: 2px;
    width: 4px;
    height: 9px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

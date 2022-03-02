import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 20px;
  bottom: 30px;
  border: 1px solid var(--darkSilver);
  border-radius: 10px;
  padding: 5px;
  background-color: var(--white);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    left: 10px;
  }
`;

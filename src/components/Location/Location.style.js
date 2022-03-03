import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  right: 20px;
  bottom: 145px;
  border: 1px solid var(--darkSilver);
  border-radius: 10px;
  background-color: var(--white);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    display: flex;
  }

  [class*="esri-icon"] {
    font-size: 18px;
    padding: 7px;
    margin: 0;
    font-weight: 600;
    color: #111;
  }

  @media only screen and (max-width: 768px) {
    right: 10px;
  }
`;

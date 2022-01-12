import styled from "styled-components";
import logo from "../assets/icons/VILNIUS_LOGO.png";

export const LoginBlock = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 0;
  @media only screen and (max-width: 768px) {
    border-radius: 0;
    box-shadow: none;
    height: 100%;
  }
`;

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: flex-end; */
  width: 50%;
  background-color: #f7f9fb;
  padding: 8em 5em;
  border-radius: 0 20px 20px 0;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100vh;
    padding: 1em;
    border-radius: 0;
  }
  @media only screen and (max-width: 1024px) {
    padding: 4em 2em;
  }
`;

export const ImageDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 2em 6em;
  text-align: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 3em 1em;
  }
  span {
    position: relative;
    font-size: 2em;
    color: var(--darkSilver);
    span {
      color: var(--grey);
      text-decoration: underline;
    }
    @media only screen and (max-width: 768px) {
      font-size: 1em;
    }
  }
  &::before {
    content: " ";
    position: absolute;
    left: calc(50% - 100px);
    top: 10px;
    width: 200px;
    height: 100%;
    background-image: url(${logo});
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: contain;
    border-radius: 20px 0 0 20px;
    @media only screen and (max-width: 768px) {
      border-radius: 0;
    }
  }
`;

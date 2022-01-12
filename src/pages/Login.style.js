import styled from "styled-components";
import logo from "../assets/icons/VILNIUS_LOGO.png";

export const LoginBlock = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  padding: 0;
  @media only screen and (max-width: 768px) {
    border-radius: 0;
    box-shadow: none;
    height: 100%;
    flex-direction: column;
  }
`;

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  background-color: #f7f9fb;
  padding: 8em 5em;
  @media only screen and (max-width: 1024px) {
    padding: 4em 2em;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 3em 1em 1em 1em;
    border-radius: 0;
    justify-content: unset;
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
    height: 25%;
    padding: 2em 1em 1em 1em;
    /* align-items: flex-start; */
  }
  span {
    position: relative;
    font-size: 2em;
    color: var(--darkSilver);
    @media only screen and (max-width: 768px) {
      margin-top: 30px;
    }
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
    background-position: 50% 0%;
    background-size: contain;
    /* border-radius: 20px 0 0 20px; */
    @media only screen and (max-width: 768px) {
      border-radius: 0;
      width: 70px;
      left: calc(50% - 35px);
      background-position: 0% 0%;
    }
  }
`;

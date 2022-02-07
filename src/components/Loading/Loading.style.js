import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const Content = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1; */
`;

export const LoadingBlock = styled.div`
  text-align: center;
  max-width: 100%;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  img {
    width: 30px;
    margin: 2px;
    animation: loading 0.5s infinite alternate;
  }

  img:nth-of-type(2) {
    animation-delay: 0.1s;
  }
  img:nth-of-type(3) {
    animation-delay: 0.2s;
  }
  img:nth-of-type(4) {
    animation-delay: 0.3s;
  }
  img:nth-of-type(5) {
    animation-delay: 0.4s;
  }
  img:nth-of-type(6) {
    animation-delay: 0.5s;
  }
  img:nth-of-type(7) {
    animation-delay: 0.6s;
  }
  img:nth-of-type(8) {
    animation-delay: 0.7s;
  }

  @keyframes loading {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .sh1 {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 50px 50px 0 0;
    border-color: var(--red) transparent transparent transparent;
    margin: 0 auto;
    animation: shk1 1s ease-in-out infinite normal;
  }

  .sh2 {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 50px 50px;
    border-color: transparent transparent var(--lightBlue) transparent;
    margin: -50px auto 0;
    animation: shk2 1s ease-in-out infinite alternate;
  }

  /** animation starts here **/
  @keyframes shk1 {
    0% {
      transform: rotate(-360deg);
    }

    100% {
    }
  }

  @keyframes shk2 {
    0% {
      transform: rotate(360deg);
    }
    100% {
    }
  }

  .lt {
    color: #fff;
    font-family: "Roboto", sans-serif;
    margin: 30px auto;
    text-align: center;
    font-weight: 100;
    letter-spacing: 10px;
  }

  // senas loading
  /* &:before {
    content: "";
    width: 50px;
    height: 5px;
    background: var(--dark);
    opacity: 0.1;
    position: absolute;
    top: 59px;
    left: 0;
    border-radius: 50%;
    animation: shadow 0.5s linear infinite;
  }
  &:after {
    content: "";
    width: 50px;
    height: 50px;
    background: var(--lightBlue);
    animation: animate 0.5s linear infinite;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
  }
  @keyframes animate {
    17% {
      border-bottom-right-radius: 3px;
    }
    25% {
      transform: translateY(9px) rotate(22.5deg);
    }
    50% {
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
      border-bottom-right-radius: 40px;
    }
    75% {
      transform: translateY(9px) rotate(67.5deg);
    }
    100% {
      transform: translateY(0) rotate(90deg);
    }
  }
  @keyframes shadow {
    0%,
    100% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.2, 1);
    }
  } */
`;

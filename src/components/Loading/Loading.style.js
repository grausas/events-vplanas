import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 998;
`;

export const LoadingBlock = styled.div`
  text-align: center;
  width: 50px;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  span {
    position: absolute;
    top: -24px;
    left: -15px;
    background-color: var(--lightBlue);
    font-size: var(--fontMed);
    color: var(--silver);
    padding: 0 5px;
    border-radius: 5px;
  }

  img {
    position: absolute;
    height: 30px;
    z-index: 999;
    top: 10px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  &:before {
    content: "";
    width: 50px;
    height: 5px;
    background: var(--grey);
    opacity: 0.5;
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
    border-radius: 5px;
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
  }
`;

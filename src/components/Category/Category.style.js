import styled from "styled-components";

export const Wrapper = styled.div`
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 5px;
  color: var(--white);
  text-transform: uppercase;
  border-radius: 5px;
  background-color: ${(props) =>
    props.backgroundColor === 1
      ? "rgb(237,81,81,255)"
      : props.backgroundColor === 2
      ? "rgb(20,158,206,255)"
      : props.backgroundColor === 3
      ? "rgb(158,85,156,255)"
      : props.backgroundColor === 4
      ? "rgb(252,146,31,255)"
      : props.backgroundColor === 5
      ? "rgb(167,198,54,255)"
      : props.backgroundColor === 6
      ? "rgb(255,222,62,255)"
      : props.backgroundColor === 7
      ? "rgb(0,92,230,255)"
      : "rgb(255,115,223,255)"};
`;

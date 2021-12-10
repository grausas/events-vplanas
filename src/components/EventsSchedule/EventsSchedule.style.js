import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  width: 280px;
  max-height: 80%;
  left: 20px;
  top: 2%;
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  overflow: auto;
  background-color: ${(props) =>
    props.close ? "var(--grey)" : "var(--white)"};
  color: ${(props) => (props.close ? "var(--white)" : "none")};
  opacity: 0.9;
`;

export const Content = styled.div`
  position: relative;
  padding: 0 10px;
`;

export const Text = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.text ? "var(--white)" : "var(--grey)")};
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  z-index: 22;
  padding: 5px 10px;

  h3,
  span {
    font-size: 20px;
    font-weight: 600;
    height: inherit;
  }
`;

export const Events = styled.div`
  position: relative;
  padding: 5px 10px;
  border: 1px solid var(--silver);
  border-radius: 5px;
  margin-top: 10px;

  &:last-child {
    margin-bottom: 10px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 0 0 0 10px;
    top: 0;
    right: 0;
    background-color: ${(props) =>
      props.backgroundColor === 1
        ? "rgb(237,81,81,255)"
        : props.backgroundColor === 2
        ? "rgb(20,158,206,255)"
        : props.backgroundColor === 3
        ? "rgb(158,85,156,255)"
        : props.backgroundColor === 4
        ? "rgb(252,146,31,255)"
        : "rgb(167,198,54,255)"};
  }
`;

export const EventsText = styled.div`
  p {
    :first-child {
      font-weight: 600;
      font-size: 1rem;
    }
  }
`;

export const EventsTimestamp = styled.div`
  p {
    font-size: 0.8rem;
    margin: 0;
  }
`;

export const MoreButtonWrapper = styled.div`
  text-align: right;
`;

export const MoreButton = styled.button`
  border: none;
  color: var(--darkGrey);
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--darkSilver);
  }
`;

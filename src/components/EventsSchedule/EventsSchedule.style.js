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
`;

export const Text = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.text ? "var(--white)" : "var(--grey)")};
  justify-content: space-between;
  padding: 3px 10px;
  cursor: pointer;
  user-select: none;
  z-index: 22;

  h3,
  span {
    font-size: 20px;
    font-weight: 600;
    height: inherit;
  }
`;

export const Events = styled.div`
  border-bottom: 1px solid var(--silver);
  position: relative;

  &&:hover {
    opacity: 0.9;
  }

  :nth-child(odd) {
    border-left: 5px solid var(--lightBlue);
  }

  :nth-child(even) {
    border-right: 5px solid var(--lightBlue);
  }
`;

export const EventsTimestamp = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--silver);
  padding: 3px 10px;

  p {
    font-size: 0.9rem;
  }
`;

export const EventsText = styled.div`
  padding: 0 10px;
`;

import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  width: 300px;
  max-height: 80%;
  left: 20px;
  top: 10%;
  /* padding: 25px 0; */
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  overflow: auto;
  background-color: ${(props) => (props.close ? "var(--red)" : "none")};
  color: ${(props) => (props.close ? "var(--white)" : "none")};
`;

export const Content = styled.div`
  padding: 0 20px;
  overflow: auto;
`;

export const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  span {
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
  }
`;

export const Events = styled.div`
  margin-bottom: 20px;

  div {
    border-bottom: 1px solid var(--grey);
    padding: 10px 0;
  }
`;

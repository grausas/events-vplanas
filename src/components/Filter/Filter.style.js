import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: var(--red);
  border-radius: 5px;
  color: var(--white);
  left: 330px;
  top: 2%;
  padding: 9px 20px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  font-weight: 600;
  background-color: ${(props) => (props.close ? "var(--white)" : "none")};
  color: ${(props) => (props.close ? "var(--dark)" : "none")};

  span {
    font-size: 16px;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  margin-top: 10px;

  div {
    display: flex;
    align-items: center;
    padding: 5px 0;

    input {
      margin: 0 5px 0 0;
    }
  }
`;

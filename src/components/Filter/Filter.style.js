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
  padding: 8px 10px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.close ? "var(--white)" : "none")};
  color: ${(props) => (props.close ? "var(--dark)" : "none")};

  span {
    font-size: 16px;
    cursor: pointer;
    user-select: none;
    font-weight: 600;
  }
`;

export const Content = styled.div`
  margin-top: 10px;
  padding-right: 30px;

  div {
    display: flex;
    align-items: center;
    padding: 5px 0;

    input {
      margin: 0 7px 0 0;
      width: 18px;
      height: 18px;
    }
  }
`;

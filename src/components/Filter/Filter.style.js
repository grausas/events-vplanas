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
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  background-color: ${(props) => (props.close ? "var(--white)" : "none")};
  color: ${(props) => (props.close ? "var(--dark)" : "none")};
`;

export const IconFilter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 9px 8px;
  cursor: pointer;

  img {
    width: 23px;
    user-select: none;
  }
`;

export const Content = styled.div`
  margin-top: 10px;
  padding: 0 20px 0 10px;

  div {
    display: flex;
    flex-direction: row;
    padding: 5px 0;

    input {
      margin: 0 7px 0 0;
      width: 18px;
      height: 18px;
    }
  }
`;

import styled from "styled-components";
import Btn from "../Button/Button";

export const Wrapper = styled.div``;
export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled(Btn)`
  background-color: var(--grey);
  padding: 5px 20px;
  margin-top: 20px;
  margin-right: 10px;

  :hover {
    background: ${(props) =>
      props.type === "delete" ? "var(--red)" : "var(--lightBlue)"};
    color: var(--white);
  }
`;

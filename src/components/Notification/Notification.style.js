import styled from "styled-components";

export const NotificationText = styled.p`
  color: #fff;
  background-color: ${(props) =>
    props.type === "error" ? "var(--red)" : "var(--silver)"};
  text-align: center;
  margin: 0;
  border-radius: 5px;
  padding: 0.5em 0.5em;
  opacity: 0.8;
`;

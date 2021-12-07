import styled from "styled-components";

export const NotificationText = styled.div`
  position: absolute;
  display: flex;
  left: 45%;
  top: 60px;
  color: #fff;
  background-color: ${(props) =>
    props.type === "error" ? "var(--red)" : "var(--green)"};
  text-align: center;
  margin: 0;
  border-radius: 5px;
  padding: 0.3em 0.5em;
  opacity: 0.8;
  z-index: 999;
`;

export const IconDiv = styled.div`
  background-color: var(--white);
  display: flex;
  margin-right: 5px;

  padding: 0;

  img {
    width: 25px;
  }
`;

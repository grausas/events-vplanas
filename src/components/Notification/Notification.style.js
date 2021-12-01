import styled from "styled-components";

export const NotificationText = styled.div`
  position: absolute;
  display: flex;
  left: 50%;
  top: 10px;
  color: #fff;
  background-color: ${(props) =>
    props.type === "error" ? "var(--red)" : "var(--grey)"};
  text-align: center;
  margin: 0;
  border-radius: 5px;
  padding: 0.3em 0.5em;
  opacity: 0.8;
`;

export const IconDiv = styled.div`
  background-color: var(--white);
  display: flex;
  margin-right: 10px;

  padding: 0;

  img {
    width: 25px;
  }
`;

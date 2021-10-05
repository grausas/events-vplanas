import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: var(--grey);
  border-radius: 5px;
  color: var(--white);
  left: 310px;
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
  font-weight: 600;

  img {
    width: 23px;
    user-select: none;
  }
`;

export const Content = styled.div`
  margin-top: 5px;
  padding: 0 10px;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    height: 35px;

    span {
      font-weight: 600;
      font-size: 20px;
      height: inherit;
    }
  }
`;

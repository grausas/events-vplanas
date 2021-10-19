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
  font-weight: 600;

  img {
    width: 23px;
    user-select: none;
  }

  div {
    display: flex;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  max-width: 400px;
  padding: 0 10px;
  user-select: none;

  span {
    font-weight: 600;
    font-size: var(--big);
  }
`;

export const DateFilter = styled.div`
  display: flex;
`;

export const FilterContent = styled.div`
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
`;

export const CloseImage = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;

  :hover {
    background-color: var(--white);
  }
`;

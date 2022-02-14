import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  max-width: 500px;
  width: 100%;
  background: var(--white);
  padding: 0 10px;
  margin-top: 5px;

  h2 {
    text-align: center;
    z-index: 1;
    background: var(--silver);
    padding-bottom: 10px;
  }
`;

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  &&:after {
    background-color: var(--grey);
    content: "";
    position: absolute;
    left: calc(0% + 3px);
    width: 2px;
    height: 100%;
  }
`;

export const TimelineItem = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-left: 25px;
  position: relative;
  margin: 5px 0;
  width: 100%;
`;

export const ItemContent = styled.div`
  border-radius: 5px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 15px;
  position: relative;
  width: 100%;
  box-shadow: ${(props) =>
    props.clickedEvent === "clicked"
      ? "0 0 8px rgba(12, 12, 121, 0.9)"
      : "0 0 8px rgba(0, 0, 0, 0.3)"};
  background: var(--white);

  &:hover {
    box-shadow: 0 0 5px rgba(12, 12, 121, 0.7);
    cursor: pointer;
  }

  &:after {
    content: " ";
    background-color: var(--white);
    box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.2);
    position: absolute;
    left: -5.5px;
    right: auto;
    top: calc(50% - 7.5px);
    transform: rotate(45deg);
    width: 12px;
    height: 12px;
    background: var(--white);
  }
`;

export const CategoryDiv = styled.span`
  width: 100%;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
`;

export const EventDate = styled.span`
  width: 100%;
  color: var(--grey);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;

  img {
    width: 22px;
    margin-right: 5px;
  }
`;

export const Text = styled.p`
  width: 100%;
  font-size: var(--fontMed);
  margin: 45px 0 15px 0;
  font-weight: 600;
  text-align: center;
`;

export const Circle = styled.span`
  background-color: var(--grey);
  border: 1px solid var(--white);
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 10px);
  left: -29px;
  width: 16px;
  height: 16px;
`;

export const Close = styled.div`
  position: absolute;
  top: 2px;
  right: 0px;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover {
    color: var(--lightBlue);
  }
`;

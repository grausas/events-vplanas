import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-height: 70vh;
  height: 100%;
  background: var(--white);
  padding: 0 10px;
  overflow: auto;

  h2 {
    text-align: center;
    background: var(--white);
    padding-bottom: 10px;
    padding-top: 10px;
  }
`;

export const BackButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;

  span {
    padding: 0 80px;
    border-radius: 5px;
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid var(--darkSilver);
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);

    font-weight: 600;

    &:hover {
      background-color: var(--silver);
    }

    img {
      width: 18px;
      margin-right: 5px;
    }
  }
`;

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  &&:after {
    content: "";
    background-color: var(--grey);
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

  @media only screen and (max-width: 1280px) {
    padding: 5px 10px;
  }
`;

export const CategoryDiv = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: 0;
`;

export const EventDate = styled.span`
  width: 100%;
  color: var(--grey);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-left: 0 auto;

  img {
    width: 22px;
    height: 22px;
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
  border: 1px solid var(--grey);
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 8px);
  left: -28px;
  width: 14px;
  height: 14px;
  z-index: 1;
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

export const LongDate = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 12px;
    font-weight: 700;
  }
`;

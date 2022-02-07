import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  max-width: 500px;
  width: 100%;
  background: var(--silver);
  overflow: auto;
  padding-right: 5px;
`;

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 20px 0 10px 0;

  &&:after {
    background-color: var(--grey);
    content: "";
    position: absolute;
    left: calc(0% + 8px);
    width: 2px;
    height: 100%;
  }
`;

export const TimelineItem = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-left: 30px;
  position: relative;
  margin: 5px 0;
  width: 100%;
`;

export const ItemContent = styled.div`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 15px;
  position: relative;
  width: 100%;

  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
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
  }
`;

export const Category = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 5px;
  color: var(--white);
  text-transform: uppercase;
  border-radius: 5px;
  background-color: ${(props) =>
    props.backgroundColor === 1
      ? "rgb(237,81,81,255)"
      : props.backgroundColor === 2
      ? "rgb(20,158,206,255)"
      : props.backgroundColor === 3
      ? "rgb(158,85,156,255)"
      : props.backgroundColor === 4
      ? "rgb(252,146,31,255)"
      : props.backgroundColor === 5
      ? "rgb(167,198,54,255)"
      : props.backgroundColor === 6
      ? "rgb(255,222,62,255)"
      : props.backgroundColor === 7
      ? "rgb(0,92,230,255)"
      : "rgb(255,115,223,255)"};
`;

export const EventDate = styled.span`
  color: var(--grey);
  font-size: 12px;
  font-weight: 700;
`;

export const Text = styled.p`
  font-size: var(--fontMed);
  line-height: 20px;
  margin: 15px 0;
`;

export const Circle = styled.span`
  background-color: var(--white);
  border: 2px solid var(--grey);
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 10px);
  left: -29px;
  width: 16px;
  height: 16px;
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
  z-index: 5;

  :hover {
    color: var(--lightBlue);
  }
`;

export const MoreButton = styled.span`
  font-weight: 600;
  cursor: pointer;

  &::after {
    content: " ►";
    font-size: 12px;
  }
  &:hover {
    color: var(--lightBlue);
  }
`;

export const CloseImage = styled.img`
  width: 16px;
  padding: 3px;
`;

export const ClearButton = styled.span``;

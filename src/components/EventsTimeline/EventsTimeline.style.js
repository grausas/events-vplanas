import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  max-width: 500px;
  width: 100%;
  max-height: 80%;
  background: var(--silver);
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  opacity: 0.9;
  overflow: auto;
`;

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 10px;

  &&:after {
    background-color: var(--red);
    content: "";
    position: absolute;
    left: calc(0% -2px);
    width: 4px;
    height: 100%;
  }
`;

export const TimelineItem = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-left: 20px;
  position: relative;
  margin: 10px 0;
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
  text-align: right;

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
  background-color: ${(props) =>
    props.backgroundColor === 1
      ? "rgb(237,81,81,255)"
      : props.backgroundColor === 2
      ? "rgb(20,158,206,255)"
      : props.backgroundColor === 3
      ? "rgb(158,85,156,255)"
      : props.backgroundColor === 4
      ? "rgb(252,146,31,255)"
      : "rgb(167,198,54,255)"};
`;

export const EventDate = styled.span`
  color: var(--grey);
  font-size: 12px;
  font-weight: 700;
`;

export const Text = styled.p`
  font-size: var(--fontMed);
  line-height: 24px;
  margin: 15px 0;
`;

export const Circle = styled.span`
  background-color: var(--white);
  border: 3px solid var(--red);
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 10px);
  left: -26px;
  width: 16px;
  height: 16px;
  z-index: 100;
`;
export const Close = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 3px;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 5;

  :hover {
    background-color: var(--darkSilver);
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

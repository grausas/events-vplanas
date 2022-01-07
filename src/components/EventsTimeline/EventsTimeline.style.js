import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  background: var(--silver);
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  opacity: 0.9;
`;

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 10px;

  &&:after {
    background-color: #e17b77;
    content: "";
    position: absolute;
    left: calc(50% - 2px);
    width: 4px;
    height: 100%;
  }
`;

export const TimelineItem = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  position: relative;
  margin: 10px 0;
  width: 50%;

  &:nth-child(odd) {
    align-self: flex-end;
    justify-content: flex-start;
    padding-left: 20px;
    padding-right: 10px;
  }
`;

export const ItemContent = styled.div`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 15px;
  position: relative;
  width: 400px;
  max-width: 100%;
  text-align: right;

  ${TimelineItem}:nth-child(odd) & {
    text-align: left;
    align-items: flex-start;
  }

  ${TimelineItem}:nth-child(odd) &:after {
    right: auto;
    left: -7.5px;
    box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.2);
  }

  &:after {
    content: " ";
    background-color: #fff;
    box-shadow: 1px -1px 1px rgba(0, 0, 0, 0.2);
    position: absolute;
    right: -7.5px;
    top: calc(50% - 7.5px);
    transform: rotate(45deg);
    width: 15px;
    height: 15px;
  }
`;

export const Category = styled.span`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  top: 5px;
  left: 5px;
  letter-spacing: 1px;
  padding: 5px;
  position: absolute;
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

  ${TimelineItem}:nth-child(odd) & {
    left: auto;
    right: 5px;
  }
`;

export const Date = styled.span`
  color: #777;
  font-size: 12px;
  font-weight: bold;
`;

export const Text = styled.p`
  font-size: 16px;
  line-height: 24px;
  margin: 15px 0;
  max-width: 250px;
`;

export const Circle = styled.span`
  background-color: #fff;
  border: 3px solid #e17b77;
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 10px);
  right: -30px;
  width: 20px;
  height: 20px;
  z-index: 100;

  ${TimelineItem}:nth-child(odd) & {
    right: auto;
    left: -30px;
  }
`;

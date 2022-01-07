import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  background: var(--silver);
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
`;

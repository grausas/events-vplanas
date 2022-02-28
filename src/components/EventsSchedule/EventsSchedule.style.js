import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  width: ${(props) => (props.close ? "260px" : "400px")};
  max-height: 90%;
  /* height: 100%; */
  left: 20px;
  top: 10px;
  border-radius: 5px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  background-color: ${(props) =>
    props.close ? "var(--grey)" : "var(--white)"};
  color: ${(props) => (props.close ? "var(--white)" : "none")};

  @media only screen and (max-width: 768px) {
    left: 10px;
    top: 5px;
    width: ${(props) => (props.close ? "120px" : "95%")};
    max-height: 99%;
  }
`;

export const Content = styled.div`
  /* padding: 0 10px; */
  /* position: absolute; */
  /* max-height: 100%; */
  /* max-height: 75vh; */
  overflow: hidden;
`;

export const Text = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.text ? "var(--white)" : "var(--grey)")};
  padding: 5px 10px;
  user-select: none;
  cursor: pointer;
  z-index: 1;

  h3,
  span {
    font-size: var(--fontBig);
    font-weight: 600;
    height: inherit;

    @media only screen and (max-width: 768px) {
      font-size: var(--fontMed);
      padding: 0px;
    }
  }
`;

export const EventsText = styled.div`
  p {
    :first-child {
      font-weight: 600;
      font-size: 1rem;
    }
  }
`;

export const EventsTimestamp = styled.div`
  p {
    font-size: 0.8rem;
    margin: 0;
  }
`;

export const MoreButtonWrapper = styled.div`
  text-align: right;
`;

export const MoreButton = styled.button`
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: var(--darkSilver);
  }
`;

export const SearchDiv = styled.div`
  position: sticky;
  width: 100%;
  top: 39px;
  padding: 2px 10px 5px 10px;
  background: var(--white);
  z-index: 1;

  @media only screen and (max-width: 768px) {
    top: 34px;
    padding: 2px 5px 5px 5px;
  }
`;

export const FilterDiv = styled.div`
  position: sticky;
  top: 75px;
  z-index: 1;

  @media only screen and (max-width: 768px) {
    top: 70px;
  }
`;

export const CloseImage = styled.img`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 28px;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;

  :hover {
    background-color: var(--silver);
  }
`;
export const ExpandImage = styled.img`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    width: 25px;
    right: 0px;
    top: 5px;
  }
`;

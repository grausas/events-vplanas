import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  z-index: 222;

  &:nth-child(1) {
    margin-right: 10px;
  }

  .react-datepicker__input-container input {
    width: 100%;
    height: 100%;
    padding: 0 0.5rem;
    border: 1px solid var(--darkSilver);
    border-radius: 5px;
    background: var(--white);
    box-sizing: border-box;
    color: var(--dark);
    font-size: 14px;

    &:focus {
      border: 2px solid var(--lightBlue);
      outline: none;
    }
  }
`;

export const DatePickerWrapper = styled.div`
  position: relative;
  z-index: 222;
  margin-bottom: 5px;
  height: ${(props) => (props.height === "small" ? "45px" : "60px")};
  flex-grow: 2;
  display: ${(props) => (props.display ? "none" : "block")};

  &:nth-child(2) {
    margin-left: 20px;
  }

  .react-datepicker-wrapper {
    height: 60%;
  }

  .react-datepicker__input-container {
    height: 100%;
  }
`;

export const CustomButton = styled.input`
  width: 100%;
  text-align: left;
  padding: 0.45rem 1rem;
  font-size: 0.9rem;
  background: var(--white);
  border: 1px solid var(--darkSilver);
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);

  &:focus {
    border: 2px solid var(--lightBlue);
    outline: none;
  }
`;

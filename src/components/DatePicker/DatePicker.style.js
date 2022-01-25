import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;

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
  margin-bottom: 10px;
  height: ${(props) => (props.height === "small" ? "50px" : "60px")};
  flex-grow: 2;
  display: ${(props) => (props.display ? "none" : "block")};

  .react-datepicker-wrapper {
    height: 60%;
  }

  .react-datepicker__input-container {
    height: 100%;
  }

  :not(:last-child) {
    margin-right: 10px;
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

  &:focus {
    border: 2px solid var(--lightBlue);
    outline: none;
  }
`;

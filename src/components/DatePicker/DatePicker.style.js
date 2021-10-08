import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;

  .react-datepicker__input-container input {
    width: 100%;
    padding: 0 1rem;
    height: 40px;
    border: 1px solid var(--grey);
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
  :not(:last-child) {
    margin-right: 10px;
  }
`;
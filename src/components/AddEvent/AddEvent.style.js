import styled from "styled-components";
import Button from "../Button/Button";

export const AddObjectButton = styled.div`
  position: absolute;
  max-height: 600px;
  top: 2%;
  border-radius: 5px;
  right: 20px;
  padding: 5px 10px;
  background: var(--grey);
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
  opacity: 0.9;
`;

export const FormWrapper = styled.div`
  position: absolute;
  margin: 0 auto;
  max-width: 500px;
  max-height: 80vh;
  width: ${(props) => (props.isEditing ? "220px" : "100%")};
  border-radius: 5px;
  top: 2%;
  right: ${(props) => (props.isEditing ? "20px" : "")};
  left: ${(props) => (props.isEditing ? "" : "calc(50% - 175px)")};
  background-color: var(--white);
  color: var(--dark);
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;

  h3 {
    margin: 10px 0;
  }

  p {
    font-size: var(--big);
    font-weight: 600;
    margin-bottom: 5px;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  text-align: left;

  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input {
    width: 100%;
    padding: 0 1rem;
    height: 40px;
    border: 1px solid var(--darkSilver);
    border-radius: 5px;
    background: var(--white);
    box-sizing: border-box;
    color: var(--dark);
    font-size: 14px;
  }

  .react-autosuggest__input--focused {
    border: 2px solid var(--lightBlue);
    outline: none;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 40px;
    width: 280px;
    border: 1px solid var(--darkSilver);
    background-color: var(--white);
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: var(--silver);
  }
`;

export const CloseImage = styled.img`
  position: absolute;
  width: 22px;
  right: 5px;
  top: 5px;
  border-radius: 50%;
  padding: 3px;
  cursor: pointer;

  &:hover {
    background-color: var(--silver);
  }
`;

export const ConfirmButton = styled(Button)`
  background-color: var(--grey);
  padding: 5px 10px;
  margin-right: 10px;
  font-size: var(--fontSmall);

  :hover {
    background: var(--lightBlue);
    color: var(--white);
  }
`;

export const CheckBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

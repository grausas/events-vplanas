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
`;

export const CloseImage = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
`;

export const ConfirmButton = styled(Button)`
  background-color: var(--grey);
  padding: 5px 20px;
  margin-right: 10px;

  :hover {
    background: var(--lightBlue);
    color: var(--white);
  }
`;

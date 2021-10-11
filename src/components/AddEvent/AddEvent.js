// Styles
import {
  Close,
  FormWrapper,
  InputWrapper,
  CloseImage,
  ConfirmButton,
} from "./AddEvent.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
//icons
import CloseIcon from "../../assets/icons/close.png";

const AddEvent = ({
  children,
  handleSubmit,
  handleCordinates,
  titleText,
  buttonText,
}) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <div>
      {!show ? (
        <Close>
          <span onClick={handleOpen}>Pridėti</span>
        </Close>
      ) : (
        <FormWrapper>
          <button onClick={handleCordinates}>Pažymėti kordinates</button>
          <form onSubmit={handleSubmit}>
            <h3>{titleText}</h3>
            <CloseImage src={CloseIcon} alt="close-icon" onClick={handleOpen} />
            <InputWrapper>{children}</InputWrapper>
            <ConfirmButton>{buttonText}</ConfirmButton>
          </form>
        </FormWrapper>
      )}
    </div>
  );
};

export default AddEvent;

// Styles
import {
  Close,
  FormWrapper,
  InputWrapper,
  CloseImage,
  ConfirmButton,
} from "./AddFeature.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
//icons
import CloseIcon from "../../assets/icons/close.png";

const AddFeature = ({ children, handleSubmit, titleText, buttonText }) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <div>
      {!show ? (
        <Close>
          <span onClick={() => handleOpen(show)}>Pridėti</span>
        </Close>
      ) : (
        <FormWrapper>
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

export default AddFeature;

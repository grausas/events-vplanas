// Styles
import {
  Close,
  FormWrapper,
  InputWrapper,
  CloseImage,
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
          <span onClick={() => handleOpen(show)}>Add</span>
        </Close>
      ) : (
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <h3>{titleText}</h3>
            <CloseImage src={CloseIcon} alt="close-icon" onClick={handleOpen} />
            <InputWrapper>{children}</InputWrapper>
            <button type="submit">{buttonText}</button>
          </form>
        </FormWrapper>
      )}
    </div>
  );
};

export default AddFeature;

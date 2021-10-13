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
  buttonTitle,
  spanText,
  buttonText,
  isEditing,
  handleUpdate,
}) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <div>
      {!show ? (
        <Close>
          <span onClick={handleOpen}>Pridėti</span>
        </Close>
      ) : (
        <>
          <FormWrapper>
            <CloseImage src={CloseIcon} alt="close-icon" onClick={handleOpen} />
            {!isEditing ? (
              <>
                <span>Objektas pasirinktas</span>
                <button
                  onClick={() => {
                    handleUpdate();
                  }}
                >
                  Redaguoti Objekta
                </button>
                <form onSubmit={handleSubmit}>
                  <h3>{titleText}</h3>
                  <InputWrapper>{children}</InputWrapper>
                  <ConfirmButton>{buttonText}</ConfirmButton>
                </form>
              </>
            ) : (
              <>
                <ConfirmButton
                  handleClick={() => {
                    handleCordinates();
                  }}
                >
                  {buttonTitle}
                </ConfirmButton>
                <span>{spanText}</span>
              </>
            )}
          </FormWrapper>
        </>
      )}
    </div>
  );
};

export default AddEvent;

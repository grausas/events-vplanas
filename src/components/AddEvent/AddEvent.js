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
  isEditing,
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
                <p>Objektas pasirinktas</p>
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
                  Pažymėti objektą
                </ConfirmButton>
                <span>Pažymėti objektą kur vyks renginys</span>
              </>
            )}
          </FormWrapper>
        </>
      )}
    </div>
  );
};

export default AddEvent;

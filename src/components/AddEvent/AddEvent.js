// Styles
import {
  AddObjectButton,
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
  buttonTitleCancel,
  spanText,
  buttonText,
  isEditing,
  handleUpdate,
  handleCancel,
}) => {
  const { handleOpen, show } = useOpenClose();

  return (
    <div>
      {!show ? (
        <AddObjectButton>
          <span onClick={handleOpen}>Pridėti objektą</span>
        </AddObjectButton>
      ) : (
        <FormWrapper isEditing={isEditing}>
          <CloseImage src={CloseIcon} alt="close-icon" onClick={handleOpen} />
          {!isEditing ? (
            <>
              <ConfirmButton
                handleClick={() => {
                  handleUpdate();
                }}
              >
                Redaguoti objektą
              </ConfirmButton>
              <form onSubmit={handleSubmit}>
                <h3>{titleText}</h3>
                <InputWrapper>{children}</InputWrapper>
                <ConfirmButton>{buttonText}</ConfirmButton>
                <ConfirmButton
                  handleClick={() => {
                    handleCancel();
                  }}
                >
                  {buttonTitleCancel}
                </ConfirmButton>
              </form>
            </>
          ) : (
            <>
              <p>{spanText}</p>
              <ConfirmButton
                handleClick={() => {
                  handleCordinates();
                }}
              >
                {buttonTitle}
              </ConfirmButton>
            </>
          )}
        </FormWrapper>
      )}
    </div>
  );
};

export default AddEvent;

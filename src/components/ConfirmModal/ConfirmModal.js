//styles
import {
  Wrapper,
  ButtonDiv,
  ButtonWrapper,
  DeleteImage,
} from "./ConfirmModal.style";
// Icons
import DeleteIcon from "../../assets/icons/delete.svg";

const ConfirmModal = ({
  text,
  handleSubmit,
  handleCancel,
  confirmText,
  cancelText,
}) => {
  return (
    <Wrapper>
      <span>{text}</span>
      <ButtonWrapper>
        <ButtonDiv handleClick={handleSubmit}>
          <DeleteImage src={DeleteIcon} alt="delete-icon" />
          {confirmText}
        </ButtonDiv>
        <ButtonDiv handleClick={handleCancel}>{cancelText}</ButtonDiv>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ConfirmModal;

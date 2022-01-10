//styles
import { Wrapper, ButtonDiv, ButtonWrapper } from "./ConfirmModal.style";

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
        <ButtonDiv handleClick={handleSubmit}>{confirmText}</ButtonDiv>
        <ButtonDiv handleClick={handleCancel}>{cancelText}</ButtonDiv>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ConfirmModal;

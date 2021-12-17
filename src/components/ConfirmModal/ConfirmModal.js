//styles
import { Wrapper, ButtonDiv, ButtonWrapper } from "./ConfirmModal.style";

const ConfirmModal = ({ text, handleSubmit, handleCancel }) => {
  return (
    <Wrapper>
      <span>{text}</span>
      <ButtonWrapper>
        <ButtonDiv handleClick={handleSubmit}>Confirm</ButtonDiv>
        <ButtonDiv handleClick={handleCancel}>Cancel</ButtonDiv>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default ConfirmModal;

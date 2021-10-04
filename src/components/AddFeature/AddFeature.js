// Styles
import { Wrapper, InputWrapper } from "./AddFeature.style";

const AddFeature = ({ children, handleSubmit, titleText, buttonText }) => {
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h3>{titleText}</h3>
        <InputWrapper>{children}</InputWrapper>
        <button type="submit">{buttonText}</button>
      </form>
    </Wrapper>
  );
};

export default AddFeature;

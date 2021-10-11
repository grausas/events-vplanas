import { Wrapper } from "./Button.style";

const Button = ({ children, className, handleClick }) => {
  return (
    <Wrapper className={className} onClick={handleClick}>
      {children}
    </Wrapper>
  );
};

export default Button;

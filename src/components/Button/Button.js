// styles
import { Wrapper } from "./Button.style";

const Button = ({ children, className, handleClick, type }) => {
  return (
    <Wrapper className={className} onClick={handleClick} type={type}>
      {children}
    </Wrapper>
  );
};

export default Button;

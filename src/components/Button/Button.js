import { Wrapper } from "./Button.style";

const Button = ({ children, className }) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

export default Button;

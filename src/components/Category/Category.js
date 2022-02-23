// styles
import { Wrapper, Icon } from "./Category.style";

const Category = ({ bgColor, text, bgImage, display }) => {
  return (
    <Wrapper backgroundColor={bgColor}>
      <span>
        <Icon backgroundImage={bgImage} display={display}></Icon>
        {text}
      </span>
    </Wrapper>
  );
};

export default Category;

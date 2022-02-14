// styles
import { Wrapper, Icon } from "./Category.style";

//icons

const Category = ({ bgColor, text, bgImage, display }) => {
  return (
    <Wrapper backgroundColor={bgColor}>
      <span>
        <Icon backgroundImage={bgImage} display={display} />
        {text}
      </span>
    </Wrapper>
  );
};

export default Category;

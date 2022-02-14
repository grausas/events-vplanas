// styles
import { Wrapper, Icon } from "./Category.style";

//icons

const Category = ({ bgColor, text, bgImage }) => {
  return (
    <Wrapper backgroundColor={bgColor}>
      <span>
        <Icon backgroundImage={bgImage} />
        {text}
      </span>
    </Wrapper>
  );
};

export default Category;

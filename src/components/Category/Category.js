// styles
import { Wrapper } from "./Category.style";

const Category = ({ bgColor, text }) => {
  return <Wrapper backgroundColor={bgColor}>{text}</Wrapper>;
};

export default Category;

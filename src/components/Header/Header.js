// Components
import Button from "../Button/Button";

// Styles
import { Wrapper, Content } from "./Header.style";

const Header = () => {
  return (
    <Wrapper>
      <Content>
        <span>Renginiai</span>
        <Button>Pridėti</Button>
      </Content>
    </Wrapper>
  );
};

export default Header;

// Components
import Button from "../Button/Button";

// Styles
import { Wrapper, Content, Logo } from "./Header.style";

// Logo
import VilniusLogo from "../../assets/icons/VILNIUS_WHITE_LOGO.png";

const Header = () => {
  return (
    <Wrapper>
      <Content>
        <Logo src={VilniusLogo} alt="vilnius-logo" />
        <Button>Pridėti</Button>
      </Content>
    </Wrapper>
  );
};

export default Header;

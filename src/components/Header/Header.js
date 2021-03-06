// Styles
import { Wrapper, Content, LogoDiv, Logo, Text } from "./Header.style";
// Components
import { Button } from "../index";
// Logo
import VilniusLogo from "../../assets/icons/VILNIUS_WHITE_LOGO.png";

const Header = ({ isLoggedIn, logOut }) => {
  return (
    <Wrapper>
      <Content>
        <LogoDiv>
          <Logo src={VilniusLogo} alt="vilnius-logo" />
          <Text> Vilniaus miesto renginių žemėlapis</Text>
        </LogoDiv>
        {isLoggedIn && <Button handleClick={logOut}>Atsijungti</Button>}
      </Content>
    </Wrapper>
  );
};

export default Header;

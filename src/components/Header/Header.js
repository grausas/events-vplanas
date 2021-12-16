// Styles
import { Wrapper, Content, LogoDiv, Logo, Text } from "./Header.style";
// Components
import { SearchInput } from "../index";
// Logo
import VilniusLogo from "../../assets/icons/VILNIUS_WHITE_LOGO.png";

const Header = () => {
  return (
    <Wrapper>
      <Content>
        <LogoDiv>
          <Logo src={VilniusLogo} alt="vilnius-logo" />
          <Text> Vilniaus miesto renginių žemėlapis</Text>
        </LogoDiv>
        <SearchInput placeholder="Paieška" />
      </Content>
    </Wrapper>
  );
};

export default Header;

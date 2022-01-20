// Styles
import { Wrapper, Content, LogoDiv, Logo, Text } from "./Header.style";
import { Link } from "react-router-dom";
// Components
import { SearchInput, Button } from "../index";
// Logo
import VilniusLogo from "../../assets/icons/VILNIUS_WHITE_LOGO.png";

const Header = ({ isLoggedIn, logOut, handleSearch }) => {
  return (
    <Wrapper>
      <Content>
        <LogoDiv>
          <Logo src={VilniusLogo} alt="vilnius-logo" />
          <Text> Vilniaus miesto renginių žemėlapis</Text>
        </LogoDiv>
        {/* <SearchInput placeholder="Paieška" handleChange={handleSearch} /> */}
        {!isLoggedIn && (
          <button>
            <Link to="/Login">Prisijungti</Link>
          </button>
        )}

        {isLoggedIn && <Button handleClick={logOut}>Atsijungti</Button>}
      </Content>
    </Wrapper>
  );
};

export default Header;

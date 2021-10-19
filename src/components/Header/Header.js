// Components
import Button from "../Button/Button";

// Styles
import { Wrapper, Content, Logo, LinksDiv } from "./Header.style";

// hooks
import { useOpenClose } from "../../hooks/useOpenClose";

// Logo
import VilniusLogo from "../../assets/icons/VILNIUS_WHITE_LOGO.png";

const Header = () => {
  const { handleOpen, show } = useOpenClose();

  return (
    <Wrapper>
      <Content>
        <Logo src={VilniusLogo} alt="vilnius-logo" />

        <Button handleClick={handleOpen}>
          {!show ? "Pridėti" : "Uždaryti"}
        </Button>
        {show && (
          <LinksDiv>
            <ul>
              <a href="https://paslaugos.vilnius.lt/service-list/Globojamo-renginio-statuso-suteikimas">
                <li>Globojamo renginio statuso suteikimas</li>
              </a>
              <a href="https://paslaugos.vilnius.lt/service-list/Leidimu-organizuoti-renginius-isdavimas">
                <li>Leidimų organizuoti renginius išdavimas</li>
              </a>
            </ul>
          </LinksDiv>
        )}
      </Content>
    </Wrapper>
  );
};

export default Header;

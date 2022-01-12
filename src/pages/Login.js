import * as S from "./Login.style";
// import { useHistory } from "react-router-dom";
import { InputField, Button } from "../components/index";

function Login() {
  //   const history = useHistory();

  return (
    <>
      <S.LoginBlock>
        <S.ImageDiv>
          <span>
            Sveiki, prisijungę prie <span>Vilniaus renginių žemėlapio</span>
          </span>
        </S.ImageDiv>
        <S.FormDiv>
          <InputField type="text" placeholder="Prisijungimo vardas" />
          <InputField type="text" placeholder="Slaptažodis" />
          <Button>Prisijungti</Button>
        </S.FormDiv>
      </S.LoginBlock>
    </>
  );
}

export default Login;

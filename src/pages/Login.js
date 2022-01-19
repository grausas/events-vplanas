import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// context
import { AuthContext } from "../context/AuthContext";
// esri modules
import esriId from "@arcgis/core/identity/IdentityManager";
// styles
import * as S from "./Login.style";
//components
import { InputField, Button } from "../components/index";
// locale
import * as intl from "@arcgis/core/intl";

function Login() {
  intl.setLocale("lt");
  const auth = useContext(AuthContext);
  const history = useNavigate();

  const handleLogin = () => {
    esriId
      .getCredential(
        "https://services1.arcgis.com/usA3lHW20rGU6glp/ArcGIS/rest/services/Renginiai_Vilniuje_P/FeatureServer/0"
      )
      .then((res) => {
        auth.setToken(res.token);
        history("/");
      });
  };

  return (
    <>
      <S.LoginBlock>
        <S.ImageDiv>
          <span>
            <span>Vilniaus renginių žemėlapis</span>
          </span>
        </S.ImageDiv>
        <S.FormDiv>
          <span>Prisijungti prie renginių žemėlapio</span>
          <Button handleClick={handleLogin}>Prisijungti</Button>
        </S.FormDiv>
      </S.LoginBlock>
    </>
  );
}

export default Login;

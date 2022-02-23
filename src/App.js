import { useContext, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
//context
import { AuthContext } from "./context/AuthContext";
// Components
import { Header } from "./components/index";
//modules
import esriId from "@arcgis/core/identity/IdentityManager";
// pages
const Map = lazy(() => import("./pages/Map"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      {/* Sutvarkyti logout, nes dabar jeigu neperkraunu puslapio tai buna error */}
      {location.pathname === "/login" ? null : (
        <Header
          isLoggedIn={!!auth.token}
          logOut={() => {
            auth.setToken();
            localStorage.removeItem("setupTime", "token");
            esriId.destroyCredentials();
            window.location.reload();
          }}
        />
      )}

      <Suspense fallback={<></>}>
        <Routes>
          <Route exact path="/" element={<Map />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

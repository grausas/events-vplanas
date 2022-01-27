import { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
//context
import { AuthContext } from "./context/AuthContext";
// Components
import { Header } from "./components/index";
// pages
import Map from "./pages/Map";
import Login from "./pages/Login";

import esriId from "@arcgis/core/identity/IdentityManager";

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

      <Routes>
        <Route exact path="/" element={<Map />} />
        <Route exact path="/Login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;

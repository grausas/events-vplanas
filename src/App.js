import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  return (
    <BrowserRouter basename="/renginiai">
      {/* Sutvarkyti logout, nes dabar jeigu neperkraunu puslapio tai buna error */}
      <Header
        isLoggedIn={!!auth.token}
        logOut={() => {
          auth.setToken();
          localStorage.removeItem("token");
          esriId.destroyCredentials();
          window.location.reload();
        }}
      />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import { Header } from "./components/index";
// pages
import Map from "./pages/Map";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter basename="/renginiai">
      <Header />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

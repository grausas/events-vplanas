import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";

import "./index.css";

// Styles
import { GlobalStyle } from "./styles/GlobalStyle";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalStyle />
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";

// Styles
import { GlobalStyle } from "./styles/GlobalStyle";

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/renginiai">
      <AuthProvider>
        <GlobalStyle />
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

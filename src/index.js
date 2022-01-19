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
    <AuthProvider>
      <Router basename="renginiai">
        <GlobalStyle />
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

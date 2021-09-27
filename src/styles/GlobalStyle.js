import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --maxWidth: 1280px;
    --white: #fff;
    --grey: #6e6d7a;
    --blue: #274690;
    --lightBlue: #576CA8;
    --darkBlue: #1B264F;
    --dark: #302B27;
    --fontSuperBig: 2.5rem;
    --fontBig: 1.5rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
  }

  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;

    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--dark);
    }

    h3 {
      font-size: 1.1rem;
      font-weight: 500;
      margin: 0;
    }

    h5 {
      font-size: 0.8rem;
      text-transform: uppercase;
      font-weight: 400;
      margin: 0;
    }

    p, span {
      font-size: 0.9rem;
      color: var(--dark);
      margin: 0;
    }
  }
`;

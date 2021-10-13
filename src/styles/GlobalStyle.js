import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --maxWidth: 1280px;
    --white: #FFFFFF;
    --silver: #AFAFAF;
    --grey: #53565d;
    --blue: #274690;
    --lightBlue: #00A0E3;
    --dark: #302B27;
    --red: #ed1c24;
    --fontSuperBig: 2.5rem;
    --fontBig: 1.5rem;
    --fontMed: 1.2rem;
    --fontSmall: 1rem;
  }

  * {
    box-sizing: border-box;
    font-family: 'Titillium Web', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;

    h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--dark);
    }

    h2 {
      font-size: 1.3rem;
      font-weight: 600;
      margin: 0;
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

    p, span, a {
      font-size: 0.9rem;
      margin: 0;
    }
  }
`;

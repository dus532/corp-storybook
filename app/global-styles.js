import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  h3{
    margin:0;
    padding:0;
    font-size:1.5rem;
    font-weight:500;
  }
  
  h4{
    margin:0;
    padding:0;
    font-size:1rem;
    font-weight:500;
  }
  
  h5{
    margin:0;
    padding:0;
    font-size:0.8rem;
    font-weight:500;
  }

  h6{
    margin:0;
    padding:0;
    font-size:0.6rem;
    font-weight:500;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    word-break:keep-all;
  }

  body {
    font-family: Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }

  input {
    outline:none;
  }
`;

export default GlobalStyle;

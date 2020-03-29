import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ul{
    margin:0;
  }
  h2{
      margin:0;
      padding:0;
      font-size:1.8rem;
      font-weight:500;
  }

  h3{
    margin:0;
    padding:0;
    font-size:1.1rem;
    font-weight:normal;
    letter-spacing:-0.2px;
  }
  
  h4{
    margin:0;
    padding:0;
    font-size:1rem;
    font-weight:normal;
  }
  
  h5{
    margin:0;
    padding:0;
    font-size:0.8rem;
    font-weight:normal;
  }

  h6{
    margin:0;
    padding:0;
    font-size:0.6rem;
    font-weight:normal;
  }

  button{
    background:none;
  }

  .container{
    max-width:1200px;
    margin: 0 auto;
    height:100%;
  }

  button,
  button:active,
  button:focus{
    outline:none;
    border:none;
    cursor:pointer;
  }
  
  button span{
      position: relative;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    word-break:keep-all;
    background:#F7F7F7;
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

  a{
    text-decoration:none;
  }

  a{
    color:inherit;
  }

  @media screen and (max-width: 768px) {
    h2{
      font-size:1.3em;
    };
  }
`;

export default GlobalStyle;

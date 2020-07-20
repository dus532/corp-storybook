import { createGlobalStyle } from 'styled-components';

import Color from 'config/color';

const GlobalStyle = createGlobalStyle`
  
  :root {
    --primary700: #101c4c;
    --primary600: #182a72;
    --primary500: #203898;
    --primary400: #2946be;
    --primary300: #a9b5e5;
    --primary200: #e1e7ff;
    --primary100: #f4f5fb;
    --deepgrey: #343742;
    --grey500: #525561;
    --grey400: #8d909d;
    --grey300: #b9bcc1;
    --grey200: #dcdee1;
    --grey100: #f5f6f6;
    --red: #fc2b38;
    --orange: #ffa100;
    --green400: #44c46d;
    --black: #141721;
    --white: #ffffff;
  }


  *:active {
      -webkit-tap-highlight-color: transparent;
      outline: none;
      -ms-touch-action: inherit;
      touch-action: inherit;
  }

  ul{
    margin:0;
  }
  h1{
      margin:0;
      padding:0;
      font-size:32px;
      font-weight:500;
  }

  h2{
      margin:0;
      padding:0;
      font-size:24px;
      font-weight:500;
  }

  h3{
    margin:0;
    padding:0;
    font-size:18px;
    font-weight:normal;
    letter-spacing:-0.2px;
  }
  
  h4{
    margin:0;
    padding:0;
    font-size:16px;
    font-weight:normal;
  }
  
  h5{
    margin:0;
    padding:0;
    font-size:14px;
    font-weight:normal;
  }

  h6{
    margin:0;
    padding:0;
    font-size:12px;
    font-weight:normal;
  }

  sub{
    vertical-align: none;
    font-size:11px;
  }

  .fs01{
    font-size:1.1rem;
  }

  .subbutton_size{
    font-size:0.8rem;
  }

  hr {
    width:100%;
    height:1px;
    background:${Color.LineGray};
    border:none;
  }

  .error{
    color:${Color.Red}
  }

  button{
    background:none;
  }

  .container{
    max-width:1200px;
    margin: 0 auto;
    height:100%;
  }

  .modal_open {
    height: 100vh;
    overflow-y: hidden;
  }

  button{
    border:0;
    outline:none;
    cursor:pointer;
  }

  button:active,
  button:focus{
    outline:none;
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
    font-family: 'Roboto', Noto Sans CJK KR, 'Noto Sans KR' ,  Helvetica, Arial, sans-serif;

  }

  .mobile{
    display:none;
  }

  #app {
    width:100%;
    min-height: 100%;
    min-width: 1200px;    
    padding-bottom: 80px;

  }

  p,
  label {
    line-height: 1.5em;
  }

  input,button {border-radius:0;-webkit-appearance:none} 

  input,input:focus {
    outline:none;
  }

  input:read-only{
    color:rgba(0,0,0,0.4);
  }

  a{
    color:inherit;
  }

  a,a:active,a:focus,div:active,div:focus{
    text-decoration:none;
    outline:none;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  .hidden{
    pointer-events:none;
    opacity:0.5;
  }

  @media screen and (max-width: 900px) {
    *{-webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
    }

    #app{
      min-width:100%;
    }

    .mobile{
      display:inherit;
    }

    .pc{
      display:none;
    }

    .box_overflow {
      position:relative;
      left:-20px;
      width: 100vw;
    }
  }

  // 실험실! 각종 애니메이션이 추가되어 있습니다.
  @keyframes opacity{
    from{
      opacity:0;
    }
    to{
      opacity:1;
    }
  }

  @keyframes rotate_card{
    from{
      transform:rotateZ(6deg);
      opacity:0;
    }
    to{
      transform:rotateZ(0deg);
      opacity:1;
    }
    
  }

  @keyframes zoom{
    0%{
      transform: scale(0.6);
      opacity:0;
    }
    10%{
      transform: scale(1.1);
      opacity:1;
    }
    20%{
      transform: scale(1);
      opacity:1;
    }
    90%{
      transform: scale(1);
      opacity:1;
    }
    100%{
      transform: scale(0.6);
      opacity:0;
    }
  }

  @keyframes top-down{
    0%{
      transform: translateY(-120px);
      opacity:0;
    }
    5%{
      transform: translateY(20px);
      opacity:1;
    }
    10%{
      transform: translateY(0px);
      opacity:1;
    }
    95%{
      transform: translateY(0px);
      opacity:1;
    }
    100%{
      transform: translateY(-120px);
      opacity:0;
    }
  }
`;

export default GlobalStyle;

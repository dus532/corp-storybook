import { createGlobalStyle } from 'styled-components';

import Color from 'config/color';

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
    font-size:0.9rem;
    font-weight:normal;
  }

  h6{
    margin:0;
    padding:0;
    font-size:0.6rem;
    font-weight:normal;
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

  #app {
    min-height: 100%;
    min-width: 100%;    
  }

  p,
  label {
    line-height: 1.5em;
  }

  input,input:focus {
    outline:none;
  }

  a,a:active,a:focus{
    text-decoration:none;
    outline:none;
    color:inherit;
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

  .mobile{
    display:none;
  }

  @media screen and (max-width: 768px) {
    .mobile{
      display:inherit;
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
    10%{
      transform: translateY(20px);
      opacity:1;
    }
    20%{
      transform: translateY(0px);
      opacity:1;
    }
    90%{
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

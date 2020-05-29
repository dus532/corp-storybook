import styled from 'styled-components';

import Color from 'config/color';

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #f7f7f7;
  box-sizing: border-box;

  .sign_title {
    font-size: 1.1rem;
    font-weight: 400;
  }

  .blue {
    color: ${Color.Blue};
  }

  .sign_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    flex-wrap: wrap;
    width: 584px;
    text-align: center;
    padding: 128px 0;
  }

  .sign_bottom {
    margin-top: 20px;
    width: 100%;
    max-width: 320px;
  }

  .sign_askCarplat {
    margin-top: 8px;
    text-align: left;
  }

  @media screen and (max-width: 768px) {
    height: 100vh;

    .sign_title {
      font-size: 1.2rem;
    }
    .sign_container {
      width: 100%;
      min-height: 600px;
      height: 100%;
      margin: 0px;
      padding: 0;
    }
  }
`;

export default Wrap;

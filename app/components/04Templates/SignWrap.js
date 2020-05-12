import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 95vh;
  justify-content: center;
  align-items: center;
  background: #f7f7f7;
  box-sizing: border-box;

  .sign_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 700px;
    text-align: center;
  }

  .sign_bottom {
    margin-top: 40px;
    width: 100%;
    max-width: 372px;
  }

  .sign_askCarplat {
    margin-top: 8px;
    text-align: left;
  }

  @media screen and (max-width: 768px) {
    .sign_title {
      font-size: 1.2rem;
    }
    .sign_container {
      width: 100%;
      margin: 0px;
      padding: 0 20px;
    }
  }
`;

export default Wrap;

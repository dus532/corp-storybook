import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #f7f7f7;

  .sign_container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 700px;
    text-align: center;
  }

  .sign_bottom {
    margin-top: 40px;
    width: 372px;
  }

  .sign_askCarplat {
    margin-top: 8px;
    text-align: left;
  }

  @media screen and (max-width: 768px) {
    .sign_container {
      width: 100%;
      margin: 0 12px;
      padding: 36px;
    }
  }
`;

export default Wrap;

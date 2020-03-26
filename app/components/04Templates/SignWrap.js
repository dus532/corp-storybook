import styled from 'styled-components';

import BGImg from 'images/bg.jpg';

const Wrap = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: url(${BGImg}) center / cover;

  h5 {
    font-weight: 700;
  }

  .container {
    width: 540px;
    padding: 48px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #f2f2f2;
    border-radius: 6px;
  }
`;

export default Wrap;

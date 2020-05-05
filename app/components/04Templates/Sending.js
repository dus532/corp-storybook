import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import LOADINGIMG from 'images/carplet_loading.gif';

const StyledSending = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  animation: opacity 2s;

  .loading {
    width: 100px;
    height: 100px;
    background: url(${LOADINGIMG}) center / cover;
  }
`;

const Sending = () => {
  const globalData = useSelector(state => state.global);

  if (globalData.sending) {
    return (
      <StyledSending>
        <div className="loading" />
        <div>열심히 달리고 있어요!</div>
      </StyledSending>
    );
  }
  return <></>;
};

export default Sending;

import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Lottie from 'react-lottie';

import LOADINGIMG from 'images/carplet_loading.gif';

import animationData from './loading.json';

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
  z-index: 999;

  .loading {
    width: 100px;
    height: 100px;
    background: url(${LOADINGIMG}) center / cover;
  }
`;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Sending = () => {
  const globalData = useSelector(state => state.global);

  if (globalData.sending) {
    return (
      <StyledSending>
        {/* <div className="loading" /> */}
        <Lottie
          options={defaultOptions}
          height={40}
          width={40}
          isStopped={false}
          isPaused
        />
      </StyledSending>
    );
  }
  return <></>;
};

export default Sending;

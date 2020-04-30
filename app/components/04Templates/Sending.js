import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

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
  color: white;
  animation: opacity 3s;
`;

const Sending = () => {
  const globalData = useSelector(state => state.global);

  if (globalData.sending) {
    return (
      <StyledSending>
        <div>열심히 달리고 있어요!</div>
      </StyledSending>
    );
  }
  return <></>;
};

export default Sending;
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';

const StyledWelcomePanel = styled.div`
  margin-top: 30px;
  height: 80px;
  padding: 0 20px;
  font-weight: 700;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${Color.White};
`;

const Button = styled.button`
  border: 1px solid ${Color.LineGray};
  height: 40px;
  padding: 0 36px;
  font-weight: 700;
  transition: 0.35s;
  border-radius: 4px;

  &:hover {
    background: ${Color.SubGray};
    transition: 0.35s;
  }
`;

const WelcomePanel = ({ store, className }) => {
  const data = store.data.admin;

  return (
    <StyledWelcomePanel className={className}>
      <div>{data.name}님, 안녕하세요!</div>
      <Button>이용안내 확인</Button>
    </StyledWelcomePanel>
  );
};

WelcomePanel.propTypes = {
  store: PropTypes.object,
  className: PropTypes.any,
};

export default WelcomePanel;

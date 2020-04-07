import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';

const StyledWelcomePanel = styled.div`
  margin-top: 30px;
  height: 80px;
  padding: 0 28px;
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

  &:hover {
    background: ${Color.SubGray};
    transition: 0.35s;
  }
`;

const WelcomePanel = ({ name }) => (
  <StyledWelcomePanel>
    <div>{name}님, 안녕하세요!</div>
    <Button>이용안내 확인</Button>
  </StyledWelcomePanel>
);

WelcomePanel.propTypes = {
  name: PropTypes.string,
};

export default WelcomePanel;

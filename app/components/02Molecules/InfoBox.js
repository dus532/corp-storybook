import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InfoIMG from 'images/icon_info.png';

const IconInfo = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(${InfoIMG}) center / cover no-repeat;
  margin-right: 12px;
  vertical-align: middle;

  h5 {
    vertical-align: middle;
  }
`;

const StyledInfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  text-align: center;
  margin: ${({ margin }) => margin || 0};

  div {
    flex-shrink: 0;
  }

  h5 {
    display: inline-block;
  }
`;

const InfoBox = ({ children, className, margin }) => (
  <StyledInfoBox className={className} margin={margin}>
    <IconInfo />
    <h5>{children}</h5>
  </StyledInfoBox>
);

InfoBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  className: PropTypes.any,
  margin: PropTypes.string,
};

export default InfoBox;

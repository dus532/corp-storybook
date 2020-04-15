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
  justify-content: center;
  padding: 20px 0;
  text-align: center;

  h5 {
    display: inline-block;
  }
`;

const InfoBox = ({ children, className }) => (
  <StyledInfoBox className={className}>
    <h5>
      <IconInfo /> {children}
    </h5>
  </StyledInfoBox>
);

InfoBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  className: PropTypes.any,
};

export default InfoBox;

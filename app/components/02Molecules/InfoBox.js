import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InfoIMG from 'images/icon_info.png';

const IconInfo = styled.div`
  width: 20px;
  height: 20px;
  background: url(${InfoIMG}) center / cover no-repeat;
  margin-right: 12px;
`;

const StyledInfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const InfoBox = ({ children }) => (
  <StyledInfoBox>
    <IconInfo />
    <h5>{children}</h5>
  </StyledInfoBox>
);

InfoBox.propTypes = {
  children: PropTypes.element,
};

export default InfoBox;

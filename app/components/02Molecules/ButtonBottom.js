import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'components/01Atoms/Button';

const StyledButtonBottom = styled.div`
  display: flex;
  width: 373px;
  margin: 0 auto;
  overflow: hidden;
`;

const ButtonBottom = ({
  left,
  onClickLeft,
  typeLeft = 'button',
  right,
  onClickRight,
  typeRight = 'button',
  disabledLeft,
  disabledRight,
}) => (
  <StyledButtonBottom>
    {left && (
      <Button
        color="gray"
        type={typeLeft}
        onClick={onClickLeft}
        disabled={disabledLeft}
        style={{ marginRight: 8 }}
      >
        <span>{left}</span>
      </Button>
    )}
    {right && (
      <Button type={typeRight} onClick={onClickRight} disabled={disabledRight}>
        <span>{right}</span>
      </Button>
    )}
  </StyledButtonBottom>
);

ButtonBottom.propTypes = {
  left: PropTypes.string,
  right: PropTypes.string,
  typeLeft: PropTypes.string,
  typeRight: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
  disabledLeft: PropTypes.bool,
  disabledRight: PropTypes.bool,
};

export default ButtonBottom;

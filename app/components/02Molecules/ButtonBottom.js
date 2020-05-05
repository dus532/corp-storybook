import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from 'components/01Atoms/Button';
import SubButton from 'components/01Atoms/SubButton';

const StyledButtonBottom = styled.div`
  display: flex;
  width: 100%;
  max-width: ${props => (props.type === 'big' ? `572px` : `373px`)};
  margin: 0 auto;
  overflow: hidden;
`;

const ButtonBottom = ({
  type,
  left,
  style,
  onClickLeft,
  typeLeft = 'button',
  right,
  onClickRight,
  typeRight = 'button',
  disabledLeft,
  disabledRight,
}) => (
  <StyledButtonBottom type={type} style={style}>
    {left && (
      <SubButton
        type={typeLeft}
        onClick={onClickLeft}
        disabled={disabledLeft}
        style={{ marginRight: 8 }}
      >
        <span>{left}</span>
      </SubButton>
    )}
    {right && (
      <Button type={typeRight} onClick={onClickRight} disabled={disabledRight}>
        <span>{right}</span>
      </Button>
    )}
  </StyledButtonBottom>
);

ButtonBottom.propTypes = {
  type: PropTypes.string,
  left: PropTypes.string,
  style: PropTypes.object,
  right: PropTypes.string,
  typeLeft: PropTypes.string,
  typeRight: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
  disabledLeft: PropTypes.bool,
  disabledRight: PropTypes.bool,
};

export default ButtonBottom;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ArrowBlackIMG from 'images/icon_arrow_black.png';

const StyledButtonBottom = styled.div`
  display: flex;
  border-radius: 12px;
  overflow: hidden;
`;

const Button = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props.direction === 'right' ? 'flex-end' : 'flex-start'};
  transition: 0.35s;
  span {
    font-size: 1.4em;
    font-weight: 700;
  }

  &:hover {
    background: #eee;
    transition: 0.35s;
  }

  &:disabled {
    opacity: 0.5;
    cursor: auto;
  }
`;

const Arrow = styled.div`
  width: 24px;
  height: 32px;
  transform: ${props => props.direction === 'left' && 'rotate(180deg)'};
  background: url(${ArrowBlackIMG}) center / cover;
  display: inline-block;
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
      <Button type={typeLeft} onClick={onClickLeft} disabled={disabledLeft}>
        <Arrow direction="left" />
        <span>{left}</span>
      </Button>
    )}
    {right && (
      <Button
        direction="right"
        type={typeRight}
        onClick={onClickRight}
        disabled={disabledRight}
      >
        <span>{right}</span>
        <Arrow />
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

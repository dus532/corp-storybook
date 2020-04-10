/* eslint-disable indent */
import styled from 'styled-components';

import Color from 'config/color';

const Button = styled.button`
  width: 100%;
  height: ${props => (props.size === 'small' ? '40px' : '56px')};
  background: ${props => (props.color === 'gray' ? Color.SubGray : Color.Blue)};
  outline: none;
  border: none;
  color: ${props => (props.color === 'gray' ? 'black' : 'white')};
  font-size: ${props => (props.size === 'small' ? '0.8rem' : '1rem')};
  font-weight: bold;
  transition: 0.25s;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: ${props =>
      props.color === 'gray' ? Color.SubGrayHover : Color.BlueHover};
    transition: 0.25s;
  }

  &:active {
    outline: none;
  }
`;

export default Button;

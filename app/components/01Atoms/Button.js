/* eslint-disable indent */
import styled from 'styled-components';

import Color from 'config/color';

const Button = styled.button`
  width: 100%;
  height: 40px;
  background: ${props =>
    props.color === 'gray' ? Color.SubGray : Color.Black};
  outline: none;
  border: none;
  color: ${props => (props.color === 'gray' ? 'black' : 'white')};
  font-size: 1rem;
  font-weight: bold;
  transition: 0.25s;
  cursor: pointer;

  &:hover {
    background: ${props =>
      props.color === 'gray' ? Color.SubGrayHover : Color.BlackHover};
    transition: 0.25s;
  }

  &:active {
    outline: none;
  }
`;

export default Button;

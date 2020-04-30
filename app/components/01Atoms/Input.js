import styled from 'styled-components';

import Color from 'config/color';

const Input = styled.input`
  font-size: 0.9em;
  transition: 0.35s;
  border: 0;
  display: block;
  width: 100%;
  height: 40px;
  margin: 4px 0;
  padding: 4px 12px;
  border: 1px solid #eee;
  background: white;

  &:hover {
    border: 1px solid #aaa;
    transition: 0.35s;
  }

  &:focus {
    border: 1px solid ${Color.Blue};
    transition: 0.35s;
  }

  &:invalid {
    box-shadow: none;
  }
`;

export default Input;
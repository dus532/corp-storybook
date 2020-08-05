/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import styled from 'styled-components';

import ErrorIMG from 'images/icon_error.png';

const cssType = {
  general: {
    normal: '1px solid var(--grey200)',
    focus: '1px solid var(--primary400)',
  },
  error: {
    normal: '1px solid var(--red)',
    focus: '1px solid var(--red)',
  },
};

const Input = styled.input`
  transition: 0.35s;
  box-sizing: border-box;
  border-radius: 2px;
  display: block;
  height: 40px;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  margin: 4px 0;
  padding: ${({ suffix }) => (suffix ? '10px 32px 10px 16px' : '10px 16px')};
  text-indent: ${({ prefix }) => (prefix ? '28px' : '0px')};
  text-align: ${({ suffix }) => (suffix ? 'right' : 'left')};
  border: ${({ inputType, error }) =>
    error
      ? cssType.error.normal
      : inputType
      ? cssType[inputType].normal
      : cssType.general.normal};
  background: ${({ error, prefix, suffix }) =>
    error && !prefix && !suffix
      ? `url(${ErrorIMG}) right 12px center / 24px no-repeat white`
      : 'white'};
  outline: none;
  font-size: 14px;

  &:hover {
    border: ${({ inputType, error }) =>
      error
        ? cssType.error.focus
        : inputType
        ? cssType[inputType].focus
        : cssType.general.focus};
    transition: 0.35s;
    outline: none;
  }

  &:focus {
    border: ${({ inputType, error }) =>
      error
        ? cssType.error.focus
        : inputType
        ? cssType[inputType].focus
        : cssType.general.focus};
    transition: 0.35s;
    outline: none;
  }

  &:invalid {
    box-shadow: none;
  }

  &::placeholder {
    color: var(--grey300);
  }
`;

export default Input;

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';
import IconCheck from 'images/icon_check.png';

const StyledInput = styled.div`
  display: block;
  margin-bottom: 20px;

  .bold {
    font-weight: 700;
  }

  .underline {
    text-decoration: underline;
  }

  input {
    width: 1px;
    height: 1px;
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
  }

  input + label {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  input + label:before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 20%;
    background: #ededed;
    border: 1px solid #bdbdbd;
    vertical-align: middle;
    margin-right: 8px;
    transition: 0.25s;
  }

  input:checked + label:before {
    text-align: center;
    color: ${Color.White};
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 20%;
    border: 1px solid #3f8ef7;
    padding: 4px;
    background: ${Color.Blue} url(${IconCheck}) center / 10px no-repeat;
    vertical-align: middle;
    margin-right: 8px;
    transition: 0.25s;
  }
`;

const InputCheckBox = ({ id, name, body, bold }) => (
  <StyledInput>
    <input name={name} type="checkbox" id={id} />
    <label htmlFor={id} className={bold ? 'bold' : 'underline'}>
      {body}
    </label>
  </StyledInput>
);

InputCheckBox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  body: PropTypes.any,
  bold: PropTypes.bool,
};

export default InputCheckBox;

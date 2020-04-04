import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.div`
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
    border-radius: 50%;
    background: #ededed;
    border: 1px solid #bdbdbd;
    vertical-align: middle;
    margin-right: 8px;
    transition: 0.25s;
  }

  input:checked + label:before {
    text-align: center;
    color: #3f8ef7;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #3f8ef7;
    padding: 4px;
    background: #3f8ef7;
    vertical-align: middle;
    background-clip: content-box;
    margin-right: 8px;
    transition: 0.25s;
  }
`;

const InputRadio = ({ id, name, body }) => (
  <StyledInput>
    <input name={name} type="radio" id={id} />
    <label htmlFor={id}>{body}</label>
  </StyledInput>
);

InputRadio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  body: PropTypes.any,
};

export default InputRadio;

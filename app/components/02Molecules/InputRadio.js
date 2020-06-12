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
    font-size: 0.9rem;
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
    color: #2946be;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #2946be;
    padding: 4px;
    background: #2946be;
    vertical-align: middle;
    background-clip: content-box;
    margin-right: 8px;
    transition: 0.25s;
  }
`;

const InputRadio = ({
  id,
  name,
  body,
  checked,
  onChange,
  value,
  inputRef,
  className,
}) => (
  <StyledInput className={className}>
    <input
      name={name}
      type="radio"
      id={id}
      value={value}
      ref={inputRef}
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id}>{body}</label>
  </StyledInput>
);

InputRadio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  body: PropTypes.any,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any,
  inputRef: PropTypes.any,
  className: PropTypes.string,
};

export default InputRadio;

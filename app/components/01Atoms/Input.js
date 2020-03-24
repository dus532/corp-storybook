import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.input`
  font-size: 1em;
  transition: 0.35s;
  border: 1px solid #ddd;

  &:hover {
    background: #f2f2f2;
    transition: 0.35s;
  }
`;

const Input = ({ onChange, name, value }) => {
  console.log(value);
  return <StyledInput onChange={onChange} name={name} value={value} />;
};

Input.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.any,
};

export default Input;

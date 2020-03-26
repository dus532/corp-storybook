import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;

  span {
    position: relative;
    width: 0px;
    right: 36px;
    margin-left: 4px;
  }

  .eyes {
    width: 0px;
    position: relative;
    right: 52px;
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  font-size: 1em;
  transition: 0.35s;
  border: 1px solid #ddd;
  display: block;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  margin: 4px 0;
  padding: 4px 12px;
  font-size: 1rem;

  &:hover {
    background: #f2f2f2;
    transition: 0.35s;
  }
`;

const statusEmojis = status => {
  switch (status) {
    case 1:
      return (
        <span role="img" aria-label="happy">
          😄
        </span>
      );
    case 2:
      return (
        <span role="img" aria-label="sad">
          😥
        </span>
      );
    default:
      return (
        <span role="img" aria-label="what">
          🤔
        </span>
      );
  }
};

const Input = props => {
  const [viewPW, setViewPW] = useState(props.type);
  return (
    <StyledDiv>
      <StyledInput {...props} type={viewPW} />
      {props.type === 'password' && (
        <div
          className="eyes"
          onClick={() =>
            viewPW === 'password' ? setViewPW('text') : setViewPW('password')
          }
          onKeyPress={e => e.key === '19' && setViewPW('text')}
          role="button"
          tabIndex={0}
        >
          눈
        </div>
      )}
      {statusEmojis(props.status)}
    </StyledDiv>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  status: PropTypes.number,
};

export default Input;

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Input from 'components/01Atoms/Input';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-context: center;

  span {
    position: relative;
    width: 0px;
    right: -4px;
  }

  .eyes {
    width: 0px;
    position: relative;
    right: 24px;
    cursor: pointer;
  }
`;

const InputError = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 12px;
  height: 16px;
  margin: 2px 0 16px;

  h5 {
    color: #ee6833;
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

const DataInput = props => {
  const [viewPW, setViewPW] = useState(props.type);
  return (
    <>
      <StyledDiv>
        <Input {...props} type={viewPW} />
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
      {props.error && (
        <InputError>
          <h5>{props.error}</h5>
        </InputError>
      )}
    </>
  );
};

DataInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  status: PropTypes.number,
  error: PropTypes.string,
};

export default DataInput;

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Input from 'components/01Atoms/Input';
import InputError from 'components/01Atoms/InputError';
import Icon from 'components/01Atoms/Icon';
import { H5 } from 'components/01Atoms/H';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 900px) {
    span {
      width: 20px;
      right: 0px;
      margin-left: 8px;
    }
  }
`;

const Fix = styled.div`
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;

  .suffix {
    position: relative;
    width: 0px;
    right: 28px;
  }

  .prefix {
    position: relative;
    width: 0px;
    left: 12px;
  }
`;

const Eyes = styled.button`
  margin: 0;
  padding: 0;
  width: 0px;
  display: inline-block;
  position: relative;
  top: 1.5px;
  right: ${({ error }) => (error ? 64 : 36)}px;
  transition: 0.35s;
  cursor: pointer;
`;

const DataInput = props => {
  const [viewPW, setViewPW] = useState(props.type);
  return (
    <>
      <StyledDiv>
        {props.prefix && (
          <Fix>
            <H5 className="prefix" color="var(--grey400)">
              {props.prefix}
            </H5>
          </Fix>
        )}
        <Input {...props} ref={props.InputRef} type={viewPW} />
        {props.type === 'password' && (
          <Eyes
            type="button"
            className="eyes"
            error={props.error}
            onClick={() =>
              viewPW === 'password' ? setViewPW('text') : setViewPW('password')
            }
          >
            {viewPW !== 'password' ? (
              <Icon type="show" />
            ) : (
              <Icon type="hide" />
            )}
          </Eyes>
        )}
        {props.suffix && (
          <Fix>
            <H5 className="suffix" color="var(--grey400)">
              {props.suffix}
            </H5>
          </Fix>
        )}
      </StyledDiv>
      {props.error && <InputError>{props.error.message}</InputError>}
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
  error: PropTypes.object,
  InputRef: PropTypes.any,
  suffix: PropTypes.any,
  prefix: PropTypes.any,
};

export default DataInput;

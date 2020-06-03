import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Input from 'components/01Atoms/Input';
import IconError from 'components/01Atoms/IconError';
import IconOK from 'components/01Atoms/IconOK';
import IconShow from 'components/01Atoms/IconShow';
import IconHide from 'components/01Atoms/IconHide';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-context: center;

  span {
    position: relative;
    width: 0px;
    top: 4px;
    right: -4px;
  }

  .eyes {
    width: 0px;
    position: relative;
    top: 4px;
    right: 32px;
    cursor: pointer;
  }

  @media screen and (max-width: 900px) {
    span {
      width: 20px;
      right: 0px;
      margin-left: 8px;
    }
  }
`;

const InputError = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 12px;
  min-height: 16px;
  margin: 2px 0 16px;

  h5 {
    color: #ee6833;
  }
`;

const statusEmojis = status => {
  switch (status) {
    case 1:
      return (
        <span>
          <IconOK />
        </span>
      );
    case 2:
      return (
        <span>
          <IconError />
        </span>
      );
    default:
      return <></>;
  }
};

const DataInput = props => {
  const [viewPW, setViewPW] = useState(props.type);
  return (
    <>
      <StyledDiv>
        <Input {...props} ref={props.InputRef} type={viewPW} />
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
            {viewPW !== 'password' ? <IconShow /> : <IconHide />}
          </div>
        )}
        {statusEmojis(props.status)}
      </StyledDiv>
      {props.error && (
        <InputError>
          <h5>{props.error.message}</h5>
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
  error: PropTypes.object,
  InputRef: PropTypes.any,
};

export default DataInput;

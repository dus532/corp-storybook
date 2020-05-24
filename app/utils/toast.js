/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';

import { delToast } from 'stores';
import { IconError, IconOK } from 'components';

const StyledBG = styled.div`
  position: fixed;
  top: 60px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;

  *:first-child {
    margin-top: 0px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 0px;
    top: 0px;
  }
`;

const StyledToast = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  max-width: 572px;
  background: white;
  padding: 28px 20px;
  width: 100%;
  opacity: 0;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.1);
  animation: top-down 5s;

  *:first-child {
    margin-right: 10px;
    flex-shrink: 0;
  }
`;

const Toast = () => {
  const toast = useSelector(state => state.toast);
  const dispatch = useDispatch();

  if (toast.data.length > 0) {
    return (
      <StyledBG>
        {toast.data.map((t, index) => {
          if (t.on) {
            setTimeout(() => {
              dispatch(delToast(index));
            }, 5000);
            return (
              <StyledToast
                key={index}
                onClick={() => dispatch(delToast(index))}
              >
                {t.status === 'error' ? <IconError /> : <IconOK />}
                {t.body}
              </StyledToast>
            );
          }
          return <React.Fragment key={index} />;
        })}
      </StyledBG>
    );
  }
  return <></>;
};

export default Toast;

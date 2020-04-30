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
  animation: top-down 2.5s;

  *:first-child {
    margin-right: 10px;
  }
`;

const Toast = () => {
  const toast = useSelector(state => state.toast);
  const dispatch = useDispatch();

  if (toast.data.length > 0) {
    return (
      <StyledBG>
        {toast.data.map((t, index) => {
          setTimeout(() => {
            dispatch(delToast(index));
          }, 2500);
          if (t.on) {
            return (
              <StyledToast key={index}>
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
import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';

import { onToast, offToast } from 'stores';
import { IconError } from 'components';

const StyledBG = styled.div`
  position: absolute;
  display: fixed;
  top: 60px;
  display: flex;
  width: 100%;
  justify-content: center;

  @media screen and (max-width: 768px) {
    top: 0px;
  }
`;

const StyledToast = styled.div`
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

  switch (toast.status) {
    case 'error':
      setTimeout(() => {
        dispatch(offToast());
      }, 2500);
      return (
        <StyledBG>
          <StyledToast>
            <IconError />
            {toast.body}
          </StyledToast>
        </StyledBG>
      );
    case 'success':
      setTimeout(() => {
        dispatch(offToast());
      }, 2500);
      return (
        <StyledBG>
          <StyledToast>
            <IconError />
            {toast.body}
          </StyledToast>
        </StyledBG>
      );
    default:
      return <></>;
  }
};

export default Toast;

export const useToast = () => {
  const dispatch = useDispatch();

  return (body, status) => dispatch(onToast(body, status));
};

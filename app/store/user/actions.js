// 액션!

import RequestManager from 'api/requestManager';
import { SIGN_IN, HANDLE_CHANGE, RESET, SET_USER } from 'store/user/constants';

export const POSTSignIn = (data, onSuccess, onFailure) => ({
  type: SIGN_IN,
  promise: RequestManager('get', '', data),
  meta: {
    onSuccess,
    onFailure,
  },
});

export const actionSetUser = data => ({
  type: SET_USER,
  data,
});

export const actionSignHandleChange = (e, index) => ({
  type: HANDLE_CHANGE,
  data: e,
  index,
});

export const actionSignReset = () => ({
  type: RESET,
});

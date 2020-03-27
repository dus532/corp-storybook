// 액션!
import RequestManager from 'api/requestManager';
import { SIGN_IN, HANDLE_CHANGE, RESET } from 'store/sign/constants';

export const actionSignIn = onSuccess => ({
  type: SIGN_IN,
  promise: RequestManager('get', ''),
  meta: {
    onSuccess,
  },
});

export const actionSignHandleChange = (e, index) => ({
  type: HANDLE_CHANGE,
  data: e,
  index,
});

export const actionSignReset = () => ({
  type: RESET,
});

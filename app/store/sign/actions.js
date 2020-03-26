// 액션!
import RequestManager from 'api/requestManager';
import { SIGN_IN, HANDLE_CHANGE } from 'store/sign/constants';

export const onSignIn = () => ({
  type: SIGN_IN,
  promise: RequestManager('get', ''),
});

export const signHandleChange = e => ({
  type: HANDLE_CHANGE,
  data: e,
});

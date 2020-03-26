// 액션!
import RequestManager from 'api/requestManager';
import { SIGN_IN, HANDLE_CHANGE, RESET } from 'store/sign/constants';

export const actionSignIn = goRoute => ({
  type: SIGN_IN,
  promise: RequestManager('get', ''),
  meta: {
    onSuccess: () => {
      goRoute();
    },
  },
});

export const actionSignHandleChange = (e, kinds) => ({
  type: HANDLE_CHANGE,
  data: e,
  kinds,
});

export const actionSignReset = () => ({
  type: RESET,
});

// 액션!

import RequestManager from 'api/requestManager';
import {
  SIGN_IN,
  HANDLE_CHANGE,
  RESET,
  SET_USER,
  SIGN_OUT,
} from 'store/user/constants';

import UserManager from 'utils/userManager';

export const POSTSignIn = data => ({
  type: SIGN_IN,
  promise: RequestManager('post', '/action/login', data),
  meta: {
    onSuccess: res => {
      if (data.isSaved) {
        UserManager().setUser(res.data.message, true);
      } else {
        UserManager().setUser(res.data.message);
      }
    },
  },
});

export const actionSignOut = () => ({
  type: SIGN_OUT,
  payload: () => UserManager().setUser(''),
});

export const actionSetUser = payload => ({
  type: SET_USER,
  payload,
});

export const actionSignHandleChange = (e, index) => ({
  type: HANDLE_CHANGE,
  data: e,
  index,
});

export const actionSignReset = () => ({
  type: RESET,
});

// 액션!
import { SET_USER } from 'store/user/constants';

export const actionSetUser = e => ({
  type: SET_USER,
  data: e,
});

// 액션!
import UserManager from 'utils/userManager';

import createActions from './createActions';

const { create, handleValueChange, reset } = createActions('sign');

export const actionPostSignIn = data =>
  create({
    url: '/action/login',
    params: data,
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

export const actionValueChange = (name, value) =>
  handleValueChange({ name, value });

export const actionResetSignIn = () => reset();

// 액션!
import UserManager from 'utils/userManager';

import createActions from 'stores/controller/createActions';

const { create, onlyCreate, push, reset } = createActions('user');

export const actionPostSignIn = data =>
  create({
    url: '/action/login',
    params: data,
    meta: {
      onSuccess: res => {
        if (data.isSaved) {
          UserManager().setUser(res.data.payload, true);
        } else {
          UserManager().setUser(res.data.payload);
        }
      },
    },
  });

export const actionPostCheckPW = (data, onSuccess) =>
  onlyCreate({
    url: '/action/checkPassword',
    params: data,
    meta: {
      onSuccess: () => {
        window.sessionStorage.setItem('CHECK', true);
        onSuccess();
      },
    },
  });

export const actionPostResetPassword = data =>
  onlyCreate({
    url: '/action/resetPassword',
    params: data,
    meta: {
      onSuccess: () => {
        UserManager().setUser('');
      },
    },
  });

export const actionSetUser = data => push(data);

export const actionSignOut = () => reset(() => UserManager().setUser(''));

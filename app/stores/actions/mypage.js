// 액션!
import createActions from 'stores/controller/createActions';

const { read, update } = createActions('myPage');

export const actionGetMyPage = () => read({});

export const actionPutAdminInfo = (params, onSuccess) =>
  update({
    url: '/action/adminInfo',
    params,
    meta: { onSuccess },
  });

export const actionPutPassword = (params, onSuccess) =>
  update({
    url: '/action/password',
    params,
    meta: { onSuccess },
  });

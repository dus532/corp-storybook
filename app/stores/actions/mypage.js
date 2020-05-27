// 액션!
import createActions from 'stores/controller/createActions';
import UserManager from 'utils/userManager';

const { read, update } = createActions('myPage');

export const actionGetMyPage = () =>
  read({
    fastLoading: true,
  });

export const actionPutAdminInfo = (params, onSuccess) =>
  update({
    url: '/action/adminInfo',
    params: { ...params, corpId: UserManager().getUser().corpId },
    meta: { onSuccess },
  });

export const actionPutPassword = (params, onSuccess) =>
  update({
    url: '/action/password',
    params: { ...params, corpId: UserManager().getUser().corpId },
    meta: { onSuccess },
  });

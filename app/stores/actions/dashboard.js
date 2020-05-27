// 액션!
import createActions from 'stores/controller/createActions';
import UserManager from 'utils/userManager';

const { read, onlyCreate } = createActions('dashboard');

export const actionGetDashBoard = data =>
  read({
    params: {
      ...data,
      corpId: UserManager().getUser().corpId,
    },
    fastLoading: true,
  });

export const actionPostInitialUsage = (data, onSuccess) =>
  onlyCreate({
    url: '/action/usageLimit',
    params: data,
    meta: { onSuccess },
  });

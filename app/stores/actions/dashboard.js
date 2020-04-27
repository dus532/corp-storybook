// 액션!
import createActions from 'stores/controller/createActions';

const { read, onlyCreate } = createActions('dashboard');

export const actionGetDashBoard = () => read({});

export const actionPostInitialUsage = (data, onSuccess) =>
  onlyCreate({
    url: '/action/usageLimit',
    params: data,
    meta: { onSuccess },
  });

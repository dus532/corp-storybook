// 액션!
import createActions from 'stores/controller/createActions';

const { create, onlyCreate } = createActions('initial');

export const actionPostInitialCard = (data, onSuccess) =>
  create({ url: '/action/card', params: data, meta: { onSuccess } });

export const actionPostInitialUsage = (data, onSuccess) =>
  onlyCreate({
    url: '/action/usageLimit',
    params: data,
    meta: { onSuccess },
  });

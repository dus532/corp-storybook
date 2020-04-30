// 액션!
import createActions from 'stores/controller/createActions';

const { read, update, del, pushDetail } = createActions('manageSubscription');

export const actionGetSubscription = () => read({});

export const actionPushSubscription = data => pushDetail(data);

export const actionPutSubscription = (data, onSuccess) =>
  update({
    url: `/action/subscription`,
    params: data,
    meta: { onSuccess },
  });

export const actionDeleteSubscription = onSuccess =>
  del({
    url: `/action/subscription`,
    meta: { onSuccess },
  });
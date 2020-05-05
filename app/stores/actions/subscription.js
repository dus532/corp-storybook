// 액션!
import createActions from 'stores/controller/createActions';

const { read, update, del, pushDetail } = createActions('subscription');

export const actionGetSubscription = () =>
  read({
    url: `/corp/manageSubscription`,
  });

export const actionPushSubscription = data => pushDetail(data);

export const actionPutSubscription = (data, onSuccess) =>
  update({
    params: data,
    meta: { onSuccess },
  });

export const actionDeleteSubscription = onSuccess =>
  del({
    meta: { onSuccess },
  });

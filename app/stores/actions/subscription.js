// 액션!
import createActions from 'stores/controller/createActions';
import UserManager from 'utils/userManager';

const { read, update, del, pushDetail, onlyCreate } = createActions(
  'subscription',
);

export const actionGetSubscription = () =>
  read({
    url: `/corp/manageSubscription/${UserManager().getUser().corpId}`,
    fastLoading: true,
  });

export const actionPushSubscription = data => pushDetail(data);

export const actionPutSubscription = (params, onSuccess) =>
  update({
    params: { ...params, corpId: UserManager().getUser().corpId },
    meta: { onSuccess },
  });

export const actionDeleteSubscription = (params, onSuccess) =>
  del({
    params: { ...params, corpId: UserManager().getUser().corpId },
    meta: { onSuccess },
  });

export const actionPostCheckSubscription = (params, onSuccess) =>
  onlyCreate({
    url: `/action/checkEditSubscriptionPrice`,
    params: { ...params, corpId: UserManager().getUser().corpId },
    meta: { onSuccess },
  });

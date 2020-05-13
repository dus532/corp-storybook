// 액션!
import createActions from 'stores/controller/createActions';
import UserManager from 'utils/userManager';

const { create, onlyCreate } = createActions('initial');

export const actionPostInitialCard = (data, onSuccess) =>
  create({
    url: '/action/card',
    params: { ...data, corpId: UserManager().getUser().corpId },
    meta: { onSuccess },
  });

export const actionPostChargeSubscription = (data, onSuccess) =>
  onlyCreate({
    url: '/action/chargeSubscription',
    params: { ...data, corpId: UserManager().getUser().corpId },
    meta: { onSuccess },
  });

export const actionRePostChargeSubscription = (data, onSuccess) =>
  onlyCreate({
    url: '/action/reSubscribe',
    params: { ...data, corpId: UserManager().getUser().corpId },
    meta: { onSuccess },
  });

export const actionPostInitialUsage = (data, onSuccess) =>
  onlyCreate({
    url: '/action/usageLimit',
    params: { ...data, corpId: UserManager().getUser().corpId },
    meta: { onSuccess },
  });

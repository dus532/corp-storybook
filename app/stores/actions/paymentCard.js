// 액션!
import createActions from 'stores/controller/createActions';
import UserManager from 'utils/userManager';

const { read, del, update, onlyRead, onlyCreate } = createActions('card');

export const actionGetCards = () =>
  read({
    url: `/corp/manageCards/${UserManager().getUser().corpId}`,
    fastLoading: true,
  });

export const actionDelCard = (cardId, onSuccess) =>
  del({
    params: { corpId: UserManager().getUser().corpId, cardId },
    meta: {
      onSuccess,
      read: `/corp/manageCards/${UserManager().getUser().corpId}`,
    },
  });

export const actionPutCard = (data, onSuccess) =>
  update({ params: data, meta: { onSuccess } });

export const actionGetCardList = onSuccess =>
  onlyRead({
    url: `/corp/cards/${UserManager().getUser().corpId}`,
    meta: { onSuccess },
  });

export const actionPostCardUsageLimit = (params, onSuccess) =>
  onlyCreate({
    params,
    url: `/action/usageLimit`,
    meta: { onSuccess },
  });

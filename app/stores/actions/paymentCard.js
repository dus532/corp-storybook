// 액션!
import createActions from 'stores/controller/createActions';
import UserManager from 'utils/userManager';

const { read, del, update } = createActions('card');

export const actionGetCards = () =>
  read({ url: `/corp/manageCards/${UserManager().getUser().corpId}` });

export const actionDelCard = cardId =>
  del({
    params: { corpId: UserManager().getUser().corpId, cardId },
    meta: { read: `/corp/manageCards/${UserManager().getUser().corpId}` },
  });

export const actionPutCard = (data, onSuccess) =>
  update({ params: data, meta: { onSuccess } });

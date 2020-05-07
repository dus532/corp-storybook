// 액션!
import createActions from 'stores/controller/createActions';
import UserManager from 'utils/userManager';

const { read } = createActions('card');

export const actionGetCards = () =>
  read({ url: `/corp/manageCards/${UserManager().getUser().corpId}` });

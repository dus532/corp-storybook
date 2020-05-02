// 액션!
import createActions from 'stores/controller/createActions';
import UserManager from 'utils/userManager';

const { read, update, handleChange } = createActions('info');

export const actionGetCorpInfo = () =>
  read({ url: `/corp/manageInfo/${UserManager().getUser().corpId}` });

export const actionHandleChangeCorpInfo = (name, data) =>
  handleChange(name, data);

export const actionPutCorpInfo = (params, onSuccess) =>
  update({ url: '/action/corpInfo', params, meta: { onSuccess } });

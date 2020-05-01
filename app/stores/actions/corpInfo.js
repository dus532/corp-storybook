// 액션!
import createActions from 'stores/controller/createActions';

const { read, update, handleChange } = createActions('info');

export const actionGetCorpInfo = () => read({ url: '/corp/manageInfo' });

export const actionHandleChangeCorpInfo = (name, data) =>
  handleChange(name, data);

export const actionPutCorpInfo = (params, onSuccess) =>
  update({ url: '/action/corpInfo', params, meta: { onSuccess } });

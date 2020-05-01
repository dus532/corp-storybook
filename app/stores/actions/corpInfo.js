// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('info');

export const actionGetCorpInfo = () => read({ url: '/corp/manageInfo' });

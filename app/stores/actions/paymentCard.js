// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('card');

export const actionGetCards = () => read({ url: '/corp/manageCards' });

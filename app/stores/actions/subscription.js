// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('manageSubscription');

export const actionGetSubscription = () => read({});

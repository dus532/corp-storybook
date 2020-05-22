// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('terms');

export const actionGetTerms = () => read({});

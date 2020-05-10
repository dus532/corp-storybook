// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('myPage');

export const actionGetMyPage = () => read({});

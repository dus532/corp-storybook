// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('faqs');

export const actionGetFAQs = () => read({});

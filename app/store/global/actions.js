// 액션!
import RequestManager from 'api/requestManager';
import { LOAD, INCRE, HANDLE_CHANGE } from 'store/global/constants';

export const load = () => ({
  type: LOAD,
  promise: RequestManager('get', ''),
});

export const incre = () => ({ type: INCRE });

export const handleChange = e => ({
  type: HANDLE_CHANGE,
  data: e,
});

// 액션!
import RequestManager from 'api/requestManager';
import { LOAD, INCRE } from 'store/constants/global';

export const load = () => ({
  type: LOAD,
  promise: RequestManager('get', ''),
});

export const incre = () => ({ type: INCRE });

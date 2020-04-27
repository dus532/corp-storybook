// 액션!
import { SENDING_CHANGE } from 'stores/global/constants';

export const toggleSending = payload => ({
  type: SENDING_CHANGE,
  payload,
});

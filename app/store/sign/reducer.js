import produce from 'immer';

import { SIGN_IN, HANDLE_CHANGE, RESET } from 'store/sign/constants';
import ApiRequest from 'store/request/request';

const initialState = { id: '', pw: '', isSaved: false, status: 0 };

// 리듀서!
const signReducer = (state = initialState, action) => {
  const { type, data, payload } = action;
  return produce(state, draft => {
    switch (type) {
      case SIGN_IN:
        return ApiRequest(state, action, payload);
      case HANDLE_CHANGE:
        if (action.kinds === 'checkbox') {
          draft[data.name] = data.checked;
        } else {
          draft[data.name] = data.value;
        }
        return draft;
      case RESET:
        return initialState;
      default:
        return draft;
    }
  });
};

export default signReducer;

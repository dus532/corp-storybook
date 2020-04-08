import produce from 'immer';

import { SIGN_IN, SET_USER, SIGN_OUT } from 'store/user/constants';
import { REQUEST_WAITING } from 'store/request/constants';
import ApiRequest from 'store/request/request';

const initialState = {
  name: '',
  token: '',
  status: REQUEST_WAITING,
};

// 리듀서!
const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  return produce(state, draft => {
    switch (type) {
      case SIGN_IN: {
        const req = ApiRequest(state, action, payload);
        draft.name = req.res && req.res.message;
        return draft;
      }
      case SIGN_OUT:
        payload();
        return initialState;
      case SET_USER:
        draft.name = payload;
        return draft;
      default:
        return draft;
    }
  });
};

export default userReducer;

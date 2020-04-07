import produce from 'immer';
import Cookies from 'js-cookie';

import { SIGN_IN, HANDLE_CHANGE, RESET, SET_USER } from 'store/user/constants';
import { REQUEST_WAITING, REQUEST_SUCCESS } from 'store/request/constants';
import ApiRequest from 'store/request/request';

const initialState = {
  username: '',
  password: '',
  isSaved: false,
  status: REQUEST_WAITING,
};

// 리듀서!
const signReducer = (state = initialState, action) => {
  const { type, data, payload } = action;
  return produce(state, draft => {
    switch (type) {
      case SIGN_IN: {
        const req = ApiRequest(state, action, payload);
        console.log('TEST', req);
        if (req.status === REQUEST_SUCCESS) {
          Cookies.set('UUID', req);
        }
        return req;
      }
      case HANDLE_CHANGE:
        if (action.index === 'checkbox') {
          draft[data.name] = data.checked;
        } else {
          draft[data.name] = data.value;
        }
        return draft;
      case RESET:
        return initialState;
      case SET_USER:
        draft.username = data.username;
        return draft;
      default:
        return draft;
    }
  });
};

export default signReducer;

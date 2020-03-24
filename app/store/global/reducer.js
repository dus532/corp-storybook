import produce from 'immer';

import { LOAD, INCRE, HANDLE_CHANGE } from 'store/global/constants';
import ApiRequest from 'store/request/request';

const initialState = { title: '', status: 0 };

// 리듀서!
const counterReducer = (state = initialState, action) => {
  const { type, data, payload } = action;
  return produce(state, draft => {
    switch (type) {
      case LOAD:
        return ApiRequest(state, action, payload);
      case INCRE:
        return draft;
      case HANDLE_CHANGE:
        draft[data.target.name] = data.target.value;
        return draft;
      default:
        return draft;
    }
  });
};

export default counterReducer;

import { LOAD, INCRE } from 'store/constants/global';

import ApiRequest from '../actions/request';

const initialState = { status: 0 };

// 리듀서!
const counterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD:
      return ApiRequest(state, action, payload);
    case INCRE:
      return { ...state, id: state.id + 1 };
    default:
      return state;
  }
};

export default counterReducer;

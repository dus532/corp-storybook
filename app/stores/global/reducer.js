import produce from 'immer';

import { SENDING_CHANGE } from 'stores/global/constants';

const initialState = { sending: false };

// 리듀서!
const globalReducer = (state = initialState, action) => {
  const { type, payload } = action;
  return produce(state, draft => {
    switch (type) {
      case SENDING_CHANGE:
        draft.sending = payload;
        return draft;
      default:
        return draft;
    }
  });
};

export default globalReducer;

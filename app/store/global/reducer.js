import produce from 'immer';

import { SENDING_CHANGE } from 'store/global/constants';

const initialState = { sending: false };

// 리듀서!
const globalReducer = (state = initialState, action) => {
  const { type } = action;
  return produce(state, draft => {
    switch (type) {
      case SENDING_CHANGE:
        draft.sending = !draft.sending;
        return draft;
      default:
        return draft;
    }
  });
};

export default globalReducer;

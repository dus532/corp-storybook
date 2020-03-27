import produce from 'immer';

import { TOGGLE_FIND_EMAIL } from 'store/modals/constants';

const initialState = { findEmail: false };

// 리듀서!
const modalReducer = (state = initialState, action) => {
  const { type } = action;
  return produce(state, draft => {
    switch (type) {
      case TOGGLE_FIND_EMAIL:
        draft.findEmail = !draft.findEmail;
        return draft;
      default:
        return draft;
    }
  });
};

export default modalReducer;

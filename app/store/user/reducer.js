import produce from 'immer';

import { SET_USER } from 'store/user/constants';

const initialState = { name: '' };

// 리듀서!
const userReducer = (state = initialState, action) => {
  const { type } = action;
  return produce(state, draft => {
    switch (type) {
      case SET_USER:
        draft.name = '정연진';
        return draft;
      default:
        return draft;
    }
  });
};

export default userReducer;

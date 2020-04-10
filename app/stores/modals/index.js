import produce from 'immer';

const initialState = { type: '', data: {} };

export const ModalReducer = (state = initialState, action) => {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case 'onModal':
        return payload;
      case 'offModal':
        return initialState;
      default:
        return draft;
    }
  });
};

export const onModal = (type, data = {}) => ({
  type: 'onModal',
  payload: {
    type,
    data,
  },
});

export const offModal = () => ({
  type: 'offModal',
});

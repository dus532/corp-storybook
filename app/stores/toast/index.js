import produce from 'immer';

const initialState = { type: '', status: '', body: '' };

export const ToastReducer = (state = initialState, action) => {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case 'onToast':
        draft.body = payload.body;
        draft.status = payload.status;
        return draft;
      case 'offToast':
        return initialState;
      default:
        return draft;
    }
  });
};

export const onToast = (body = {}, status = 'error') => ({
  type: 'onToast',
  payload: {
    body,
    status,
  },
});

export const offToast = () => ({
  type: 'offToast',
});

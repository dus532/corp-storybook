import produce from 'immer';

const initialState = { type: '', data: [] };

export const ToastReducer = (state = initialState, action) => {
  const { type, payload } = action;

  return produce(state, draft => {
    switch (type) {
      case 'onToast':
        draft.data.push({
          status: payload.status,
          body: payload.body,
          on: 1,
        });
        return draft;
      case 'delToast':
        draft.data[payload.index].on = 0;
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

export const delToast = index => ({
  type: 'delToast',
  payload: {
    index,
  },
});

export const offToast = () => ({
  type: 'offToast',
});

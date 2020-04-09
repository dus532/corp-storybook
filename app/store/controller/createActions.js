import RequestManager from 'api/requestManager';

import { GET_REQUEST, POST_REQUEST, HANDLE_CHANGE, RESET } from './constants';

export default (resourceName, key = 'id') => ({
  read: ({ url = resourceName, meta = {} }) => ({
    type: GET_REQUEST,
    promise: RequestManager('get', url),
    meta: {
      ...meta,
      key,
      resourceName,
    },
  }),
  create: ({ url = resourceName, params = {}, meta = {} }) => ({
    type: POST_REQUEST,
    promise: RequestManager('post', url, params),
    meta: {
      ...meta,
      key,
      resourceName,
    },
  }),
  handleChange: data => ({
    type: HANDLE_CHANGE,
    payload: data,
  }),
  handleValueChange: (name, value) => ({
    type: HANDLE_CHANGE,
    payload: { name, value },
  }),
  reset: () => ({
    type: RESET,
  }),
});

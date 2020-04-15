import RequestManager from 'api/requestManager';

import {
  GET_REQUEST,
  POST_REQUEST,
  POST_REQUEST_ONLY,
  PUSH,
  RESET,
} from './constants';

export default resourceName => ({
  read: ({ url = `/corp/${resourceName}`, meta = {} }) => ({
    type: GET_REQUEST,
    promise: RequestManager('get', url),
    meta: {
      ...meta,
      resourceName,
    },
  }),

  create: ({ url = `/action/${resourceName}`, params = {}, meta = {} }) => ({
    type: POST_REQUEST,
    promise: RequestManager('post', url, params),
    meta: {
      ...meta,
      resourceName,
    },
  }),

  onlyCreate: ({
    url = `/action/${resourceName}`,
    params = {},
    meta = {},
  }) => ({
    type: POST_REQUEST_ONLY,
    promise: RequestManager('post', url, params),
    meta: {
      ...meta,
      resourceName,
    },
  }),

  push: data => ({
    type: PUSH,
    payload: data,
    meta: {
      resourceName,
    },
  }),

  reset: actions => ({
    type: RESET,
    meta: {
      actions,
      resourceName,
    },
  }),
});

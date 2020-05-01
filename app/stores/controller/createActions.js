import RequestManager from 'api/requestManager';

import {
  GET_REQUEST,
  POST_REQUEST,
  PUT_REQUEST,
  DELETE_REQUEST,
  POST_REQUEST_ONLY,
  GET_REQUEST_DETAIL,
  PUSH,
  RESET,
  PUSH_DETAIL,
  HANDLE_CHANGE,
} from './constants';

export default resourceName => ({
  read: ({ url = `/corp/${resourceName}`, params = {}, meta = {} }) => ({
    type: GET_REQUEST,
    promise: RequestManager('get', url, params),
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

  update: ({ url = `/action/${resourceName}`, params = {}, meta = {} }) => ({
    type: PUT_REQUEST,
    promise: RequestManager('put', url, params),
    meta: {
      ...meta,
      resourceName,
    },
  }),

  del: ({ url = `/action/${resourceName}`, params = {}, meta = {} }) => ({
    type: DELETE_REQUEST,
    promise: RequestManager('delete', url, params),
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

  reqeustDetail: ({
    url = `/corp/${resourceName}`,
    params = {},
    meta = {},
  }) => ({
    type: GET_REQUEST_DETAIL,
    promise: RequestManager('get', url, params),
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

  handleChange: (name, value) => ({
    type: HANDLE_CHANGE,
    payload: { name, value },
    meta: {
      resourceName,
    },
  }),

  pushDetail: data => ({
    type: PUSH_DETAIL,
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

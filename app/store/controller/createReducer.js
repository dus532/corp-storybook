/* eslint-disable no-param-reassign */
import produce from 'immer';

import handle from 'middlewares/pack/handle';
import {
  REQUEST_WAITING,
  REQUEST_START,
  REQUEST_FINISH,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
} from 'store/request/constants';

import { GET_REQUEST, POST_REQUEST, HANDLE_CHANGE, RESET } from './constants';

export default (...reducerNames) =>
  reducerNames.reduce((apiReducers, name) => {
    const initialState = { status: REQUEST_WAITING, test: 0, data: '' };

    apiReducers[name] = (state = initialState, action) => {
      const { type, payload, meta } = action;
      const { resourceName } = meta || {};

      if (resourceName !== name) {
        return state;
      }

      return produce(state, draft => {
        switch (type) {
          case GET_REQUEST:
          case POST_REQUEST:
            return handle(state, action, {
              start: prevState => ({
                ...prevState,
                status: REQUEST_START,
              }),
              finish: prevState => ({
                ...prevState,
                status: REQUEST_FINISH,
              }),
              success: prevState => ({
                ...prevState,
                status: REQUEST_SUCCESS,
                data: payload.data,
              }),
              failure: prevState => ({
                ...prevState,
                status: REQUEST_FAILURE,
                err: payload.response,
              }),
            });
          case HANDLE_CHANGE:
            draft[payload.name] = payload.value;
            return draft;
          case RESET:
            return initialState;
          default:
            return draft;
        }
      });
    };
    return apiReducers;
  }, {});

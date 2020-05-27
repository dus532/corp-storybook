/* eslint-disable indent */
/* eslint-disable no-param-reassign */
import produce from 'immer';

import handle from 'middlewares/pack/handle';

import {
  GET_REQUEST,
  POST_REQUEST,
  PUT_REQUEST,
  POST_REQUEST_ONLY,
  GET_REQUEST_ONLY,
  HANDLE_CHANGE,
  RESET,
  PUSH,
  REQUEST_WAITING,
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  GET_REQUEST_DETAIL,
  PUSH_DETAIL,
  DELETE_REQUEST,
} from './constants';

export default (...reducerNames) =>
  reducerNames.reduce((apiReducers, name) => {
    const initialState = { status: REQUEST_WAITING, data: '', detail: '' };

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
              start: prevState =>
                meta.fastLoading
                  ? {
                      ...prevState,
                      status:
                        state.status === REQUEST_WAITING
                          ? REQUEST_START
                          : state.status,
                    }
                  : {
                      ...prevState,
                      status: REQUEST_WAITING,
                    },
              success: prevState => ({
                ...prevState,
                status: REQUEST_SUCCESS,
                data: payload.data.payload,
              }),
              failure: prevState => ({
                ...prevState,
                status: REQUEST_FAILURE,
                err: payload.response,
              }),
            });

          case GET_REQUEST_DETAIL:
            return handle(state, action, {
              start: prevState => ({
                ...prevState,
                status:
                  state.status === REQUEST_WAITING
                    ? REQUEST_START
                    : state.status,
              }),
              success: prevState => ({
                ...prevState,
                status: REQUEST_SUCCESS,
                detail: payload.data.payload,
              }),
              failure: prevState => ({
                ...prevState,
                status: REQUEST_FAILURE,
                err: payload.response,
              }),
            });

          case HANDLE_CHANGE:
            // 여긴 draft로 하면 렌더링이 이뤄지지 않습니다.
            // 그래서 기본적인 redux로 사용합니다.
            state.data[payload.name] = payload.value;
            return Object.assign({}, state);

          case PUSH_DETAIL:
            draft.detail = payload;
            return draft;

          case PUSH:
            draft.data = payload;
            return draft;

          case RESET:
            if (meta) {
              meta.actions();
            }
            return initialState;

          case PUT_REQUEST:
          case DELETE_REQUEST:
          case POST_REQUEST_ONLY:
          case GET_REQUEST_ONLY:
          default:
            return draft;
        }
      });
    };
    return apiReducers;
  }, {});

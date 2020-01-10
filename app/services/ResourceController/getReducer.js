import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';

import { useInjectReducer } from 'utils/injectReducer';
import { getKey } from 'utils/generateCarplatResourceURI';

import getActionTypes from './getActionTypes';

const defaultInitialStateObject = {
  // 단일 리소스
  createLoading: false,
  createError: false,
  createErrorMessage: '',
  readLoading: false,
  readError: false,
  readErrorMessage: '',
  updateLoading: false,
  updateError: false,
  updateErrorMessage: '',
  deleteLoading: false,
  deleteError: false,
  deleteErrorMessage: '',
  requestExtraActionLoading: {},
  requestExtraActionError: {},
  requestExtraActionErrorMessage: {},
  // 복수 리소스
  bulkCreateLoading: false,
  bulkCreateError: false,
  bulkCreateErrorMessage: '',
  bulkReadLoading: false,
  bulkReadError: false,
  bulkReadErrorMessage: '',
  bulkUpdateLoading: false,
  bulkUpdateError: false,
  bulkUpdateErrorMessage: '',
  bulkDeleteLoading: false,
  bulkDeleteError: false,
  bulkDeleteErrorMessage: '',
  bulkRequestExtraActionLoading: {},
  bulkRequestExtraActionError: {},
  bulkRequestExtraActionErrorMessage: {},
  // 리소스 수치(stats) 요청
  fetchStatsLoading: false,
  fetchStatsError: false,
  fetchStatsErrorMessage: '',
  // 데이터
  data: {},
  listDataParams: {},
  listData: [],
  extraData: {},
  totalCount: 0,
  stats: {},
};

/* eslint-disable default-case, no-param-reassign, consistent-return */
export default function getReducer(
  resources,
  initialStateObject = {},
  key = 'global',
) {
  const {
    // 초기화
    INITIALIZE_STATE,
    // 단일 리소스
    CREATE_START,
    CREATE_SUCCEEDED,
    CREATE_FAILED,
    READ_START,
    READ_SUCCEEDED,
    READ_FAILED,
    UPDATE_START,
    UPDATE_SUCCEEDED,
    UPDATE_FAILED,
    DELETE_START,
    DELETE_SUCCEEDED,
    DELETE_FAILED,
    REQUEST_EXTRA_ACTION_START,
    REQUEST_EXTRA_ACTION_SUCCEEDED,
    REQUEST_EXTRA_ACTION_FAILED,
    // 복수 리소스
    BULK_CREATE_START,
    BULK_CREATE_SUCCEEDED,
    BULK_CREATE_FAILED,
    UPDATE_LIST_DATA_PARAMS,
    PROCESSED_BULK_READ_START,
    BULK_READ_START,
    BULK_READ_SUCCEEDED,
    BULK_READ_FAILED,
    BULK_UPDATE_START,
    BULK_UPDATE_SUCCEEDED,
    BULK_UPDATE_FAILED,
    BULK_DELETE_START,
    BULK_DELETE_SUCCEEDED,
    BULK_DELETE_FAILED,
    BULK_REQUEST_EXTRA_ACTION_START,
    BULK_REQUEST_EXTRA_ACTION_SUCCEEDED,
    BULK_REQUEST_EXTRA_ACTION_FAILED,
    // 리소스 수치(stats) 요청
    FETCH_STATS_START,
    FETCH_STATS_SUCCEEDED,
    FETCH_STATS_FAILED,
  } = getActionTypes(resources, key);

  const reducerKey = getKey(resources, key);
  const initialState = Object.assign(
    {},
    defaultInitialStateObject,
    initialStateObject,
  );
  const reducer = (state = initialState, action) =>
    produce(state, draft => {
      switch (action.type) {
        // 초기화
        case INITIALIZE_STATE:
          return initialState;
        // 단일 리소스
        case CREATE_START:
          draft.createLoading = true;
          draft.createError = false;
          break;
        case CREATE_SUCCEEDED:
          draft.createLoading = false;
          draft.createError = false;
          draft.data = action.data;
          Object.assign(draft.extraData, action.extraData);
          break;
        case CREATE_FAILED:
          draft.createLoading = false;
          draft.createError = true;
          draft.createErrorMessage = action.errorMessage;
          break;
        case READ_START:
          draft.readLoading = true;
          draft.readError = false;
          break;
        case READ_SUCCEEDED:
          draft.readLoading = false;
          draft.readError = false;
          draft.data = action.data;
          Object.assign(draft.extraData, action.extraData);
          break;
        case READ_FAILED:
          draft.readLoading = false;
          draft.readError = true;
          draft.readErrorMessage = action.errorMessage;
          break;
        case UPDATE_START:
          draft.updateLoading = true;
          draft.updateError = false;
          break;
        case UPDATE_SUCCEEDED:
          draft.updateLoading = false;
          draft.updateError = false;
          draft.data = action.data;
          Object.assign(draft.extraData, action.extraData);
          break;
        case UPDATE_FAILED:
          draft.updateLoading = false;
          draft.updateError = true;
          draft.updateErrorMessage = action.errorMessage;
          break;
        case DELETE_START:
          draft.deleteLoading = true;
          draft.deleteError = false;
          break;
        case DELETE_SUCCEEDED:
          draft.deleteLoading = false;
          draft.deleteError = false;
          break;
        case DELETE_FAILED:
          draft.deleteLoading = false;
          draft.deleteError = true;
          draft.deleteErrorMessage = action.errorMessage;
          break;
        case REQUEST_EXTRA_ACTION_START:
          draft.requestExtraActionLoading[action.actionType] = true;
          draft.requestExtraActionError[action.actionType] = false;
          break;
        case REQUEST_EXTRA_ACTION_SUCCEEDED:
          draft.requestExtraActionLoading[action.actionType] = false;
          draft.requestExtraActionError[action.actionType] = false;
          Object.assign(draft.extraData[action.actionType], action.extraData);
          break;
        case REQUEST_EXTRA_ACTION_FAILED:
          draft.requestExtraActionLoading[action.actionType] = false;
          draft.requestExtraActionError[action.actionType] = true;
          draft.requestExtraActionErrorMessage[action.actionType] =
            action.errorMessage;
          break;

        // 복수 리소스
        case BULK_CREATE_START:
          draft.bulkCreateLoading = true;
          draft.bulkCreateError = false;
          break;
        case BULK_CREATE_SUCCEEDED:
          draft.bulkCreateLoading = false;
          draft.bulkCreateError = false;
          Object.assign(draft.extraData, action.extraData);
          break;
        case BULK_CREATE_FAILED:
          draft.bulkCreateLoading = false;
          draft.bulkCreateError = true;
          draft.bulkCreateErrorMessage = action.errorMessage;
          break;
        case PROCESSED_BULK_READ_START:
        case BULK_READ_START:
          draft.bulkReadLoading = true;
          draft.bulkReadError = false;
          break;
        case UPDATE_LIST_DATA_PARAMS:
          draft.bulkReadLoading = true;
          draft.bulkReadError = false;
          Object.assign(draft.listDataParams, action.params);
          break;
        case BULK_READ_SUCCEEDED:
          draft.bulkReadLoading = false;
          draft.bulkReadError = false;
          draft.totalCount = action.totalCount;
          draft.listData = action.data;
          Object.assign(draft.extraData, action.extraData);
          break;
        case BULK_READ_FAILED:
          draft.bulkReadLoading = false;
          draft.bulkReadError = true;
          draft.bulkReadErrorMessage = action.errorMessage;
          break;
        case BULK_UPDATE_START:
          draft.bulkUpdateLoading = true;
          draft.bulkUpdateError = false;
          break;
        case BULK_UPDATE_SUCCEEDED:
          draft.bulkUpdateLoading = false;
          draft.bulkUpdateError = false;
          draft.listData = action.data;
          Object.assign(draft.extraData, action.extraData);
          break;
        case BULK_UPDATE_FAILED:
          draft.bulkUpdateLoading = false;
          draft.bulkUpdateError = true;
          draft.bulkUpdateErrorMessage = action.errorMessage;
          break;
        case BULK_DELETE_START:
          draft.bulkDeleteLoading = true;
          draft.bulkDeleteError = false;
          break;
        case BULK_DELETE_SUCCEEDED:
          draft.bulkDeleteLoading = false;
          draft.bulkDeleteError = false;
          break;
        case BULK_DELETE_FAILED:
          draft.bulkDeleteLoading = false;
          draft.bulkDeleteError = false;
          draft.bulkDeleteErrorMessage = action.errorMessage;
          break;
        case BULK_REQUEST_EXTRA_ACTION_START:
          draft.bulkRequestExtraActionLoading[action.actionType] = true;
          draft.bulkRequestExtraActionError[action.actionType] = false;
          break;
        case BULK_REQUEST_EXTRA_ACTION_SUCCEEDED:
          draft.bulkRequestExtraActionLoading[action.actionType] = false;
          draft.bulkRequestExtraActionError[action.actionType] = false;
          Object.assign(draft.extraData[action.actionType], action.extraData);
          break;
        case BULK_REQUEST_EXTRA_ACTION_FAILED:
          draft.bulkRequestExtraActionLoading[action.actionType] = false;
          draft.bulkRequestExtraActionError[action.actionType] = true;
          draft.bulkRequestExtraActionErrorMessage[action.actionType] =
            action.errorMessage;
          break;
        // 리소스 수치(stats) 요청
        case FETCH_STATS_START:
          draft.fetchStatsLoading = true;
          draft.fetchStatsError = false;
          break;
        case FETCH_STATS_SUCCEEDED:
          draft.fetchStatsLoading = false;
          draft.fetchStatsError = false;
          draft.stats = action.data;
          break;
        case FETCH_STATS_FAILED:
          draft.fetchStatsLoading = false;
          draft.fetchStatsError = true;
          draft.fetchStatsErrorMessage = action.errorMessage;
          break;
        case LOCATION_CHANGE:
          return initialState;
      }
    });

  return { reducerKey, reducer };
}

const useInjectResourceControllerReducer = ({ resources, key }) => {
  const { reducerKey, reducer } = getReducer(resources, {}, key);

  useInjectReducer({ key: reducerKey, reducer });
};

export { useInjectResourceControllerReducer, defaultInitialStateObject };

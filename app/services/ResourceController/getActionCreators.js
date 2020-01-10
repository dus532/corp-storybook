import getActionTypes from './getActionTypes';

function createStartAction(method, type) {
  return (uids, params, actionType) => ({
    type: `${type}_START`,
    uids,
    method,
    params,
    actionType,
    successAction: response => ({
      type: `${type}_SUCCEEDED`,
      ...response,
    }),
    failAction: response => ({
      type: `${type}_FAILED`,
      ...response,
    }),
  });
}

export default function getActionCreators(resources, key = 'global') {
  const {
    // 초기화
    INITIALIZE_STATE,
    // 단일 리소스
    CREATE,
    READ,
    UPDATE,
    DELETE,
    REQUEST_EXTRA_ACTION,
    // 복수 리소스
    BULK_CREATE,
    BULK_READ,
    BULK_UPDATE,
    BULK_DELETE,
    BULK_REQUEST_EXTRA_ACTION,
    // 리소스 수치(stats) 요청
    FETCH_STATS,
    // bulkRead에 필요한 params update
    PROCESSED_BULK_READ_START,
    UPDATE_LIST_DATA_PARAMS,
  } = getActionTypes(resources, key);

  return {
    // 초기화
    initializeState: () => ({
      type: INITIALIZE_STATE,
    }),
    // 단일 리소스
    createStart: createStartAction('POST', CREATE),
    readStart: createStartAction('GET', READ),
    updateStart: createStartAction('PUT', UPDATE),
    deleteStart: createStartAction('DELETE', DELETE),
    requestExtraActionStart: createStartAction('POST', REQUEST_EXTRA_ACTION),
    // 복수 리소스
    bulkCreateStart: createStartAction('POST', BULK_CREATE),
    bulkReadStart: createStartAction('GET', BULK_READ),
    bulkUpdateStart: createStartAction('PUT', BULK_UPDATE),
    bulkDeleteStart: createStartAction('DELETE', BULK_DELETE),
    bulkRequestExtraActionStart: createStartAction(
      'POST',
      BULK_REQUEST_EXTRA_ACTION,
    ),
    // 리소스 수치(stats) 요청
    // fetchStatsStart: createStartAction('GET', FETCH_STATS),
    fetchStatsStart: uids => ({
      type: `${FETCH_STATS}_START`,
      uids: [...uids, 'stats'],
      method: 'GET',
      params: {},
      successAction: response => ({
        type: `${FETCH_STATS}_SUCCEEDED`,
        ...response,
      }),
      failAction: response => ({
        type: `${FETCH_STATS}_FAILED`,
        ...response,
      }),
    }),
    // UPDATE_LIST_DATA_PARAMS & BULK_READ_START 액션을 받아서 updateParams를
    // params에 넣어서 dispatch할 actionCreator
    //  - createStartAction으로 생성되는 action과 타입을 맞춤.
    processedBulkReadStart: (uids, params) => ({
      type: PROCESSED_BULK_READ_START,
      uids,
      method: 'GET',
      params,
      successAction: response => ({
        type: `${BULK_READ}_SUCCEEDED`,
        ...response,
      }),
      failAction: response => ({
        type: `${BULK_READ}_FAILED`,
        ...response,
      }),
    }),
    // bulkRead에 필요한 params update
    updateListDataParams: (uids, params) => ({
      type: UPDATE_LIST_DATA_PARAMS,
      uids,
      params,
    }),
  };
}

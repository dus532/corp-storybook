import { createSelector } from 'reselect';

import { getKey } from 'utils/generateCarplatResourceURI';

export default function getSelectors(resources, key = 'global') {
  const reducerKey = getKey(resources, key);

  const selectState = state =>
    state[reducerKey] || { isUndefined: true, reducerKey };
  const selectRequestExtraActionLoading = state =>
    state[reducerKey].requestExtraActionLoading;
  const selectRequestExtraActionError = state =>
    state[reducerKey].requestExtraActionError;
  const selectRequestExtraActionErrorMessage = state =>
    state[reducerKey].requestExtraActionErrorMessage;
  const selectExtraData = state => state[reducerKey].extraData;
  const selectBulkRequestExtraActionLoading = state =>
    state[reducerKey].bulkRequestExtraActionLoading;
  const selectBulkRequestExtraActionError = state =>
    state[reducerKey].bulkRequestExtraActionError;
  const selectBulkRequestExtraActionErrorMessage = state =>
    state[reducerKey].bulkRequestExtraActionErrorMessage;

  const makeSelectStateFactory = stateName => () =>
    createSelector(
      selectState,
      state => state[stateName],
    );

  return {
    selectState,
    makeSelectStateFactory,
    // 예외 요청 관련 selector들. 특정 actionType과 함께 selector를 만들어서
    // 사용하면 됨.
    selectRequestExtraActionLoading,
    selectRequestExtraActionError,
    selectRequestExtraActionErrorMessage,
    selectExtraData,
    selectBulkRequestExtraActionLoading,
    selectBulkRequestExtraActionError,
    selectBulkRequestExtraActionErrorMessage,
    // 단일 리소스
    makeSelectCreateLoading: makeSelectStateFactory('createLoading'),
    makeSelectCreateError: makeSelectStateFactory('createError'),
    makeSelectCreateErrorMessage: makeSelectStateFactory('createErrorMessage'),
    makeSelectReadLoading: makeSelectStateFactory('readLoading'),
    makeSelectReadError: makeSelectStateFactory('readError'),
    makeSelectReadErrorMessage: makeSelectStateFactory('readErrorMessage'),
    makeSelectUpdateLoading: makeSelectStateFactory('updateLoading'),
    makeSelectUpdateError: makeSelectStateFactory('updateError'),
    makeSelectUpdateErrorMessage: makeSelectStateFactory('updateErrorMessage'),
    makeSelectDeleteLoading: makeSelectStateFactory('deleteLoading'),
    makeSelectDeleteError: makeSelectStateFactory('deleteError'),
    makeSelectDeleteErrorMessage: makeSelectStateFactory('deleteErrorMessage'),
    // 복수 리소스
    makeSelectBulkCreateLoading: makeSelectStateFactory('bulkCreateLoading'),
    makeSelectBulkCreateError: makeSelectStateFactory('bulkCreateError'),
    makeSelectBulkCreateErrorMessage: makeSelectStateFactory(
      'bulkCreateErrorMessage',
    ),
    makeSelectBulkReadLoading: makeSelectStateFactory('bulkReadLoading'),
    makeSelectBulkReadError: makeSelectStateFactory('bulkReadError'),
    makeSelectBulkReadErrorMessage: makeSelectStateFactory(
      'bulkReadErrorMessage',
    ),
    makeSelectBulkUpdateLoading: makeSelectStateFactory('bulkUpdateLoading'),
    makeSelectBulkUpdateError: makeSelectStateFactory('bulkUpdateError'),
    makeSelectBulkUpdateErrorMessage: makeSelectStateFactory(
      'bulkUpdateErrorMessage',
    ),
    makeSelectBulkDeleteLoading: makeSelectStateFactory('bulkDeleteLoading'),
    makeSelectBulkDeleteError: makeSelectStateFactory('bulkDeleteError'),
    makeSelectBulkDeleteErrorMessage: makeSelectStateFactory(
      'bulkDeleteErrorMessage',
    ),

    // 리소스 수치(stats) 요청
    makeSelectFetchStatsLoading: makeSelectStateFactory('fetchStatsLoading'),
    makeSelectFetchStatsError: makeSelectStateFactory('fetchStatsError'),
    makeSelectFetchStatsErrorMessage: makeSelectStateFactory(
      'fetchStatsErrorMessage',
    ),

    // 데이터
    makeSelectData: makeSelectStateFactory('data'),
    makeSelectListData: makeSelectStateFactory('listData'),
    makeSelectTotalCount: makeSelectStateFactory('totalCount'),
    makeSelectListDataParams: makeSelectStateFactory('listDataParams'),
    makeSelectStats: makeSelectStateFactory('stats'),
  };
}

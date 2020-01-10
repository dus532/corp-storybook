import { USER } from 'utils/resourceTypes';
import { getKey } from 'utils/generateCarplatResourceURI';

import getSelectors from '../getSelectors';

const key = 'test';
const resources = [USER];
const reducerKey = getKey(resources, key);

const {
  selectState,
  // 예외 요청 관련
  selectRequestExtraActionLoading,
  selectRequestExtraActionError,
  selectRequestExtraActionErrorMessage,
  selectExtraData,
  selectBulkRequestExtraActionLoading,
  selectBulkRequestExtraActionError,
  selectBulkRequestExtraActionErrorMessage,
  // 단일 리소스
  makeSelectCreateLoading,
  makeSelectCreateError,
  makeSelectCreateErrorMessage,
  makeSelectReadLoading,
  makeSelectReadError,
  makeSelectReadErrorMessage,
  makeSelectUpdateLoading,
  makeSelectUpdateError,
  makeSelectUpdateErrorMessage,
  makeSelectDeleteLoading,
  makeSelectDeleteError,
  makeSelectDeleteErrorMessage,
  // 복수 리소스
  makeSelectBulkCreateLoading,
  makeSelectBulkCreateError,
  makeSelectBulkCreateErrorMessage,
  makeSelectBulkReadLoading,
  makeSelectBulkReadError,
  makeSelectBulkReadErrorMessage,
  makeSelectBulkUpdateLoading,
  makeSelectBulkUpdateError,
  makeSelectBulkUpdateErrorMessage,
  makeSelectBulkDeleteLoading,
  makeSelectBulkDeleteError,
  makeSelectBulkDeleteErrorMessage,
  // 리소스 수치(stats) 요청
  makeSelectFetchStatsLoading,
  makeSelectFetchStatsError,
  makeSelectFetchStatsErrorMessage,
  // 데이터
  makeSelectData,
  makeSelectListData,
  makeSelectTotalCount,
  makeSelectListDataParams,
  makeSelectStats,
} = getSelectors(resources, key);

describe('selectState', () => {
  it(`should select the '${key}' key state`, () => {
    const keyState = {
      key,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(selectState(mockedState)).toEqual(keyState);
  });
});

describe('selectRequestExtraActionLoading', () => {
  it(`should select the requestExtraActionLoading state`, () => {
    const keyState = {
      requestExtraActionLoading: {
        someAction: true,
      },
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(selectRequestExtraActionLoading(mockedState)).toEqual(
      keyState.requestExtraActionLoading,
    );
  });
});

describe('selectRequestExtraActionError', () => {
  it(`should select the requestExtraActionError state`, () => {
    const keyState = {
      requestExtraActionError: {
        someAction: true,
      },
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(selectRequestExtraActionError(mockedState)).toEqual(
      keyState.requestExtraActionError,
    );
  });
});

describe('selectRequestExtraActionErrorMessage', () => {
  it(`should select the requestExtraActionErrorMessage state`, () => {
    const keyState = {
      requestExtraActionErrorMessage: {
        someAction: 'Error',
      },
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(selectRequestExtraActionErrorMessage(mockedState)).toEqual(
      keyState.requestExtraActionErrorMessage,
    );
  });
});

describe('selectExtraData', () => {
  it(`should select the requestExtraData state`, () => {
    const keyState = {
      extraData: {
        someAction: 'Error',
      },
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(selectExtraData(mockedState)).toEqual(keyState.extraData);
  });
});

describe('selectBulkRequestExtraActionLoading', () => {
  it(`should select the bulkRequestExtraActionLoading state`, () => {
    const keyState = {
      bulkRequestExtraActionLoading: {
        someAction: true,
      },
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(selectBulkRequestExtraActionLoading(mockedState)).toEqual(
      keyState.bulkRequestExtraActionLoading,
    );
  });
});

describe('selectBulkRequestExtraActionError', () => {
  it(`should select the bulkRequestExtraActionError state`, () => {
    const keyState = {
      bulkRequestExtraActionError: {
        someAction: true,
      },
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(selectBulkRequestExtraActionError(mockedState)).toEqual(
      keyState.bulkRequestExtraActionError,
    );
  });
});

describe('selectBulkRequestExtraActionErrorMessage', () => {
  it(`should select the bulkRequestExtraActionErrorMessage state`, () => {
    const keyState = {
      bulkRequestExtraActionErrorMessage: {
        someAction: 'Error',
      },
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(selectBulkRequestExtraActionErrorMessage(mockedState)).toEqual(
      keyState.bulkRequestExtraActionErrorMessage,
    );
  });
});

describe('makeSelectCreateLoading', () => {
  const createLoadingSelector = makeSelectCreateLoading();
  it(`should select the createLoading`, () => {
    const createLoading = true;
    const keyState = {
      createLoading,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(createLoadingSelector(mockedState)).toEqual(createLoading);
  });
});

describe('makeSelectCreateError', () => {
  const createErrorSelector = makeSelectCreateError();
  it(`should select the createError`, () => {
    const createError = true;
    const keyState = {
      createError,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(createErrorSelector(mockedState)).toEqual(createError);
  });
});

describe('makeSelectCreateErrorMessage', () => {
  const createErrorMessageSelector = makeSelectCreateErrorMessage();
  it(`should select the createErrorMessage`, () => {
    const createErrorMessage = 'Error';
    const keyState = {
      createErrorMessage,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(createErrorMessageSelector(mockedState)).toEqual(createErrorMessage);
  });
});

describe('makeSelectReadLoading', () => {
  const readLoadingSelector = makeSelectReadLoading();
  it(`should select the readLoading`, () => {
    const readLoading = true;
    const keyState = {
      readLoading,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(readLoadingSelector(mockedState)).toEqual(readLoading);
  });
});

describe('makeSelectReadError', () => {
  const readErrorSelector = makeSelectReadError();
  it(`should select the readError`, () => {
    const readError = true;
    const keyState = {
      readError,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(readErrorSelector(mockedState)).toEqual(readError);
  });
});

describe('makeSelectReadErrorMessage', () => {
  const readErrorMessageSelector = makeSelectReadErrorMessage();
  it(`should select the readErrorMessage`, () => {
    const readErrorMessage = 'Error';
    const keyState = {
      readErrorMessage,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(readErrorMessageSelector(mockedState)).toEqual(readErrorMessage);
  });
});

describe('makeSelectUpdateLoading', () => {
  const updateLoadingSelector = makeSelectUpdateLoading();
  it(`should select the updateLoading`, () => {
    const updateLoading = true;
    const keyState = {
      updateLoading,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(updateLoadingSelector(mockedState)).toEqual(updateLoading);
  });
});

describe('makeSelectUpdateError', () => {
  const updateErrorSelector = makeSelectUpdateError();
  it(`should select the updateError`, () => {
    const updateError = true;
    const keyState = {
      updateError,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(updateErrorSelector(mockedState)).toEqual(updateError);
  });
});

describe('makeSelectUpdateErrorMessage', () => {
  const updateErrorMessageSelector = makeSelectUpdateErrorMessage();
  it(`should select the updateErrorMessage`, () => {
    const updateErrorMessage = 'Error';
    const keyState = {
      updateErrorMessage,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(updateErrorMessageSelector(mockedState)).toEqual(updateErrorMessage);
  });
});

describe('makeSelectDeleteLoading', () => {
  const deleteLoadingSelector = makeSelectDeleteLoading();
  it(`should select the deleteLoading`, () => {
    const deleteLoading = true;
    const keyState = {
      deleteLoading,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(deleteLoadingSelector(mockedState)).toEqual(deleteLoading);
  });
});

describe('makeSelectDeleteError', () => {
  const deleteErrorSelector = makeSelectDeleteError();
  it(`should select the deleteError`, () => {
    const deleteError = true;
    const keyState = {
      deleteError,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(deleteErrorSelector(mockedState)).toEqual(deleteError);
  });
});

describe('makeSelectDeleteErrorMessage', () => {
  const deleteErrorMessageSelector = makeSelectDeleteErrorMessage();
  it(`should select the deleteErrorMessage`, () => {
    const deleteErrorMessage = 'Error';
    const keyState = {
      deleteErrorMessage,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(deleteErrorMessageSelector(mockedState)).toEqual(deleteErrorMessage);
  });
});

describe('makeSelectBulkCreateLoading', () => {
  const bulkCreateLoadingSelector = makeSelectBulkCreateLoading();
  it(`should select the bulkCreateLoading`, () => {
    const bulkCreateLoading = true;
    const keyState = {
      bulkCreateLoading,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(bulkCreateLoadingSelector(mockedState)).toEqual(bulkCreateLoading);
  });
});

describe('makeSelectBulkCreateError', () => {
  const bulkCreateErrorSelector = makeSelectBulkCreateError();
  it(`should select the bulkCreateError`, () => {
    const bulkCreateError = true;
    const keyState = {
      bulkCreateError,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(bulkCreateErrorSelector(mockedState)).toEqual(bulkCreateError);
  });
});

describe('makeSelectBulkCreateErrorMessage', () => {
  const bulkCreateErrorMessageSelector = makeSelectBulkCreateErrorMessage();
  it(`should select the bulkCreateErrorMessage`, () => {
    const bulkCreateErrorMessage = 'Error';
    const keyState = {
      bulkCreateErrorMessage,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(bulkCreateErrorMessageSelector(mockedState)).toEqual(
      bulkCreateErrorMessage,
    );
  });
});

describe('makeSelectBulkReadLoading', () => {
  const bulkReadLoadingSelector = makeSelectBulkReadLoading();
  it(`should select the bulkReadLoading`, () => {
    const bulkReadLoading = true;
    const keyState = {
      bulkReadLoading,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(bulkReadLoadingSelector(mockedState)).toEqual(bulkReadLoading);
  });
});

describe('makeSelectBulkReadError', () => {
  const bulkReadErrorSelector = makeSelectBulkReadError();
  it(`should select the bulkReadError`, () => {
    const bulkReadError = true;
    const keyState = {
      bulkReadError,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(bulkReadErrorSelector(mockedState)).toEqual(bulkReadError);
  });
});

describe('makeSelectBulkReadErrorMessage', () => {
  const bulkReadErrorMessageSelector = makeSelectBulkReadErrorMessage();
  it(`should select the bulkReadErrorMessage`, () => {
    const bulkReadErrorMessage = 'Error';
    const keyState = {
      bulkReadErrorMessage,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(bulkReadErrorMessageSelector(mockedState)).toEqual(
      bulkReadErrorMessage,
    );
  });
});

describe('makeSelectBulkUpdateLoading', () => {
  const bulkUpdateLoadingSelector = makeSelectBulkUpdateLoading();
  it(`should select the bulkUpdateLoading`, () => {
    const bulkUpdateLoading = true;
    const keyState = {
      bulkUpdateLoading,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(bulkUpdateLoadingSelector(mockedState)).toEqual(bulkUpdateLoading);
  });
});

describe('makeSelectBulkUpdateError', () => {
  const bulkUpdateErrorSelector = makeSelectBulkUpdateError();
  it(`should select the bulkUpdateError`, () => {
    const bulkUpdateError = true;
    const keyState = {
      bulkUpdateError,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(bulkUpdateErrorSelector(mockedState)).toEqual(bulkUpdateError);
  });
});

describe('makeSelectBulkUpdateErrorMessage', () => {
  const bulkUpdateErrorMessageSelector = makeSelectBulkUpdateErrorMessage();
  it(`should select the bulkUpdateErrorMessage`, () => {
    const bulkUpdateErrorMessage = 'Error';
    const keyState = {
      bulkUpdateErrorMessage,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(bulkUpdateErrorMessageSelector(mockedState)).toEqual(
      bulkUpdateErrorMessage,
    );
  });
});

describe('makeSelectBulkDeleteLoading', () => {
  const bulkDeleteLoadingSelector = makeSelectBulkDeleteLoading();
  it(`should select the bulkDeleteLoading`, () => {
    const bulkDeleteLoading = true;
    const keyState = {
      bulkDeleteLoading,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(bulkDeleteLoadingSelector(mockedState)).toEqual(bulkDeleteLoading);
  });
});

describe('makeSelectBulkDeleteError', () => {
  const bulkDeleteErrorSelector = makeSelectBulkDeleteError();
  it(`should select the bulkDeleteError`, () => {
    const bulkDeleteError = true;
    const keyState = {
      bulkDeleteError,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(bulkDeleteErrorSelector(mockedState)).toEqual(bulkDeleteError);
  });
});

describe('makeSelectBulkDeleteErrorMessage', () => {
  const bulkDeleteErrorMessageSelector = makeSelectBulkDeleteErrorMessage();
  it(`should select the bulkDeleteErrorMessage`, () => {
    const bulkDeleteErrorMessage = 'Error';
    const keyState = {
      bulkDeleteErrorMessage,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(bulkDeleteErrorMessageSelector(mockedState)).toEqual(
      bulkDeleteErrorMessage,
    );
  });
});

describe('makeSelectFetchStatsLoading', () => {
  const fetchStatsLoadingSelector = makeSelectFetchStatsLoading();
  it(`should select the fetchStatsLoading`, () => {
    const fetchStatsLoading = true;
    const keyState = {
      fetchStatsLoading,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(fetchStatsLoadingSelector(mockedState)).toEqual(fetchStatsLoading);
  });
});

describe('makeSelectFetchStatsError', () => {
  const fetchStatsErrorSelector = makeSelectFetchStatsError();
  it(`should select the fetchStatsError`, () => {
    const fetchStatsError = true;
    const keyState = {
      fetchStatsError,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(fetchStatsErrorSelector(mockedState)).toEqual(fetchStatsError);
  });
});

describe('makeSelectFetchStatsErrorMessage', () => {
  const fetchStatsErrorMessageSelector = makeSelectFetchStatsErrorMessage();
  it(`should select the fetchStatsErrorMessage`, () => {
    const fetchStatsErrorMessage = 'Error';
    const keyState = {
      fetchStatsErrorMessage,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(fetchStatsErrorMessageSelector(mockedState)).toEqual(
      fetchStatsErrorMessage,
    );
  });
});

describe('makeSelectData', () => {
  const dataSelector = makeSelectData();
  it(`should select the data`, () => {
    const data = {
      name: 'hyeonho',
    };
    const keyState = {
      data,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(dataSelector(mockedState)).toEqual(data);
  });
});

describe('makeSelectListData', () => {
  const listDataSelector = makeSelectListData();
  it(`should select the listData`, () => {
    const listData = [
      {
        name: 'hyeonho',
      },
    ];
    const keyState = {
      listData,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(listDataSelector(mockedState)).toEqual(listData);
  });
});

describe('makeSelectTotalCount', () => {
  const totalCountSelector = makeSelectTotalCount();
  it(`should select the totalCount`, () => {
    const totalCount = 1992;
    const keyState = {
      totalCount,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(totalCountSelector(mockedState)).toEqual(totalCount);
  });
});

describe('makeSelectListDataParams', () => {
  const listDataParamsSelector = makeSelectListDataParams();
  it(`should select the listDataParams`, () => {
    const listDataParams = {
      page: 0,
      perPage: 15,
    };
    const keyState = {
      listDataParams,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(listDataParamsSelector(mockedState)).toEqual(listDataParams);
  });
});

describe('makeSelectStats', () => {
  const statsSelector = makeSelectStats();
  it(`should select the stats`, () => {
    const stats = {
      count: 0,
      coverage: 100,
    };
    const keyState = {
      stats,
    };
    const mockedState = {
      [reducerKey]: keyState,
    };
    expect(statsSelector(mockedState)).toEqual(stats);
  });
});

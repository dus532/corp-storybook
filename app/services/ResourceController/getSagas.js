import { takeLatest, put, select, call, fork } from 'redux-saga/effects';

import requestAPI from 'api';
import generateCarplatResourceURI, {
  getKey,
} from 'utils/generateCarplatResourceURI';
import { useInjectSaga } from 'utils/injectSaga';
import translateFilterOption from 'utils/translateFilterOption';

import getActionTypes from './getActionTypes';
import getActionCreators from './getActionCreators';
import getSelectors from './getSelectors';
import { DESC } from './constants';

// 포맷 참고: https://www.notion.so/carplat/API-662591bb668a4a89b16103ac81ea9d1e

export default function getSaga(resources, key = 'global') {
  const {
    // 별도의 처리를 해줘야하는 액션들
    BULK_READ_START,
    UPDATE_LIST_DATA_PARAMS,
    UPDATE_PAGINATION,
    SET_ORDERING,
    UPDATE_ORDERING,
    SET_FILTERING,
    UPDATE_FILTERING,
    SET_SEARCHING_QUERY,
    // 중복 코드를 발생시키는 나머지 액션들
    CREATE_START,
    READ_START,
    UPDATE_START,
    DELETE_START,
    REQUEST_EXTRA_ACTION_START,
    BULK_CREATE_START,
    PROCESSED_BULK_READ_START,
    BULK_UPDATE_START,
    BULK_DELETE_START,
    BULK_REQUEST_EXTRA_ACTION_START,
    FETCH_STATS_START,
  } = getActionTypes(resources, key);
  const { processedBulkReadStart } = getActionCreators(resources, key);
  const { makeSelectListDataParams } = getSelectors(resources, key);

  function* bulkReadGenerator({ uids }) {
    try {
      const { pagination, ordering, filtering, ...params } = yield select(
        makeSelectListDataParams(),
      );

      // TODO
      //  - 여기서 listDataParams processing
      const order = Object.keys(ordering)
        .filter(fieldName => ordering[fieldName])
        .map(
          fieldName => `${ordering[fieldName] === DESC ? '-' : ''}${fieldName}`,
        );
      const filterArray = Object.keys(filtering)
        .filter(fieldName => Object.keys(filtering[fieldName]).length > 0)
        .map(fieldName => ({
          fieldName,
          options: Object.keys(filtering[fieldName]).map(
            option =>
              `${translateFilterOption(filtering[fieldName][option])}${option}`,
          ),
        }));

      // filter가 하나면 f=user,-admin 형태로 만듦.
      // filter가 두 개 이상이면 f[type]=sedan,-suv&f[brand]=+hyundai 형태로
      // 만듦.
      let filterObject = {};
      if (filterArray.length === 1) {
        filterObject = {
          q: filterArray[0].options.join(','),
        };
      } else if (filterArray.length > 1) {
        filterObject = filterArray.reduce((acc, { fieldName, options }) => {
          acc[`f[${fieldName}]`] = options.join(',');

          return acc;
        }, {});
      }

      const processedParams = {
        ...pagination,
        ...(order.length > 0 && {
          order: order.join(','),
        }),
        ...filterObject,
        ...params,
      };

      yield put(processedBulkReadStart(uids, processedParams));
    } catch (err) {
      const { failAction } = processedBulkReadStart();

      yield put(failAction(err.message));
    }
  }

  function* bulkReadWatcher() {
    yield takeLatest(
      [
        BULK_READ_START,
        UPDATE_LIST_DATA_PARAMS,
        UPDATE_PAGINATION,
        SET_ORDERING,
        UPDATE_ORDERING,
        SET_FILTERING,
        UPDATE_FILTERING,
        SET_SEARCHING_QUERY,
      ],
      bulkReadGenerator,
    );
  }

  function* requestGenerator({
    method,
    uids,
    params,
    actionType,
    successAction,
    failAction,
  }) {
    try {
      const URI = `${generateCarplatResourceURI(resources, uids)}${
        actionType ? `?action=${actionType}` : ''
      }`;
      const {
        message,
        totalCount,
        data: { data, extraData },
      } = yield call(requestAPI, URI, method, params);

      yield put(
        successAction({
          actionType,
          message,
          totalCount,
          data,
          extraData: extraData || {},
        }),
      );
    } catch (err) {
      yield put(
        failAction({
          actionType,
          errorMessage: err.response.message || err.message,
          data: err.response.data,
        }),
      );
    }
  }

  function* requestWatcher() {
    yield takeLatest(CREATE_START, requestGenerator);
    yield takeLatest(READ_START, requestGenerator);
    yield takeLatest(UPDATE_START, requestGenerator);
    yield takeLatest(DELETE_START, requestGenerator);
    yield takeLatest(REQUEST_EXTRA_ACTION_START, requestGenerator);
    yield takeLatest(BULK_CREATE_START, requestGenerator);
    yield takeLatest(PROCESSED_BULK_READ_START, requestGenerator);
    yield takeLatest(BULK_UPDATE_START, requestGenerator);
    yield takeLatest(BULK_DELETE_START, requestGenerator);
    yield takeLatest(BULK_REQUEST_EXTRA_ACTION_START, requestGenerator);
    yield takeLatest(FETCH_STATS_START, requestGenerator);

    yield fork(bulkReadWatcher);
  }

  return requestWatcher;
}

const useInjectResourceControllerSaga = ({ resources, key }) => {
  const saga = getSaga(resources, key);
  const resourceControllerKey = getKey(resources, key);

  useInjectSaga({ key: resourceControllerKey, saga });
};

export { useInjectResourceControllerSaga };

// 테스트

import { fork, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';

import getActionTypes from 'services/ResourceController/getActionTypes';
import { USER } from 'utils/resourceTypes';

import { KEY } from './constants';

const userResources = [USER];

const { BULK_READ_FAILED } = getActionTypes(userResources, KEY);

function* fail({ errorMessage }) {
  message.error(errorMessage);
}

function* failWatcher() {
  yield takeLatest(BULK_READ_FAILED, fail);
}

export default function* rootSaga() {
  yield fork(failWatcher);
}

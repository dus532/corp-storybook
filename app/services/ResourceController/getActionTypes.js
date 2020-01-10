import { getKey } from 'utils/generateCarplatResourceURI';

import { REQUEST_TYPES } from './constants';

function createActionTypes(type, key = 'global') {
  return {
    [type]: `${key}/${type}`,
    [`${type}_START`]: `${key}/${type}_START`,
    [`${type}_SUCCEEDED`]: `${key}/${type}_SUCCEEDED`,
    [`${type}_FAILED`]: `${key}/${type}_FAILED`,
  };
}

export default function getActionTypes(resources, key = 'global') {
  const actionKey = `ResourceController/${getKey(resources, key)}`;

  return {
    ...Object.keys(REQUEST_TYPES).reduce(
      (acc, requestTypeKey) => ({
        ...acc,
        ...createActionTypes(REQUEST_TYPES[requestTypeKey], actionKey),
      }),
      {},
    ),
    // bulkRead는 store에서 updateParams에 해당하는 값을 select하는 로직을
    // 추가해야 되기 때문에, 해당 로직을 처리하는 saga를 더 만드는 용도로 액션을
    // 더 추가함.
    PROCESSED_BULK_READ_START: `${actionKey}/PROCESSED_BULK_READ_START`,
    UPDATE_LIST_DATA_PARAMS: `${actionKey}/UPDATE_LIST_DATA_PARAMS`,
    // 초기화
    INITIALIZE_STATE: `${actionKey}/INITIALIZE_STATE`,
  };
}

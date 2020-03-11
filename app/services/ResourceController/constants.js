export const REQUEST_TYPES = {
  // 단일 리소스
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  REQUEST_EXTRA_ACTION: 'REQUEST_EXTRA_ACTION',
  // 복수 리소스
  BULK_CREATE: 'BULK_CREATE',
  BULK_READ: 'BULK_READ',
  BULK_UPDATE: 'BULK_UPDATE',
  BULK_DELETE: 'BULK_DELETE',
  BULK_REQUEST_EXTRA_ACTION: 'BULK_REQUEST_EXTRA_ACTION',
  // 리소스 수치(stats) 요청
  FETCH_STATS: 'FETCH_STATS',
};

// 오름차순
export const ASC = 'ASC';
// 내림차순
export const DESC = 'DESC';

export const ANTD_TABLE_ORDER_OPTIONS = {
  ascend: ASC,
  descend: DESC,
};

/*
 * filtering 에서 사용됨.
 *  ex). filter type
 *   OR => type
 *   AND => +type
 *   NOT => -type
 *
 * 아래 링크 참고
 * https://github.com/plat-dev/carplat-api-lts/blob/develop/docs/guidelines/rest-api.md#%EA%B2%80%EC%83%89-searching
 */
export const OR = 'OR';
export const AND = 'AND';
export const NOT = 'NOT';

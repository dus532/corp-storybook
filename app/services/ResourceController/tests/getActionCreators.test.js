import { USER } from 'utils/resourceTypes';

import getActionTypes from '../getActionTypes';
import getActionCreators from '../getActionCreators';

const key = 'test';
const resources = [USER];

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
  // bulkRead에 필요한 params update
  PROCESSED_BULK_READ_START,
  UPDATE_LIST_DATA_PARAMS,
} = getActionTypes(resources, key);

const {
  initializeState,
  createStart,
  readStart,
  updateStart,
  deleteStart,
  requestExtraActionStart,
  bulkCreateStart,
  bulkReadStart,
  bulkUpdateStart,
  bulkDeleteStart,
  bulkRequestExtraActionStart,
  fetchStatsStart,
  processedBulkReadStart,
  updateListDataParams,
} = getActionCreators(resources, key);

describe('ResourceController ActionCreators', () => {
  describe('initializeState', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: INITIALIZE_STATE,
      };

      expect(initializeState()).toEqual(expectedResult);
    });
  });

  describe('createStart', () => {
    const uids = ['A', 'B'];
    const params = {
      name: 'hyeonho',
      dayOfBirth: '19921025',
    };
    const actionType = 'ExtraAction';
    const successAction = response => ({
      type: CREATE_SUCCEEDED,
      ...response,
    });
    const failAction = response => ({
      type: CREATE_FAILED,
      ...response,
    });
    const {
      successAction: returnedSuccessAction,
      failAction: returnedFailAction,
    } = createStart(uids, params, actionType);

    it('should return the correct type and the passed uids & params & actionType', () => {
      const method = 'POST';
      const expectedResult = {
        type: CREATE_START,
        uids,
        method,
        params,
        actionType,
        successAction,
        failAction,
      };

      expect(JSON.stringify(createStart(uids, params, actionType))).toEqual(
        JSON.stringify(expectedResult),
      );
    });

    describe('successAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'hyeonho',
          },
          extraData: {},
          message: 'success',
        };
        const expectedResult = {
          type: CREATE_SUCCEEDED,
          ...response,
        };

        expect(JSON.stringify(returnedSuccessAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });

    describe('failAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'this field is weird',
          },
          extraData: {},
          message: 'fail',
        };
        const expectedResult = {
          type: CREATE_FAILED,
          ...response,
        };

        expect(JSON.stringify(returnedFailAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });
  });

  describe('readStart', () => {
    const uids = ['A', 'B'];
    const params = {};
    const actionType = 'ExtraAction';
    const successAction = response => ({
      type: READ_SUCCEEDED,
      ...response,
    });
    const failAction = response => ({
      type: READ_FAILED,
      ...response,
    });
    const {
      successAction: returnedSuccessAction,
      failAction: returnedFailAction,
    } = readStart(uids, params, actionType);

    it('should return the correct type and the passed uids & params & actionType', () => {
      const method = 'GET';
      const expectedResult = {
        type: READ_START,
        uids,
        method,
        params,
        actionType,
        successAction,
        failAction,
      };

      expect(JSON.stringify(readStart(uids, params, actionType))).toEqual(
        JSON.stringify(expectedResult),
      );
    });

    describe('successAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'hyeonho',
          },
          extraData: {},
          message: 'success',
        };
        const expectedResult = {
          type: READ_SUCCEEDED,
          ...response,
        };

        expect(JSON.stringify(returnedSuccessAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });

    describe('failAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'this field is weird',
          },
          extraData: {},
          message: 'fail',
        };
        const expectedResult = {
          type: READ_FAILED,
          ...response,
        };

        expect(JSON.stringify(returnedFailAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });
  });

  describe('updateStart', () => {
    const uids = ['A', 'B'];
    const params = {
      name: 'hyeonho',
      dayOfBirth: '19921025',
    };
    const actionType = 'ExtraAction';
    const successAction = response => ({
      type: UPDATE_SUCCEEDED,
      ...response,
    });
    const failAction = response => ({
      type: UPDATE_FAILED,
      ...response,
    });
    const {
      successAction: returnedSuccessAction,
      failAction: returnedFailAction,
    } = updateStart(uids, params, actionType);

    it('should return the correct type and the passed uids & params & actionType', () => {
      const method = 'PUT';
      const expectedResult = {
        type: UPDATE_START,
        uids,
        method,
        params,
        actionType,
        successAction,
        failAction,
      };

      expect(JSON.stringify(updateStart(uids, params, actionType))).toEqual(
        JSON.stringify(expectedResult),
      );
    });

    describe('successAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'hyeonho',
          },
          extraData: {},
          message: 'success',
        };
        const expectedResult = {
          type: UPDATE_SUCCEEDED,
          ...response,
        };

        expect(JSON.stringify(returnedSuccessAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });

    describe('failAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'this field is weird',
          },
          extraData: {},
          message: 'fail',
        };
        const expectedResult = {
          type: UPDATE_FAILED,
          ...response,
        };

        expect(JSON.stringify(returnedFailAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });
  });

  describe('deleteStart', () => {
    const uids = ['A', 'B'];
    const params = {};
    const actionType = 'ExtraAction';
    const successAction = response => ({
      type: DELETE_SUCCEEDED,
      ...response,
    });
    const failAction = response => ({
      type: DELETE_FAILED,
      ...response,
    });
    const {
      successAction: returnedSuccessAction,
      failAction: returnedFailAction,
    } = deleteStart(uids, params, actionType);

    it('should return the correct type and the passed uids & params & actionType', () => {
      const method = 'DELETE';
      const expectedResult = {
        type: DELETE_START,
        uids,
        method,
        params,
        actionType,
        successAction,
        failAction,
      };

      expect(JSON.stringify(deleteStart(uids, params, actionType))).toEqual(
        JSON.stringify(expectedResult),
      );
    });

    describe('successAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {},
          extraData: {},
          message: 'success',
        };
        const expectedResult = {
          type: DELETE_SUCCEEDED,
          ...response,
        };

        expect(JSON.stringify(returnedSuccessAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });

    describe('failAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {},
          extraData: {},
          message: 'fail',
        };
        const expectedResult = {
          type: DELETE_FAILED,
          ...response,
        };

        expect(JSON.stringify(returnedFailAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });
  });

  describe('requestExtraActionStart', () => {
    const uids = ['A', 'B'];
    const params = {
      name: 'hyeonho',
      dayOfBirth: '19921025',
    };
    const actionType = 'ExtraAction';
    const successAction = response => ({
      type: REQUEST_EXTRA_ACTION_SUCCEEDED,
      ...response,
    });
    const failAction = response => ({
      type: REQUEST_EXTRA_ACTION_FAILED,
      ...response,
    });
    const {
      successAction: returnedSuccessAction,
      failAction: returnedFailAction,
    } = requestExtraActionStart(uids, params, actionType);

    it('should return the correct type and the passed uids & params & actionType', () => {
      const method = 'POST';
      const expectedResult = {
        type: REQUEST_EXTRA_ACTION_START,
        uids,
        method,
        params,
        actionType,
        successAction,
        failAction,
      };

      expect(
        JSON.stringify(requestExtraActionStart(uids, params, actionType)),
      ).toEqual(JSON.stringify(expectedResult));
    });

    describe('successAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'hyeonho',
          },
          extraData: {},
          message: 'success',
        };
        const expectedResult = {
          type: REQUEST_EXTRA_ACTION_SUCCEEDED,
          ...response,
        };

        expect(JSON.stringify(returnedSuccessAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });

    describe('failAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'this field is weird',
          },
          extraData: {},
          message: 'fail',
        };
        const expectedResult = {
          type: REQUEST_EXTRA_ACTION_FAILED,
          ...response,
        };

        expect(JSON.stringify(returnedFailAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });
  });

  describe('bulkCreateStart', () => {
    const uids = ['A', 'B'];
    const params = {
      name: 'hyeonho',
      dayOfBirth: '19921025',
    };
    const actionType = 'ExtraAction';
    const successAction = response => ({
      type: BULK_CREATE_SUCCEEDED,
      ...response,
    });
    const failAction = response => ({
      type: BULK_CREATE_FAILED,
      ...response,
    });
    const {
      successAction: returnedSuccessAction,
      failAction: returnedFailAction,
    } = bulkCreateStart(uids, params, actionType);

    it('should return the correct type and the passed uids & params & actionType', () => {
      const method = 'POST';
      const expectedResult = {
        type: BULK_CREATE_START,
        uids,
        method,
        params,
        actionType,
        successAction,
        failAction,
      };

      expect(JSON.stringify(bulkCreateStart(uids, params, actionType))).toEqual(
        JSON.stringify(expectedResult),
      );
    });

    describe('successAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'hyeonho',
          },
          extraData: {},
          message: 'success',
        };
        const expectedResult = {
          type: BULK_CREATE_SUCCEEDED,
          ...response,
        };

        expect(JSON.stringify(returnedSuccessAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });

    describe('failAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'this field is weird',
          },
          extraData: {},
          message: 'fail',
        };
        const expectedResult = {
          type: BULK_CREATE_FAILED,
          ...response,
        };

        expect(JSON.stringify(returnedFailAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });
  });

  describe('bulkReadStart', () => {
    const uids = ['A', 'B'];
    const params = {};
    const actionType = 'ExtraAction';
    const successAction = response => ({
      type: BULK_READ_SUCCEEDED,
      ...response,
    });
    const failAction = response => ({
      type: BULK_READ_FAILED,
      ...response,
    });
    const {
      successAction: returnedSuccessAction,
      failAction: returnedFailAction,
    } = bulkReadStart(uids, params, actionType);

    it('should return the correct type and the passed uids & params & actionType', () => {
      const method = 'GET';
      const expectedResult = {
        type: BULK_READ_START,
        uids,
        method,
        params,
        actionType,
        successAction,
        failAction,
      };

      expect(JSON.stringify(bulkReadStart(uids, params, actionType))).toEqual(
        JSON.stringify(expectedResult),
      );
    });

    describe('successAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'hyeonho',
          },
          extraData: {},
          message: 'success',
        };
        const expectedResult = {
          type: BULK_READ_SUCCEEDED,
          ...response,
        };

        expect(JSON.stringify(returnedSuccessAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });

    describe('failAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'this field is weird',
          },
          extraData: {},
          message: 'fail',
        };
        const expectedResult = {
          type: BULK_READ_FAILED,
          ...response,
        };

        expect(JSON.stringify(returnedFailAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });
  });

  describe('bulkUpdateStart', () => {
    const uids = ['A', 'B'];
    const params = {
      name: 'hyeonho',
      dayOfBirth: '19921025',
    };
    const actionType = 'ExtraAction';
    const successAction = response => ({
      type: BULK_UPDATE_SUCCEEDED,
      ...response,
    });
    const failAction = response => ({
      type: BULK_UPDATE_FAILED,
      ...response,
    });
    const {
      successAction: returnedSuccessAction,
      failAction: returnedFailAction,
    } = bulkUpdateStart(uids, params, actionType);

    it('should return the correct type and the passed uids & params & actionType', () => {
      const method = 'PUT';
      const expectedResult = {
        type: BULK_UPDATE_START,
        uids,
        method,
        params,
        actionType,
        successAction,
        failAction,
      };

      expect(JSON.stringify(bulkUpdateStart(uids, params, actionType))).toEqual(
        JSON.stringify(expectedResult),
      );
    });

    describe('successAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'hyeonho',
          },
          extraData: {},
          message: 'success',
        };
        const expectedResult = {
          type: BULK_UPDATE_SUCCEEDED,
          ...response,
        };

        expect(JSON.stringify(returnedSuccessAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });

    describe('failAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'this field is weird',
          },
          extraData: {},
          message: 'fail',
        };
        const expectedResult = {
          type: BULK_UPDATE_FAILED,
          ...response,
        };

        expect(JSON.stringify(returnedFailAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });
  });

  describe('bulkDeleteStart', () => {
    const uids = ['A', 'B'];
    const params = {};
    const actionType = 'ExtraAction';
    const successAction = response => ({
      type: BULK_DELETE_SUCCEEDED,
      ...response,
    });
    const failAction = response => ({
      type: BULK_DELETE_FAILED,
      ...response,
    });
    const {
      successAction: returnedSuccessAction,
      failAction: returnedFailAction,
    } = bulkDeleteStart(uids, params, actionType);

    it('should return the correct type and the passed uids & params & actionType', () => {
      const method = 'DELETE';
      const expectedResult = {
        type: BULK_DELETE_START,
        uids,
        method,
        params,
        actionType,
        successAction,
        failAction,
      };

      expect(JSON.stringify(bulkDeleteStart(uids, params, actionType))).toEqual(
        JSON.stringify(expectedResult),
      );
    });

    describe('successAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {},
          extraData: {},
          message: 'success',
        };
        const expectedResult = {
          type: BULK_DELETE_SUCCEEDED,
          ...response,
        };

        expect(JSON.stringify(returnedSuccessAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });

    describe('failAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {},
          extraData: {},
          message: 'fail',
        };
        const expectedResult = {
          type: BULK_DELETE_FAILED,
          ...response,
        };

        expect(JSON.stringify(returnedFailAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });
  });

  describe('bulkRequestExtraActionStart', () => {
    const uids = ['A', 'B'];
    const params = {
      name: 'hyeonho',
      dayOfBirth: '19921025',
    };
    const actionType = 'ExtraAction';
    const successAction = response => ({
      type: BULK_REQUEST_EXTRA_ACTION_SUCCEEDED,
      ...response,
    });
    const failAction = response => ({
      type: BULK_REQUEST_EXTRA_ACTION_FAILED,
      ...response,
    });
    const {
      successAction: returnedSuccessAction,
      failAction: returnedFailAction,
    } = bulkRequestExtraActionStart(uids, params, actionType);

    it('should return the correct type and the passed uids & params & actionType', () => {
      const method = 'POST';
      const expectedResult = {
        type: BULK_REQUEST_EXTRA_ACTION_START,
        uids,
        method,
        params,
        actionType,
        successAction,
        failAction,
      };

      expect(
        JSON.stringify(bulkRequestExtraActionStart(uids, params, actionType)),
      ).toEqual(JSON.stringify(expectedResult));
    });

    describe('successAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'hyeonho',
          },
          extraData: {},
          message: 'success',
        };
        const expectedResult = {
          type: BULK_REQUEST_EXTRA_ACTION_SUCCEEDED,
          ...response,
        };

        expect(JSON.stringify(returnedSuccessAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });

    describe('failAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'this field is weird',
          },
          extraData: {},
          message: 'fail',
        };
        const expectedResult = {
          type: BULK_REQUEST_EXTRA_ACTION_FAILED,
          ...response,
        };

        expect(JSON.stringify(returnedFailAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });
  });

  describe('fetchStatsStart', () => {
    const uids = ['A', 'B'];
    const params = {};
    const actionType = 'ExtraAction';
    const successAction = response => ({
      type: FETCH_STATS_SUCCEEDED,
      ...response,
    });
    const failAction = response => ({
      type: FETCH_STATS_FAILED,
      ...response,
    });
    const {
      successAction: returnedSuccessAction,
      failAction: returnedFailAction,
    } = fetchStatsStart(uids, params, actionType);

    it('should return the correct type and the passed uids & params & actionType', () => {
      const method = 'GET';
      const expectedResult = {
        type: FETCH_STATS_START,
        uids: [...uids, 'stats'],
        method,
        params,
        successAction,
        failAction,
      };

      expect(JSON.stringify(fetchStatsStart(uids, params, actionType))).toEqual(
        JSON.stringify(expectedResult),
      );
    });

    describe('successAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'hyeonho',
          },
          extraData: {},
          message: 'success',
        };
        const expectedResult = {
          type: FETCH_STATS_SUCCEEDED,
          ...response,
        };

        expect(JSON.stringify(returnedSuccessAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });

    describe('failAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'this field is weird',
          },
          extraData: {},
          message: 'fail',
        };
        const expectedResult = {
          type: FETCH_STATS_FAILED,
          ...response,
        };

        expect(JSON.stringify(returnedFailAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });
  });

  describe('processedBulkReadStart', () => {
    const uids = ['A', 'B'];
    const params = {
      page: 0,
      perPage: 15,
    };
    const {
      successAction: returnedSuccessAction,
      failAction: returnedFailAction,
    } = processedBulkReadStart(uids, params);

    it('should return the correct type and the passed uids and the passed params', () => {
      const method = 'GET';
      const successAction = response => ({
        type: BULK_READ_SUCCEEDED,
        ...response,
      });
      const failAction = response => ({
        tpye: BULK_READ_FAILED,
        ...response,
      });
      const expectedResult = {
        type: PROCESSED_BULK_READ_START,
        uids,
        method,
        params,
        successAction,
        failAction,
      };

      expect(JSON.stringify(processedBulkReadStart(uids, params))).toEqual(
        JSON.stringify(expectedResult),
      );
    });

    describe('successAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'hyeonho',
          },
          extraData: {},
          message: 'success',
        };
        const expectedResult = {
          type: BULK_READ_SUCCEEDED,
          ...response,
        };

        expect(JSON.stringify(returnedSuccessAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });

    describe('failAction', () => {
      it('should return the correct type and the passed and destructured response object', () => {
        const response = {
          data: {
            name: 'this field is weird',
          },
          extraData: {},
          message: 'fail',
        };
        const expectedResult = {
          type: BULK_READ_FAILED,
          ...response,
        };

        expect(JSON.stringify(returnedFailAction(response))).toEqual(
          JSON.stringify(expectedResult),
        );
      });
    });
  });

  describe('updateListDataParams', () => {
    it('should return the correct type and the passed uids and the passed params', () => {
      const uids = ['A', 'B'];
      const params = {
        page: 0,
        perPage: 15,
      };
      const expectedResult = {
        type: UPDATE_LIST_DATA_PARAMS,
        uids,
        params,
      };

      expect(updateListDataParams(uids, params)).toEqual(expectedResult);
    });
  });
});

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { CAR_MODEL } from 'utils/resourceTypes';
import { useInjectResourceControllerReducer } from 'services/ResourceController/getReducer';
import { useInjectResourceControllerSaga } from 'services/ResourceController/getSagas';
import getActionCreators from 'services/ResourceController/getActionCreators';
import getSelectors from 'services/ResourceController/getSelectors';
import Filter from 'containers/Filter';
// import { RENDER_TYPES } from 'containers/Filter/constants';

import { KEY, filters } from './constants';

const carModelResources = [CAR_MODEL];

/* CAR_MODEL */
const { updateListDataParams: updateCarModelsParams } = getActionCreators(
  carModelResources,
  KEY,
);

const {
  makeSelectBulkReadLoading: makeSelectFetchCarModelsLoading,
  makeSelectBulkReadError: makeSelectFetchCarModelsError,
  makeSelectBulkReadErrorMessage: makeSelectFetchCarModelsErrorMessage,
  makeSelectListData: makeSelectCarModels,
} = getSelectors(carModelResources, KEY);
/* CAR_MODEL */

function test(carModels) {
  return Object.values(
    carModels.reduce((acc, { brand, name, uid }) => {
      if (!acc[brand]) {
        acc[brand] = {
          key: brand,
          value: brand,
          title: brand,
          children: [],
        };
      }

      acc[brand].children.push({
        key: uid,
        value: uid,
        title: name,
      });

      return acc;
    }, {}),
  );
}

function FilterTest({
  carModels,
  /*
  loading,
  error,
  errorMessage,
  */
  fetchCarModels,
  updateListDataParams,
}) {
  useInjectResourceControllerReducer({
    key: KEY,
    resources: carModelResources,
  });
  useInjectResourceControllerSaga({ key: KEY, resources: carModelResources });

  useEffect(() => {
    fetchCarModels();
  }, []);

  console.log(carModels);
  console.log(test(carModels || []));

  /*
  let carModelPlaceholder = '차량 모델 선택';
  if (loading) {
    carModelPlaceholder = '불러오는 중';
  } else if (error) {
    carModelPlaceholder = errorMessage;
  }
  */

  /*
  const newFilters = [
    ...filters,
    {
      type: RENDER_TYPES.TREE_SELECT,
      name: 'carModel',
      placeholder: carModelPlaceholder,
      treeData: test(carModels),
      loading,
      disabled: loading || error,
    },
  ];
  */

  return (
    <Filter
      filters={filters}
      updateListDataParams={updateListDataParams}
      preprocessValues={({ time, scope, ...values }) => ({
        ...values,
        time: time.format('HH:mmZ'),
        from: scope[0].format(),
        to: scope[1].format(),
      })}
    />
  );
}

FilterTest.propTypes = {
  updateListDataParams: PropTypes.func.isRequired,
  fetchCarModels: PropTypes.func.isRequired,
  carModels: PropTypes.array.isRequired,
  /*
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  */
};

const mapStateToProps = createStructuredSelector({
  carModels: makeSelectCarModels(),
  loading: makeSelectFetchCarModelsLoading(),
  error: makeSelectFetchCarModelsError(),
  errorMessage: makeSelectFetchCarModelsErrorMessage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchCarModels: () => dispatch(updateCarModelsParams({ perPage: 10000 })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FilterTest);

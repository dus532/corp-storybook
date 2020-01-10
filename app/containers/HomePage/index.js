/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import { Layout } from 'antd';

import { USER } from 'utils/resourceTypes';
import { useInjectResourceControllerReducer } from 'services/ResourceController/getReducer';
import { useInjectResourceControllerSaga } from 'services/ResourceController/getSagas';
import getActionCreators from 'services/ResourceController/getActionCreators';
import getSelectors from 'services/ResourceController/getSelectors';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import withPageHeader from 'HOCs/withPageHeader';

const { Content } = Layout;

const key = 'home';
const userResources = [USER];

const { updateListDataParams } = getActionCreators(userResources, key);

const {
  makeSelectBulkReadLoading,
  makeSelectBulkReadError,
  makeSelectBulkReadErrorMessage,
  makeSelectListData,
  makeSelectTotalCount,
} = getSelectors(userResources, key);

export function HomePage({
  /* USERS */
  fetchUsers,
  fetchUsersLoading,
  fetchUsersError,
  fetchUsersErrorMessage,
  users,
  totalCount,
  /* USERS */
  /* REDUX-FORM */
  handleSubmit,
  /* REDUX-FORM */
}) {
  useInjectResourceControllerReducer({ key, resources: userResources });
  useInjectResourceControllerSaga({ key, resources: userResources });

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Content>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="테스트용 페이지" />
      </Helmet>
      <div>
        {fetchUsersLoading && <span>Loading...</span>}
        {fetchUsersError && <span>Error...!{fetchUsersErrorMessage}</span>}
        {!fetchUsersLoading && !fetchUsersError && users && users.length > 0 && (
          <span>
            {users && users.length} 개의 유저 (총 {totalCount} 개)
          </span>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <Field component="input" name="test" />
        <button type="submit">테스트</button>
      </form>
    </Content>
  );
}

HomePage.propTypes = {
  fetchUsers: PropTypes.func,
  fetchUsersLoading: PropTypes.bool,
  fetchUsersError: PropTypes.bool,
  fetchUsersErrorMessage: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.object),
  totalCount: PropTypes.number,
  handleSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  users: makeSelectListData(),
  totalCount: makeSelectTotalCount(),
  fetchUsersLoading: makeSelectBulkReadLoading(),
  fetchUsersError: makeSelectBulkReadError(),
  fetchUsersErrorMessage: makeSelectBulkReadErrorMessage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () =>
      dispatch(
        updateListDataParams([], {
          page: 0,
          perPage: 15,
        }),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

function onSubmit(values, dispatch, { form }) {
  return {
    type: 'SUBMIT',
    values,
    form,
  };
}

const withReduxForm = reduxForm({
  form: key,
  submitAsSideEffect: true,
  onSubmit,
});

export default compose(
  withReduxForm,
  withConnect,
  withPageHeader,
  memo,
)(HomePage);

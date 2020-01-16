/*
 * 유저 관리 페이지
 *
 * 설명용으로 작성된 예시 페이지 입니다.
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
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
import { useInjectSaga } from 'utils/injectSaga';

import { KEY } from './constants';
import messages from './messages';
import saga from './saga';

const { Content } = Layout;

const userResources = [USER];

const { updateListDataParams } = getActionCreators(userResources, KEY);

const {
  makeSelectBulkReadLoading,
  makeSelectBulkReadError,
  makeSelectBulkReadErrorMessage,
  makeSelectListData,
  makeSelectTotalCount,
} = getSelectors(userResources, KEY);

export function UserManagementPage({
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
  useInjectSaga({ key: KEY, saga });
  useInjectResourceControllerReducer({ key: KEY, resources: userResources });
  useInjectResourceControllerSaga({ key: KEY, resources: userResources });

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Content>
      <Helmet>
        <title>UserManagement Page</title>
        <meta name="description" content="유저 테스트용 페이지" />
      </Helmet>
      <div>
        {fetchUsersLoading && <FormattedMessage {...messages.loadingText} />}
        {fetchUsersError && (
          <FormattedMessage
            {...messages.errorText}
            values={{ errorMessage: fetchUsersErrorMessage }}
          />
        )}
        {!fetchUsersLoading && !fetchUsersError && users && users.length > 0 && (
          <FormattedMessage
            {...messages.totalCount}
            values={{
              userLength: users.length,
              totalCount,
            }}
          />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <Field component="input" name="test" />
        <button type="submit">테스트</button>
      </form>
    </Content>
  );
}

UserManagementPage.propTypes = {
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
  form: KEY,
  submitAsSideEffect: true,
  onSubmit,
});

export default compose(
  withReduxForm,
  withConnect,
  withPageHeader,
  memo,
)(UserManagementPage);

import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Nav from 'containers/Nav';
import HomePage from 'containers/HomePage/Loadable';
import { ADMINISTRATOR_TYPES } from 'utils/constants';

import UserManagementManagementPage from '../features/userManagement/Management/Loadable';

const { Header, Sider } = Layout;

export default function CarplatLayout() {
  return (
    <Layout>
      <Helmet title="카플랫 관리자">
        <meta name="description" content="카플랫 관리자 페이지입니다." />
      </Helmet>

      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Nav adminType={ADMINISTRATOR_TYPES.CARPLAT_MASTER} />
      </Sider>

      <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: 0, marginBottom: 2 }} />
        <Switch>
          <Route exact path="/carplat" component={HomePage} />
          <Route
            exact
            path="/carplat/userManagement/management"
            component={UserManagementManagementPage}
          />
        </Switch>
      </Layout>
    </Layout>
  );
}

/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Nav from 'containers/Nav';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

const { Header, Sider } = Layout;

export default function App() {
  return (
    <Layout>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Nav />
      </Sider>
      <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: 0, marginBottom: 2 }} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/first/test/test2" component={HomePage} />
          <Route exact path="/first/layout" component={HomePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Layout>
      <GlobalStyle />
    </Layout>
  );
}

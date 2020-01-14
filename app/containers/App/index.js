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

import NotFoundPage from 'pages/common/NotFoundPage/Loadable';
import CarplatLayout from 'pages/carplat/Layout';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <>
      <Helmet titleTemplate="%s - 카플랫 관리자 페이지" defaultTitle="카플랫">
        <meta name="description" content="카플랫 서비스 관리툴입니다." />
      </Helmet>
      <Switch>
        <Route path="/carplat/" component={CarplatLayout} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}

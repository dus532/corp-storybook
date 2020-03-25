import React from 'react';

import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import SignIn from 'pages/common/signin';
import GlobalStyle from 'global-styles';

const App = () => (
  <>
    <Helmet titleTemplate="%s - 카플랫 관리자 페이지" defaultTitle="카플랫">
      <meta name="description" content="카플랫 서비스 관리툴입니다." />
    </Helmet>
    <Switch>
      <Route path="/" exact component={SignIn} />
    </Switch>
    <GlobalStyle />
  </>
);

export default App;

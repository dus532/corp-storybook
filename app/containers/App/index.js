import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import {
  SignIn,
  DashBoard,
  InitRegisterCard,
  InitIntroduce,
  InitPayment,
  InitUsage,
} from 'pages';
import { Header } from 'components';

import GlobalStyle from 'global-styles';

const App = () => {
  const userData = useSelector(state => state.user);
  const routerData = useSelector(state => state.router);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData.name && document.location.pathname !== '/') {
      dispatch(push('/'));
    }
  }, []);

  return (
    <>
      <Helmet titleTemplate="%s - 카플랫 관리자 페이지" defaultTitle="카플랫">
        <meta name="description" content="카플랫 서비스 관리툴입니다." />
      </Helmet>
      {/* 헤더 표시 */}
      <Header
        isSigned={userData.name}
        location={routerData.location.pathname}
      />
      <Switch>
        {/* 로그인 부분 */}
        <Route path="/" exact component={SignIn} />
        {/* 초기설정 */}
        <Route path="/initial/introduce" exact component={InitIntroduce} />
        <Route
          path="/initial/registerCard"
          exact
          component={InitRegisterCard}
        />
        <Route path="/initial/payment" exact component={InitPayment} />
        <Route path="/initial/usage" exact component={InitUsage} />
        {/* 대쉬보드 */}
        <Route path="/home" exact component={DashBoard} />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;

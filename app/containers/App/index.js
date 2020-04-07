import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Helmet } from 'react-helmet';
import { Switch, Route, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import {
  SignIn,
  DashBoard,
  InitRegisterCard,
  InitIntroduce,
  InitPayment,
  InitUsage,
} from 'pages';
import { Header, Sending } from 'components';

import { actionSetUser } from 'store';

import GlobalStyle from 'global-styles';

const App = () => {
  const userData = useSelector(state => state.user);
  const routerData = useSelector(state => state.router);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (Cookies.getJSON('UUID')) {
      dispatch(actionSetUser(Cookies.getJSON('UUID')));
    }
    if (!userData.username && document.location.pathname !== '/') {
      history.push('/');
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
      <Sending />
    </>
  );
};

export default App;

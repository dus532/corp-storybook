import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import {
  SignIn,
  DashBoard,
  InitRegisterCard,
  InitIntroduce,
  InitPayment,
  InitUsage,
  Payment,
} from 'pages';
import { Header } from 'components';

import { actionSetUser, actionSignOut } from 'stores';

import GlobalStyle from 'global-styles';

import UserManager from 'utils/userManager';

const App = () => {
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const USER = UserManager().getUser();
    if (USER && !userData.data) {
      dispatch(actionSetUser(USER));
    } else if (!USER && document.location.pathname !== '/') {
      dispatch(actionSignOut());
      history.push('/');
    }
  }, [location]);

  return (
    <>
      <Helmet titleTemplate="%s - 카플랫 관리자 페이지" defaultTitle="카플랫">
        <meta name="description" content="카플랫 서비스 관리툴입니다." />
      </Helmet>
      {/* 헤더 표시 */}
      <Header isSigned={userData.data} location={location.pathname} />
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
        {/* 결제내역 */}
        <Route path="/payment" exact component={Payment} />
      </Switch>
      <GlobalStyle />
    </>
  );
};

export default App;

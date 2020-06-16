import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import Sticky from 'react-sticky-fill';

import {
  Apply,
  ApplyOK,
  SignIn,
  DashBoard,
  InitRegisterCard,
  InitIntroduce,
  InitPayment,
  InitUsage,
  Payment,
  Employee,
  Rental,
  SettingAnnouncements,
  SettingSubscription,
  SettingSubscriptionUpdate,
  SettingSubscriptionPayment,
  SettingSubscriptionExpires,
  SettingCorpInfo,
  SettingCorpInfoUpdate,
  SettingPaymentCard,
  SettingPaymentCardCreate,
  SettingPaymentCardUsage,
  SettingFAQ,
  SettingFAQBoard,
  SettingTerms,
  SettingService,
  MyPage,
  ChangePW,
  ChangeInfo,
} from 'pages';
import { Header, Footer } from 'components';

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
    } else if (
      USER &&
      !USER.isInitialized &&
      !location.pathname.includes('initial') &&
      !location.pathname.includes('mypage')
    ) {
      history.push('/initial/introduce');
    } else if (
      !USER &&
      location.pathname !== '/' &&
      !location.pathname.includes('apply')
    ) {
      dispatch(actionSignOut());
      history.push('/');
    }
  }, [location]);

  return (
    <>
      <Helmet
        titleTemplate="%s - 카플랫 관리자 페이지"
        defaultTitle="카플랫 비즈 - 기업 관리자"
      >
        <meta name="description" content="카플랫 서비스 관리툴입니다." />
      </Helmet>
      {userData.data && !location.pathname.includes('apply') && (
        <Sticky style={{ zIndex: 2 }}>
          <Header isSigned={userData.data} location={location.pathname} />
        </Sticky>
      )}
      <Switch>
        {/* 로그인 부분 */}
        <Route path="/" exact component={SignIn} />
        <Route path="/apply" exact component={Apply} />
        <Route path="/apply/ok" exact component={ApplyOK} />
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
        {/* 사원관리 */}
        <Route path="/employee" exact component={Employee} />
        {/* 예약조회 */}
        <Route path="/rental" exact component={Rental} />
        {/* 설정 */}
        {/* 공지사항 */}
        <Route
          path="/setting/announcements"
          exact
          component={SettingAnnouncements}
        />
        {/* 구독관리 */}
        <Route
          path="/setting/subscription"
          exact
          component={SettingSubscription}
        />
        <Route
          path="/setting/subscription/update"
          exact
          component={SettingSubscriptionUpdate}
        />
        <Route
          path="/setting/subscription/payment"
          exact
          component={SettingSubscriptionPayment}
        />
        <Route
          path="/setting/subscription/expires"
          exact
          component={SettingSubscriptionExpires}
        />
        {/* 기업정보 */}
        <Route path="/setting/corp" exact component={SettingCorpInfo} />
        <Route
          path="/setting/corp/update"
          exact
          component={SettingCorpInfoUpdate}
        />
        {/* 결제카드관리 */}
        <Route
          path="/setting/paymentcard"
          exact
          component={SettingPaymentCard}
        />
        <Route
          path="/setting/paymentcard/:id"
          exact
          component={SettingPaymentCardCreate}
        />
        <Route
          path="/setting/paymentcard/create"
          exact
          component={SettingPaymentCardCreate}
        />
        <Route
          path="/setting/paymentcard/usage/:id"
          exact
          component={SettingPaymentCardUsage}
        />
        {/* 기타 */}
        <Route path="/setting/faq" exact component={SettingFAQ} />
        <Route path="/setting/faq/board" exact component={SettingFAQBoard} />
        <Route path="/setting/cs" exact component={SettingService} />
        <Route path="/setting/terms" exact component={SettingTerms} />
        {/* 마이페이지 */}
        <Route path="/mypage" exact component={MyPage} />
        <Route path="/mypage/changepw" exact component={ChangePW} />
        <Route path="/mypage/changeinfo" exact component={ChangeInfo} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </>
  );
};

export default App;

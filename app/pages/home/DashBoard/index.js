import React from 'react';

import {
  Container,
  MyPanel,
  WelcomePanel,
  RecentPaymentPanel,
  TeamPaymentPanel,
} from 'components';

const DashBoard = () => (
  <Container>
    <WelcomePanel name="휴맥스 관리자" />
    <MyPanel />
    <RecentPaymentPanel />
    <TeamPaymentPanel />
  </Container>
);

export default DashBoard;

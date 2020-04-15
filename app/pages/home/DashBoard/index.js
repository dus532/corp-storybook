import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  MyPanel,
  WelcomePanel,
  RecentPaymentPanel,
  TeamPaymentPanel,
  AsyncDiv,
} from 'components';

import { actionGetDashBoard } from 'stores';

const DashBoard = () => {
  const dashboardStore = useSelector(state => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetDashBoard());
  }, []);
  console.log(dashboardStore);

  return (
    <Container>
      <AsyncDiv store={dashboardStore}>
        <WelcomePanel className="box_overflow" store={dashboardStore} />
        <MyPanel className="box_overflow" store={dashboardStore} />
        <RecentPaymentPanel className="box_overflow" store={dashboardStore} />
        <TeamPaymentPanel className="box_overflow" store={dashboardStore} />
      </AsyncDiv>
    </Container>
  );
};

export default DashBoard;

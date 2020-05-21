import React, { useEffect, useState } from 'react';
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
import moment from 'utils/moment';

const DashBoard = () => {
  const dashboardStore = useSelector(state => state.dashboard);
  const dispatch = useDispatch();

  const [date, setDate] = useState({
    userGroupPaymentsStartDate: moment()
      .startOf('month')
      .format('X'),
    userGroupPaymentsEndDate: moment()
      .endOf('month')
      .format('X'),
  });

  useEffect(() => {
    dispatch(actionGetDashBoard(date));
  }, [date]);

  return (
    <Container>
      <AsyncDiv store={dashboardStore}>
        <WelcomePanel className="box_overflow" store={dashboardStore} />
        <MyPanel className="box_overflow" store={dashboardStore} />
        <RecentPaymentPanel className="box_overflow" store={dashboardStore} />
        <TeamPaymentPanel
          className="box_overflow"
          store={dashboardStore}
          date={date}
          setDate={setDate}
        />
      </AsyncDiv>
    </Container>
  );
};

export default DashBoard;

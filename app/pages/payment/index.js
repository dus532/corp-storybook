import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import moment from 'utils/moment';
import {
  Container,
  Filter,
  Table,
  AsyncDiv,
  Summary,
  Pagination,
  NoData,
} from 'components';
import { actionGetManagePayments } from 'stores';

import UserManager from 'utils/userManager';

const useQuery = () => new URLSearchParams(useLocation().search);

const Payment = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector(state => state.managePayments);

  const history = useHistory();
  const nowPage = useQuery().get('page');

  const [filter, setFilter] = useState({
    startDate: moment()
      .startOf('month')
      .valueOf(),
    endDate: moment().valueOf(),
    status: 0,
    cardId: null,
    item: 0,
    rentalId: 0,
    corpId: UserManager().getUser().corpId,
  });

  const handleChange = (data, name) => {
    setFilter({ ...filter, [name]: data });
  };

  const onSearch = () => {
    dispatch(
      actionGetManagePayments(filter, () => {
        history.push(`${document.location.pathname}?page=1`);
      }),
    );
  };

  useEffect(() => {
    dispatch(actionGetManagePayments(filter));
  }, []);

  return (
    <Container>
      <Filter filter={filter} handleChange={handleChange} onClick={onSearch} />
      <AsyncDiv store={paymentData}>
        <Summary data={paymentData.data} />
        <Table
          title={[
            ['결제 시각', 'date', 2],
            ['결제 카드', 'card_corp', 1.7],
            ['금액', 'amount', 1.4],
            ['항목', 'item', 1.4],
            ['구분', 'type', 1],
            ['상태', 'status', 1],
            ['연관 예약번호', 'rentalId', 1.6],
          ]}
          data={paymentData.data.payments}
          nodata={<NoData />}
        />
        <Pagination
          now={!nowPage ? 1 : nowPage}
          total={
            paymentData.data && Math.ceil(paymentData.data.payments.length / 10)
          }
        />
      </AsyncDiv>
    </Container>
  );
};

export default Payment;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import moment from 'utils/moment';
import {
  Container,
  Filter,
  Table,
  AsyncDiv,
  Summary,
  Pagination,
} from 'components';
import { actionGetManagePayments } from 'stores';

const useQuery = () => new URLSearchParams(useLocation().search);

const Payment = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector(state => state.managePayments);

  const history = useHistory();
  const nowPage = useQuery().get('page');

  const [filter, setFilter] = useState({
    startDate: moment()
      .startOf('month')
      .format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    status: 0,
    item: 0,
  });

  const handleChange = (data, name) => {
    setFilter({ ...filter, [name]: data });
  };

  const onSearch = () => {
    dispatch(
      actionGetManagePayments({ ...filter }, () => {
        history.push(`${document.location.pathname}?page=1`);
      }),
    );
  };

  useEffect(() => {
    dispatch(
      actionGetManagePayments({ page: !nowPage ? 1 : nowPage, ...filter }),
    );
  }, [nowPage]);

  return (
    <Container>
      <Filter filter={filter} handleChange={handleChange} onClick={onSearch} />
      <AsyncDiv store={paymentData}>
        <Summary data={paymentData.data} />
        <Table
          title={[
            ['결제 시각', 'date', 2],
            ['결제 취소 시각', '', 2],
            ['결제 카드', 'card_corp', 1.7],
            ['금액', 'amount', 1.4],
            ['항목', 'item', 1.4],
            ['상태', 'status', 1.4],
            ['연관 예약번호', 'rental_number', 1.2],
          ]}
          data={paymentData.data.payments}
        />
        <Pagination
          now={!nowPage ? 1 : nowPage}
          total={paymentData.data.total_page}
        />
      </AsyncDiv>
    </Container>
  );
};

export default Payment;

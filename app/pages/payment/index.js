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
import { actionGetManagePayments, actionGetCardList } from 'stores';

import UserManager from 'utils/userManager';

const useQuery = () => new URLSearchParams(useLocation().search);

const list = { cards: [] };

const Payment = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector(state => state.managePayments);

  const history = useHistory();
  const nowPage = useQuery().get('page');

  const [filter, setFilter] = useState({
    startDate: moment()
      .startOf('year')
      .format('X'),
    endDate: moment().format('X'),
    status: 0,
    cardId: null,
    item: 0,
    search: null,
    corpId: UserManager().getUser().corpId,
  });

  const handleChange = (data, name, reset) => {
    setFilter({ ...filter, [name]: data });

    if (reset) {
      dispatch(
        actionGetManagePayments({ ...filter, rentalId: null }, () => {
          history.push(`${document.location.pathname}?page=1`);
        }),
      );
    }
  };

  const handleDateChange = (sDate, eDate) => {
    setFilter({
      ...filter,
      startDate: sDate,
      endDate: eDate,
    });
  };

  const onSearch = () => {
    dispatch(
      actionGetManagePayments({ ...filter, rentalId: filter.search }, () => {
        history.push(`${document.location.pathname}?page=1`);
      }),
    );
  };

  useEffect(() => {
    dispatch(actionGetManagePayments({ ...filter, rentalId: filter.search }));
  }, [
    filter.startDate,
    filter.endDate,
    filter.status,
    filter.cardId,
    filter.item,
    filter.corpId,
  ]);

  useEffect(() => {
    dispatch(
      actionGetCardList(res => {
        list.cards = res.data.payload.cards;
      }),
    );
  }, []);

  return (
    <Container>
      <Filter
        type="payment"
        list={list}
        filter={filter}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        onClick={onSearch}
      />
      <AsyncDiv store={paymentData}>
        <Summary data={paymentData.data} filter={filter} />
        <Table
          now={!nowPage ? 1 : nowPage}
          title={[
            ['결제 시각', 'date', 1.7],
            ['결제 카드', 'cardNumber', 1.2],
            ['금액', 'amount', 1.4],
            ['항목', 'item', 1],
            ['구분', 'type', 0.7],
            ['상태', 'status', 1],
            ['연관 예약번호', 'rentalId', 1.6],
          ]}
          data={paymentData.data.payments}
          nodata={<NoData type="payment" />}
        />
        <Pagination
          now={nowPage > 0 ? nowPage : 1}
          total={
            paymentData.data && paymentData.data.payments.length > 0
              ? Math.ceil(paymentData.data.payments.length / 10)
              : 1
          }
        />
      </AsyncDiv>
    </Container>
  );
};

export default Payment;

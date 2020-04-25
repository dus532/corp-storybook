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
import { actionGetManageEmployees } from 'stores';

const useQuery = () => new URLSearchParams(useLocation().search);

const Payment = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector(state => state.manageEmployees);

  const history = useHistory();
  const nowPage = useQuery().get('page');

  const [filter, setFilter] = useState({
    startDate: moment()
      .startOf('month')
      .format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    license: 0,
  });

  const handleChange = (data, name) => {
    setFilter({ ...filter, [name]: data });
  };

  const onSearch = () => {
    history.push(`${document.location.pathname}?page=1`);
  };

  useEffect(() => {
    dispatch(
      actionGetManageEmployees({ page: !nowPage ? 1 : nowPage, ...filter }),
    );
  }, [nowPage]);

  return (
    <Container>
      <Filter
        type="employee"
        filter={filter}
        handleChange={handleChange}
        onClick={onSearch}
      />
      <AsyncDiv store={paymentData}>
        <Summary type="employee" data={paymentData.data} />
        <Table
          title={[
            ['사번', 'number', 1],
            ['부서명', 'userGroupName', 1.4],
            ['사원 이름', 'name', 1.4],
            ['전화번호', 'phoneNumber', 1.8],
            ['이메일', 'email', 2.2],
            ['가입 일시', 'joinDate', 1.4],
            ['면허증', 'lisence', 1.4],
            ['', 'editEmployee', 0.7],
          ]}
          data={paymentData.data.employees}
        />
        <Pagination
          now={!nowPage ? 1 : nowPage}
          total={paymentData.data.totalPage}
        />
      </AsyncDiv>
    </Container>
  );
};

export default Payment;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'utils/moment';
import { Container, Filter, Table, AsyncDiv } from 'components';
import { actionGetManagePayments } from 'stores';

const Payment = () => {
  const dispatch = useDispatch();
  const paymentData = useSelector(state => state.managePayments);

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
    dispatch(actionGetManagePayments({ ...filter }));
  };

  useEffect(() => {
    dispatch(actionGetManagePayments({ ...filter }));
  }, []);

  return (
    <Container>
      <Filter filter={filter} handleChange={handleChange} onClick={onSearch} />
      <AsyncDiv store={paymentData}>
        <Table
          title={['결제 시각', '결제 취소 시각']}
          data={paymentData.data.payments}
        />
      </AsyncDiv>
    </Container>
  );
};

export default Payment;

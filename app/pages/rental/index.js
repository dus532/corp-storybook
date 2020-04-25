import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import moment from 'utils/moment';
import { Container, Filter, AsyncDiv, Summary } from 'components';
import { actionGetManageRentals } from 'stores';

const useQuery = () => new URLSearchParams(useLocation().search);

const Rental = () => {
  const dispatch = useDispatch();
  const rentalData = useSelector(state => state.manageRentals);

  const history = useHistory();
  const nowPage = useQuery().get('page');

  const [filter, setFilter] = useState({
    startDate: moment()
      .startOf('month')
      .format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    status: 0,
  });

  const handleChange = (data, name) => {
    setFilter({ ...filter, [name]: data });
  };

  const onSearch = () => {
    dispatch(
      actionGetManageRentals({ ...filter }, () => {
        history.push(`${document.location.pathname}?page=1`);
      }),
    );
  };

  useEffect(() => {
    dispatch(
      actionGetManageRentals({ page: !nowPage ? 1 : nowPage, ...filter }),
    );
  }, [nowPage]);

  return (
    <Container>
      <Filter
        type="rental"
        filter={filter}
        handleChange={handleChange}
        onClick={onSearch}
      />
      <AsyncDiv store={rentalData}>
        <Summary type="rental" data={rentalData.data} />
      </AsyncDiv>
    </Container>
  );
};

export default Rental;

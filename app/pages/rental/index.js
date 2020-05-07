import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import moment from 'utils/moment';
import { Container, Filter, AsyncDiv, Summary } from 'components';
import { actionGetManageRentals } from 'stores';

import UserManager from 'utils/userManager';

const useQuery = () => new URLSearchParams(useLocation().search);

const Rental = () => {
  const dispatch = useDispatch();
  const rentalData = useSelector(state => state.manageRentals);

  const history = useHistory();
  const nowPage = useQuery().get('page');

  const [filter, setFilter] = useState({
    startDate: moment()
      .startOf('month')
      .valueOf(),
    endDate: moment().valueOf(),
    status: 0,
    purpose: 0,
    userGroupId: 0,
    employeeId: 0,
    number: 0,
    corpId: UserManager().getUser().corpId,
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
      // actionGetManageRentals({ page: !nowPage ? 1 : nowPage, ...filter }),
      actionGetManageRentals({}),
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

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import moment from 'utils/moment';
import { Container, Filter, AsyncDiv, Summary, RentalList } from 'components';
import { actionGetManageRentals } from 'stores';

import UserManager from 'utils/userManager';

const Rental = () => {
  const dispatch = useDispatch();
  const rentalData = useSelector(state => state.manageRentals);

  const history = useHistory();

  const [filter, setFilter] = useState({
    startDate: moment()
      .startOf('month')
      .format('X'),
    endDate: moment().format('X'),
    status: 0,
    purpose: 0,
    userGroupId: null,
    employeeId: null,
    number: null,
    corpId: UserManager().getUser().corpId,
  });

  const handleChange = (data, name) => {
    setFilter({ ...filter, [name]: data });
  };

  const onSearch = () => {
    dispatch(
      actionGetManageRentals(filter, () => {
        history.push(`${document.location.pathname}`);
      }),
    );
  };

  useEffect(() => {
    dispatch(actionGetManageRentals(filter));
  }, [filter]);

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
        <RentalList data={rentalData.data.rentals} />
      </AsyncDiv>
    </Container>
  );
};

export default Rental;

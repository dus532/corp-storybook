import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'utils/moment';
import {
  Container,
  AsyncDiv,
  RentalList,
  BigTitle,
  FilterList,
} from 'components';
import { actionGetManageRentals } from 'stores';

// import UserManager from 'utils/userManager';
import { useEmployeesList, useGroupList, useQueryObject } from 'utils/hooks';

const list = { userGroups: [], employees: [] };

const initialQuery = {
  startDate: moment()
    .startOf('month')
    .format('X'),
  endDate: moment().format('X'),
  status: 0,
  purpose: 0,
  userGroupId: '',
  employeeId: '',
  search: '',
};

const Rental = () => {
  const dispatch = useDispatch();
  const query = useQueryObject(initialQuery);
  const rentalData = useSelector(state => state.manageRentals);

  useEffect(() => {
    if (query && query.startDate) {
      dispatch(actionGetManageRentals(query));
    }
  }, [query]);

  list.employees = useEmployeesList();
  list.userGroups = useGroupList();

  return (
    <Container>
      <BigTitle>예약조회</BigTitle>
      <FilterList
        date
        search
        data={[
          {
            type: 'employees',
            key: 'employeeId',
            data: list.employees,
            initial: { value: '', body: '전체 부서' },
          },
          {
            type: 'userGroups',
            key: 'userGroupsId',
            data: list.userGroups,
            initial: { value: '', body: '전체 사원' },
          },
          { type: 'rentalStatus', key: 'status' },
          { type: 'rentalPuropose', key: 'purpose' },
        ]}
      />
      <AsyncDiv store={rentalData}>
        {/* <Summary type="rental" data={rentalData.data} /> */}
        <RentalList data={rentalData.data.rentals} />
      </AsyncDiv>
    </Container>
  );
};

export default Rental;

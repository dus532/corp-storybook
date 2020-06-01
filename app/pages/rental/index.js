import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import moment from 'utils/moment';
import { Container, Filter, AsyncDiv, Summary, RentalList } from 'components';
import {
  actionGetManageRentals,
  actionGetEmployeesList,
  actionGetUserGroupsList,
} from 'stores';

import UserManager from 'utils/userManager';

const list = { userGroups: [], employees: [] };

const Rental = () => {
  const dispatch = useDispatch();
  const rentalData = useSelector(state => state.manageRentals);

  const history = useHistory();

  const [filter, setFilter] = useState({
    startDate: moment()
      .startOf('year')
      .format('X'),
    endDate: moment().format('X'),
    status: 0,
    purpose: 0,
    userGroupId: null,
    employeeId: null,
    search: null,
    corpId: UserManager().getUser().corpId,
  });

  const handleChange = (data, name, reset) => {
    if (name === 'userGroupId') {
      // 사원그룹 수정시 사원도 초기화
      setFilter({
        ...filter,
        employeeId: null,
        [name || data.target.name]: data,
      });
    } else {
      setFilter({ ...filter, [name || data.target.name]: data });
    }

    if (reset) {
      dispatch(
        actionGetManageRentals({ ...filter, number: null }, () => {
          history.push(`${document.location.pathname}`);
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
      actionGetManageRentals({ ...filter, number: filter.search }, () => {
        history.push(`${document.location.pathname}`);
      }),
    );
  };

  useEffect(() => {
    dispatch(actionGetManageRentals({ ...filter, number: filter.search }));
  }, [
    filter.startDate,
    filter.endDate,
    filter.status,
    filter.purpose,
    filter.userGroupId,
    filter.employeeId,
    filter.corpId,
  ]);

  useEffect(() => {
    dispatch(
      actionGetEmployeesList(res => {
        list.employees = res.data.payload.employees;
      }),
    );
    dispatch(
      actionGetUserGroupsList(res => {
        list.userGroups = res.data.payload.userGroups;
      }),
    );
  }, []);

  return (
    <Container>
      <Filter
        type="rental"
        filter={filter}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        onClick={onSearch}
        list={list}
      />
      <AsyncDiv store={rentalData}>
        <Summary type="rental" data={rentalData.data} filter={filter} />
        <RentalList data={rentalData.data.rentals} />
      </AsyncDiv>
    </Container>
  );
};

export default Rental;

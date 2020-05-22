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
  NoData,
} from 'components';
import { actionGetManageEmployees, actionGetUserGroupsList } from 'stores';
import { useModal } from 'utils/hooks';
import { EDIT_EMPLOYEE } from 'modals/constants';

import UserManager from 'utils/userManager';

const useQuery = () => new URLSearchParams(useLocation().search);

const list = { userGroups: [] };

const Employees = () => {
  const dispatch = useDispatch();
  const employeeData = useSelector(state => state.manageEmployees);

  const modal = useModal();
  const history = useHistory();
  const nowPage = useQuery().get('page');

  const [filter, setFilter] = useState({
    startDate: moment()
      .startOf('month')
      .format('X'),
    endDate: moment().format('X'),
    license: 0,
    userGroupId: null,
    search: null,
    corpId: UserManager().getUser().corpId,
  });
  const [search, setSearch] = useState('');

  const employeeList = useSelector(state => {
    const listData = state.manageEmployees.data.employees;

    if (search) {
      if (listData.filter(l => l.name.indexOf(search) !== -1).length > 0) {
        return listData.filter(l => l.name.indexOf(search) !== -1);
      }
      if (
        listData.filter(l => l.number && l.number.indexOf(search) !== -1)
          .length > 0
      ) {
        return listData.filter(
          l => l.number && l.number.indexOf(search) !== -1,
        );
      }
      return [];
    }
    return listData;
  });

  const modalType = useSelector(state => state.modal.type);

  const handleChange = (data, name) => {
    setFilter({ ...filter, [name]: data });
  };

  const handleDateChange = (sDate, eDate) => {
    setFilter({
      ...filter,
      startDate: sDate,
      endDate: eDate,
    });
  };

  const onSearch = () => {
    // dispatch(
    //   actionGetManageEmployees(
    //     { ...filter, employeeNumber: filter.search },
    //     () => {
    //       history.push(`${document.location.pathname}?page=1`);
    //     },
    //   ),
    // );
    setSearch(filter.search);
  };

  useEffect(() => {
    history.push(`${document.location.pathname}?page=1`);
  }, [search]);

  useEffect(() => {
    if (!modalType) {
      dispatch(
        actionGetManageEmployees({ ...filter, employeeNumber: filter.search }),
      );
    }
  }, [
    filter.startDate,
    filter.endDate,
    filter.license,
    filter.userGroupId,
    filter.corpId,
    modalType,
  ]);

  useEffect(() => {
    dispatch(
      actionGetUserGroupsList(res => {
        list.userGroups = res.data.payload.userGroups;
      }),
    );
  }, []);

  return (
    <Container>
      <Filter
        list={list}
        type="employee"
        filter={filter}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        placeholder="사원 이름 또는 사원 번호 입력"
        onClick={onSearch}
      />
      <AsyncDiv store={employeeData}>
        <Summary type="employee" data={employeeData.data} />
        <Table
          now={!nowPage ? 1 : nowPage}
          title={[
            ['사번', 'number', 1],
            ['부서명', 'userGroupName', 1.4],
            ['사원 이름', 'name', 1.4],
            ['전화번호', 'phoneNumber', 1.8],
            ['이메일', 'email', 2.2],
            ['가입 일시', 'joinDate', 1.4],
            ['면허증', 'license', 1.2],
            [
              '',
              'editEmployee',
              0.3,
              e => {
                modal(EDIT_EMPLOYEE, e);
              },
            ],
          ]}
          data={employeeList}
          nodata={<NoData type="employee" />}
        />
        <Pagination
          now={!nowPage ? 1 : nowPage}
          total={
            employeeData.data && employeeList.length > 0
              ? Math.ceil(employeeList.length / 10)
              : 1
          }
        />
      </AsyncDiv>
    </Container>
  );
};

export default Employees;

import React from 'react';
import { useSelector } from 'react-redux';

// import moment from 'utils/moment';
import {
  Container,
  AsyncDiv,
  Summary,
  RentalList,
  BigTitle,
  FilterList,
} from 'components';
// import { actionGetManageRentals } from 'stores';

// import UserManager from 'utils/userManager';
import { useEmployeesList, useGroupList } from 'utils/hooks';

const list = { userGroups: [], employees: [] };

// const initialQuery = {
//   startDate: moment()
//     .startOf('year')
//     .format('X'),
//   endDate: moment().format('X'),
//   status: 0,
//   purpose: 0,
//   userGroupId: null,
//   employeeId: null,
//   search: null,
//   corpId: UserManager().getUser().corpId,
// };

const Rental = () => {
  // const dispatch = useDispatch();

  const rentalData = useSelector(state => state.manageRentals);

  // const [filter, setFilter] = useState({
  //   startDate: moment()
  //     .startOf('year')
  //     .format('X'),
  //   endDate: moment().format('X'),
  //   status: 0,
  //   purpose: 0,
  //   userGroupId: null,
  //   employeeId: null,
  //   search: null,
  //   corpId: UserManager().getUser().corpId,
  // });

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
            initial: { value: 0, body: '전체 부서' },
          },
          {
            type: 'userGroups',
            key: 'userGroupsId',
            data: list.userGroups,
            initial: { value: 0, body: '전체 사원' },
          },
          { type: 'rentalStatus', key: 'status' },
          { type: 'rentalPuropose', key: 'purpose' },
        ]}
      />
      <AsyncDiv store={rentalData}>
        <Summary type="rental" data={rentalData.data} />
        <RentalList data={rentalData.data.rentals} />
      </AsyncDiv>
    </Container>
  );
};

export default Rental;

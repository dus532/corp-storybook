// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('manageRentals');

export const actionGetManageRentals = (
  {
    number,
    status,
    corpId,
    startDate,
    purpose,
    endDate,
    employeeId,
    userGroupId,
  },
  onSuccess,
) =>
  read({
    params: {
      number,
      status,
      corpId,
      employeeId,
      userGroupId,
      purpose,
      endDate,
      startDate,
    },
    meta: { onSuccess },
  });

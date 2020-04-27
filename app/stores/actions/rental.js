// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('manageRentals');

export const actionGetManageRentals = (
  { number, status, startDate, endDate, employeeId, userGroupId },
  onSuccess,
) =>
  read({
    params: {
      number,
      status,
      employeeId,
      userGroupId,
      endDate,
      startDate,
    },
    meta: { onSuccess },
  });

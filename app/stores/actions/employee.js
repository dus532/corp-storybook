// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('manageEmployees');

export const actionGetManageEmployees = (
  { page, employeeNumber, license, startDate, endDate, userGroupId },
  onSuccess,
) =>
  read({
    params: {
      page,
      employeeNumber,
      license,
      userGroupId,
      endDate,
      startDate,
    },
    meta: { onSuccess },
  });

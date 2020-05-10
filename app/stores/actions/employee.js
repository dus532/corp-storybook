// 액션!
import createActions from 'stores/controller/createActions';
import UserManager from 'utils/userManager';

const { read, onlyRead, del } = createActions('manageEmployees');

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

export const actionGetEmployeesList = onSuccess =>
  onlyRead({
    url: `/corp/employees/${UserManager().getUser().corpId}`,
    meta: { onSuccess },
  });

export const actionDelEmployee = (eId, userGroupId, onSuccess) =>
  del({
    url: `/action/employees/${eId}`,
    params: { corpId: UserManager().getUser().corpId, userGroupId },
    meta: {
      onSuccess,
      read: `/corp/employees/${UserManager().getUser().corpId}`,
    },
  });

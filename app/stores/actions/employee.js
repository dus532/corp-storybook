// 액션!
import createActions from 'stores/controller/createActions';
import UserManager from 'utils/userManager';

const { read, onlyRead, update, del } = createActions('manageEmployees');

export const actionGetManageEmployees = (
  { page, employeeNumber, license, startDate, endDate, userGroupId, corpId },
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
      corpId,
    },
    meta: { onSuccess },
  });

export const actionGetEmployeesList = onSuccess =>
  onlyRead({
    url: `/corp/employees/${UserManager().getUser().corpId}`,
    meta: { onSuccess },
  });

export const actionDelEmployee = (employeeId, userGroupId, onSuccess) =>
  del({
    url: `/action/employees`,
    params: { corpId: UserManager().getUser().corpId, employeeId, userGroupId },
    meta: {
      onSuccess,
    },
  });

export const actionPutEmployee = (employeeId, params, onSuccess) =>
  update({
    url: `/action/employees/${employeeId}`,
    params: { ...params, corpId: UserManager().getUser().corpId },
    meta: {
      onSuccess,
    },
  });

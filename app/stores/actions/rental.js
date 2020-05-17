// 액션!
import createActions from 'stores/controller/createActions';
import UserManager from 'utils/userManager';

const { read, onlyRead } = createActions('manageRentals');

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

export const actionGetRentalStatement = (rentalId, onSuccess) =>
  onlyRead({
    url: '/corp/manageRentals/statement',
    params: { rentalId, corpId: UserManager().getUser().corpId },
    meta: { onSuccess },
  });

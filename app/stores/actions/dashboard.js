// 액션!
import createActions from 'stores/controller/createActions';
import UserManager from 'utils/userManager';

const { read, onlyCreate } = createActions('dashboard');

export const actionGetDashBoard = () =>
  read({
    params: {
      corpId: UserManager().getUser().corpId,
      userGroupPaymentsStartDate: 1578036043,
      userGroupPaymentsEndDate: 1588836088,
    },
  });

export const actionPostInitialUsage = (data, onSuccess) =>
  onlyCreate({
    url: '/action/usageLimit',
    params: data,
    meta: { onSuccess },
  });

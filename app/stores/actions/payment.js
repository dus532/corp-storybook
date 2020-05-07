// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('managePayments');

export const actionGetManagePayments = (
  { page, item, status, startDate, endDate, cardId, rentalId, corpId },
  onSuccess,
) =>
  read({
    params: {
      page,
      status,
      startDate,
      endDate,
      cardId,
      item,
      rentalId,
      corpId,
    },
    meta: { onSuccess },
  });

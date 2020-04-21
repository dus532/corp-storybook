// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('managePayments');

export const actionGetManagePayments = (
  { page, item, status, startDate, endDate, cardNumber, reservationNumber },
  onSuccess,
) =>
  read({
    params: {
      page,
      item,
      status,
      startDate,
      endDate,
      cardNumber,
      reservationNumber,
    },
    meta: { onSuccess },
  });

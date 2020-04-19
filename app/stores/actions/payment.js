// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('managePayments');

export const actionGetManagePayments = ({
  page,
  item,
  status,
  startDate,
  endDate,
  cardNumber,
  reservationNumber,
}) =>
  read({
    url: `/corp/managePayments`,
    params: {
      page,
      item,
      status,
      startDate,
      endDate,
      cardNumber,
      reservationNumber,
    },
  });

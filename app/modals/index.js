import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { offModal } from 'stores/modals';
import { FindEmail, Announcements, SubscriptionExpires } from 'modals/src';
import {
  SIGN_FIND_EMAIL,
  ANNOUNCEMENTS_DETAIL,
  SUBSCRIPTION_EXPIRES,
} from 'modals/constants';

const Modals = () => {
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  const propsAll = {
    data: modal.data,
    onClickExit: () => dispatch(offModal()),
  };

  switch (modal.type) {
    case SIGN_FIND_EMAIL:
      return <FindEmail {...propsAll} />;
    case ANNOUNCEMENTS_DETAIL:
      return <Announcements {...propsAll} />;
    case SUBSCRIPTION_EXPIRES:
      return <SubscriptionExpires {...propsAll} />;
    default:
      return <></>;
  }
};

export default Modals;

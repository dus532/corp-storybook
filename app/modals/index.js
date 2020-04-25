import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { offModal } from 'stores/modals';
import { FindEmail, Announcements } from 'modals/src';
import { SIGN_FIND_EMAIL, ANNOUNCEMENTS_DETAIL } from 'modals/constants';

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
    default:
      return <></>;
  }
};

export default Modals;

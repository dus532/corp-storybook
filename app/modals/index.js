import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { offModal } from 'stores/modals';
import {
  FindEmail,
  Announcements,
  SubscriptionExpires,
  EditCorpInfo,
  EditCard,
  EditEmployee,
  CheckPW,
  Error,
  PostCode,
  Statement,
} from 'modals/src';
import {
  SIGN_FIND_EMAIL,
  ANNOUNCEMENTS_DETAIL,
  SUBSCRIPTION_EXPIRES,
  EDIT_CORP_INFO,
  EDIT_CARD,
  EDIT_EMPLOYEE,
  CHECK_PW,
  ERROR,
  POST_CODE,
  PAYMENT_STATEMENT,
} from 'modals/constants';

const Modals = () => {
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    const keyClose = e => {
      if (e.key === 'Escape') {
        dispatch(offModal());
        document.removeEventListener('keyup', keyClose);
      }
    };

    if (modal.type) {
      document.addEventListener('keyup', keyClose);
    } else {
      document.removeEventListener('keyup', keyClose);
    }
  }, [modal.type]);

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
    case EDIT_CORP_INFO:
      return <EditCorpInfo {...propsAll} />;
    case EDIT_CARD:
      return <EditCard {...propsAll} />;
    case EDIT_EMPLOYEE:
      return <EditEmployee {...propsAll} />;
    case CHECK_PW:
      return <CheckPW {...propsAll} />;
    case ERROR:
      return <Error {...propsAll} />;
    case POST_CODE:
      return <PostCode {...propsAll} />;
    case PAYMENT_STATEMENT:
      return <Statement {...propsAll} />;
    default:
      return <></>;
  }
};

export default Modals;

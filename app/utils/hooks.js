import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  onToast,
  onModal,
  actionGetCorpInfo,
  actionGetAnnouncements,
  actionGetCards,
  actionGetSubscription,
} from 'stores';

export const useToast = () => {
  const dispatch = useDispatch();

  return (body, status) => dispatch(onToast(body, status));
};

export const useModal = () => {
  const dispatch = useDispatch();

  return (body, data) => dispatch(onModal(body, data));
};

export const useFetchData = (rName, filter) => {
  const dispatch = useDispatch();

  useEffect(() => {
    switch (rName) {
      case 'info':
        dispatch(actionGetCorpInfo());
        break;
      case 'announcements':
        dispatch(actionGetAnnouncements(filter));
        break;
      case 'card':
        dispatch(actionGetCards());
        break;
      case 'subscription':
        dispatch(actionGetSubscription());
        break;
      default:
        break;
    }
  }, [dispatch]);

  const store = useSelector(state => state[rName]);
  const storeData = useSelector(state => state[rName].data);

  return [store, storeData];
};

export const useQuery = () => new URLSearchParams(useLocation().search);

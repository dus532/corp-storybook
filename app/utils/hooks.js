import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import {
  onToast,
  onModal,
  actionGetCorpInfo,
  actionGetAnnouncements,
  actionGetCards,
  actionGetSubscription,
  actionGetCardList,
  actionGetEmployeesList,
  actionGetUserGroupsList,
} from 'stores';

export const useToast = () => {
  const dispatch = useDispatch();

  return (body, status) => dispatch(onToast(body, status));
};

export const useModal = () => {
  const dispatch = useDispatch();

  return (body, data) => dispatch(onModal(body, data));
};

export const useCardList = (load = true) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (load) {
      dispatch(actionGetCardList(res => setData(res.data.payload.cards)));
    }
  }, []);

  return data;
};

export const useEmployeesList = (load = true) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (load) {
      dispatch(
        actionGetEmployeesList(res => setData(res.data.payload.employees)),
      );
    }
  }, []);

  return data;
};

export const useGroupList = (load = true) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (load) {
      dispatch(
        actionGetUserGroupsList(res => setData(res.data.payload.userGroups)),
      );
    }
  }, []);

  return data;
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

const makeURL = query => {
  const URL = new URLSearchParams();

  if (query) {
    Object.keys(query).forEach(q => {
      URL.set(q, query[q]);
    });
    return URL.toString();
  }
  return '';
};

export const useQueryObject = initial => {
  const [query, setQuery] = useState({});
  const location = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const q = {};
    searchParams.forEach((v, k) => {
      q[k] = v;
    });

    if (Object.keys(q).length < 1) {
      history.push(`${location.pathname}?${makeURL(initial)}`);
    } else {
      setQuery(q);
    }
  }, [location.search]);

  return query;
};

import { useDispatch } from 'react-redux';

import { onToast, onModal } from 'stores';

export const useToast = () => {
  const dispatch = useDispatch();

  return (body, status) => dispatch(onToast(body, status));
};

export const useModal = () => {
  const dispatch = useDispatch();

  return body => dispatch(onModal(body));
};

import React from 'react';
import PropTypes from 'prop-types';

import { REQUEST_SUCCESS, REQUEST_FAILURE } from 'stores/controller/constants';

const AsyncDiv = ({ store, children }) => {
  if (store.status === REQUEST_SUCCESS) {
    return <>{children}</>;
  }
  if (store.status === REQUEST_FAILURE) {
    return <>로딩 실패</>;
  }
  return <>로딩</>;
};

AsyncDiv.propTypes = {
  store: PropTypes.object,
  children: PropTypes.element,
};

export default AsyncDiv;

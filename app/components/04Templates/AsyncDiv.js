import React from 'react';
import PropTypes from 'prop-types';

const AsyncDiv = ({ data, body }) => {
  if (data.status < 2) {
    return <>로딩</>;
  }
  if (data.status === 2) {
    return <>{body}</>;
  }
  return <>로딩 실패</>;
};

AsyncDiv.propTypes = {
  data: PropTypes.object,
  body: PropTypes.element,
};

export default AsyncDiv;

import React from 'react';
import PropTypes from 'prop-types';

const NewLine = ({ data }) =>
  data ? (
    <div>
      {data.split('\n').map(line => (
        <span key={line}>
          {line}
          <br />
        </span>
      ))}
    </div>
  ) : (
    <></>
  );

NewLine.propTypes = {
  data: PropTypes.string,
};

export default NewLine;

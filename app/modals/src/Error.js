import React from 'react';

import PropTypes from 'prop-types';

import { FloatingDiv, SubButton } from 'components';

const Error = ({ data, onClickExit }) => (
  <FloatingDiv
    fullScreen
    title={data.title}
    body={
      <>
        {data.body}
        <br />
      </>
    }
    footer={
      <>
        <SubButton white size="small" onClick={onClickExit}>
          <span>확인</span>
        </SubButton>
      </>
    }
    onClickExit={onClickExit}
  />
);

Error.propTypes = {
  onClickExit: PropTypes.func,
  data: PropTypes.object,
};

export default Error;

import React from 'react';
import PropTypes from 'prop-types';

import { FloatingDivBig } from 'components';
import moment from 'utils/moment';

const Announcements = ({ onClickExit, data }) => (
  <FloatingDivBig
    title={data.title}
    subtitle={moment(data.createdAt).format('YYYY년 MM월 DD일 hh:mm')}
    html={data.content}
    onClickExit={onClickExit}
  />
);

Announcements.propTypes = {
  onClickExit: PropTypes.func,
  data: PropTypes.object,
};

export default Announcements;

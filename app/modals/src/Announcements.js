import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { FloatingDivBig } from 'components';
import moment from 'utils/moment';
import { actionPutAnnouncements } from 'stores';

const Announcements = ({ onClickExit, data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data.isRead) {
      dispatch(actionPutAnnouncements(data.id));
    }
  }, []);

  return (
    <FloatingDivBig
      title={data.title}
      subtitle={moment(data.createdAt).format('YYYY년 MM월 DD일 HH:mm')}
      html={data.content}
      onClickExit={onClickExit}
    />
  );
};

Announcements.propTypes = {
  onClickExit: PropTypes.func,
  data: PropTypes.object,
};

export default Announcements;

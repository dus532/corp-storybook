// 액션!
import createActions from 'stores/controller/createActions';

const { read, update } = createActions('announcements');

export const actionGetAnnouncements = ({ page, keyword }, onSuccess) =>
  read({
    params: {
      page,
      keyword,
    },
    meta: { onSuccess },
  });

export const actionPutAnnouncements = (announcementId, onSuccess) =>
  update({
    params: { announcementId },
    meta: { onSuccess, read: '/corp/announcements' },
  });

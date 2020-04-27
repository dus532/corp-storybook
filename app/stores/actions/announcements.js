// 액션!
import createActions from 'stores/controller/createActions';

const { read } = createActions('announcements');

export const actionGetAnnouncements = ({ page, keyword }, onSuccess) =>
  read({
    params: {
      page,
      keyword,
    },
    meta: { onSuccess },
  });

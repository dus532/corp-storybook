import { defineMessages } from 'react-intl';

export const scope = 'carplat-admin.containers.Nav';

export default defineMessages({
  home: {
    menuTitle: {
      id: `${scope}.home.menuTitle`,
      defaultMessage: '메인',
    },
    pageTitle: {
      id: `${scope}.home.pageTitle`,
      defaultMessage: '메인 타이틀',
    },
  },
  userManagement: {
    menuTitle: {
      id: `${scope}.userManagement.menuTitle`,
      defaultMessage: '유저 관리',
    },
    management: {
      menuTitle: {
        id: `${scope}.userManagement.management.menuTitle`,
        defaultMessage: '유저 관리',
      },
      pageTitle: {
        id: `${scope}.userManagement.management.pageTitle`,
        defaultMessage: '유저 페이지입니다...!',
      },
    },
  },
});

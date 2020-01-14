import React from 'react';
import { FormattedMessage } from 'react-intl';

import generateMenuKey from 'utils/generateMenuKey';
import { ADMINISTRATOR_TYPES } from 'utils/constants';

import messages from './messages';

export const routes = {
  [ADMINISTRATOR_TYPES.CARPLAT_MASTER]: [
    {
      path: '/carplat',
      menuTitle: <FormattedMessage {...messages.home.menuTitle} />,
      pageTitle: <FormattedMessage {...messages.home.pageTitle} />,
    },
    {
      path: 'carplat/userManagement',
      menuTitle: <FormattedMessage {...messages.userManagement.menuTitle} />,
      children: [
        {
          path: '/carplat/userManagement/management',
          menuTitle: (
            <FormattedMessage
              {...messages.userManagement.management.menuTitle}
            />
          ),
          pageTitle: (
            <FormattedMessage
              {...messages.userManagement.management.pageTitle}
            />
          ),
        },
      ],
    },
  ],
};

function translateRoutesToEndPointArray(
  acc,
  { path, menuTitle, pageTitle, children },
) {
  const key = generateMenuKey(path, menuTitle);
  const { parentKeys, parentBreadcrumb } = acc;
  const breadcrumb = [...parentBreadcrumb, menuTitle];
  const selectedKeys = [...parentKeys, key];

  if (children) {
    return {
      ...acc,
      ...children.reduce(translateRoutesToEndPointArray, {
        parentBreadcrumb: breadcrumb,
        parentKeys: selectedKeys,
      }),
    };
  }

  acc[path] = {
    breadcrumb,
    selectedKeys,
    pageTitle,
  };

  return acc;
}

export const endPointInformations = Object.keys(routes).reduce(
  (acc, key) => ({
    ...acc,
    ...routes[key].reduce(translateRoutesToEndPointArray, {
      parentKeys: [],
      parentBreadcrumb: [],
    }),
  }),
  {},
);

export const defaultInformation = {
  breadcrumb: ['매칭 안 됨.'],
  selectedKeys: [],
  pageTitle: '매칭 안 됨',
};

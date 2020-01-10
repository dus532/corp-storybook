import generateMenuKey from 'utils/generateMenuKey';

export const routes = [
  {
    path: '/',
    menuTitle: '메인',
    pageTitle: '메인 타이틀',
  },
  {
    path: '/first',
    menuTitle: '첫 번째',
    children: [
      {
        path: '/first/general',
        menuTitle: '기본',
        pageTitle: '기본 타이틀',
      },
      {
        path: '/first/layout',
        menuTitle: '레이아웃',
      },
      {
        path: '/first/navigation',
        menuTitle: '네비게이션',
      },
      {
        path: '/first/test',
        menuTitle: '테스트',
        children: [
          {
            path: '/first/test/test2',
            menuTitle: '테스트 아이템',
          },
        ],
      },
    ],
  },
  {
    path: '/second',
    menuTitle: '두 번째',
    pageTitle: '두 번째 타이틀',
  },
];

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

export const endPointInformations = routes.reduce(
  translateRoutesToEndPointArray,
  {
    parentKeys: [],
    parentBreadcrumb: [],
  },
);

export const defaultInformation = {
  breadcrumb: ['매칭 안 됨.'],
  selectedKeys: [],
  pageTitle: '매칭 안 됨',
};

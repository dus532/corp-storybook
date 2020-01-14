import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';

import generateMenuKey from 'utils/generateMenuKey';
import { ADMINISTRATOR_TYPES } from 'utils/constants';

import { routes, endPointInformations, defaultInformation } from './constants';

const { SubMenu, Item } = Menu;

function NavMenu({ path, menuTitle, children }) {
  const key = generateMenuKey(path, menuTitle);

  if (children) {
    return (
      <SubMenu key={key} title={menuTitle}>
        {children.map(NavMenu)}
      </SubMenu>
    );
  }

  return (
    <Item key={key}>
      <Link to={path}>{menuTitle}</Link>
    </Item>
  );
}

NavMenu.propTypes = {
  path: PropTypes.string.isRequired,
  menuTitle: PropTypes.string.isRequired,
  children: PropTypes.array,
};

function Nav({ adminType, location: { pathname } }) {
  const routesOfAdminType = routes[adminType];
  const information = endPointInformations[pathname] || defaultInformation;
  const { selectedKeys } = information;

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={selectedKeys}
      selectedKeys={selectedKeys}
    >
      {routesOfAdminType.map(NavMenu)}
    </Menu>
  );
}

Nav.propTypes = {
  adminType: PropTypes.oneOf(Object.values(ADMINISTRATOR_TYPES)).isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Nav);

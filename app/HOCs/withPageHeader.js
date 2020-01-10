import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'antd';

import {
  endPointInformations,
  defaultInformation,
} from 'containers/Nav/constants';
import getDisplayName from 'utils/getDisplayName';

function itemRender(route) {
  return <span>{route}</span>;
}

export default function withPageHeader(WrappedComponent) {
  class EnhancedComponent extends React.PureComponent {
    render() {
      const {
        location: { pathname },
      } = this.props;
      const information = endPointInformations[pathname] || defaultInformation;
      const { pageTitle, breadcrumb } = information;

      return (
        <Fragment>
          <PageHeader
            title={pageTitle}
            breadcrumb={{
              routes: breadcrumb,
              itemRender,
            }}
            style={{ background: '#fff' }}
          />
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  }

  EnhancedComponent.displayName = `WithPageHeader(${getDisplayName(
    WrappedComponent,
  )})`;

  EnhancedComponent.propTypes = {
    location: PropTypes.string.isRequired,
  };

  return EnhancedComponent;
}

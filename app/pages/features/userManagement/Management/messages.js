import { defineMessages } from 'react-intl';

export const scope = 'carplat-admin.pages.features.userManagement.Management';

export default defineMessages({
  loadingText: {
    id: `${scope}.loadingText`,
    defaultMessage: 'Loading...',
  },
  errorText: {
    id: `${scope}.errorText`,
    defaultMessage: '에러났음. message: {errorMessage}',
  },
  totalCount: {
    id: `${scope}.totalCount`,
    defaultMessage: '{userLength} 개의 유저 (총 {totalCount}개)',
  },
});

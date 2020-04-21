/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as reduxFormReducer } from 'redux-form';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import globalReducer from 'stores/global/reducer';
import { ModalReducer } from 'stores/modals';
import { ToastReducer } from 'stores/toast';
import createReducers from 'stores/controller/createReducer';

const apiReducer = createReducers(
  'user',
  'initial',
  'dashboard',
  'managePayments',
  'manageEmployees',
);

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    ...apiReducer,
    modal: ModalReducer,
    toast: ToastReducer,
    global: globalReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    form: reduxFormReducer,
    ...injectedReducers,
  });

  return rootReducer;
}

/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as reduxFormReducer } from 'redux-form';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import globalReducer from 'store/global/reducer';
import signReducer from 'store/sign/reducer';
import modalReducer from 'store/modals/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    sign: signReducer,
    modals: modalReducer,
    global: globalReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    form: reduxFormReducer,
    ...injectedReducers,
  });

  return rootReducer;
}

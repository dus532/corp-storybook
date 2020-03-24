/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as reduxFormReducer } from 'redux-form';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import counterReducer from 'store/reducer/global';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    counter: counterReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    form: reduxFormReducer,
    ...injectedReducers,
  });

  return rootReducer;
}

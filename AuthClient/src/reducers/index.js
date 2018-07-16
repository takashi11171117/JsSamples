import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authenticationReducer from './authentication';

const rootReducer = combineReducers({
  auth: authenticationReducer,
  form
});

export default rootReducer;

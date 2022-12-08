import { combineReducers } from 'redux';
import employees from './employees';
import jobTitle from './jobTitle';
import schedule from './schedule';
import auth from './auth';

// Combine all reducers
const appReducer = combineReducers({ employees, auth, jobTitle, schedule })
const rootReducer = (state, action) => {

  // Clear all data in redux store to initial
  if(action.type === 'DESTROY_SESSION')
    state = undefined

  return appReducer(state, action)
}

export default rootReducer
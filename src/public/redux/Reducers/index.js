import {combineReducers} from 'redux';

import AuthReducer from './auth';
import JobReducers from './job';

const reducers = combineReducers({
  auth: AuthReducer,
  job: JobReducers,
});

export default reducers;

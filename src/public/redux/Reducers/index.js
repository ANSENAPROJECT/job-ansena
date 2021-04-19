import {combineReducers} from 'redux';

import AuthReducer from './auth';
import JobReducers from './job';
import DetailReducer from './detailjob';

const reducers = combineReducers({
  auth: AuthReducer,
  job: JobReducers,
  detailjob: DetailReducer,
});

export default reducers;

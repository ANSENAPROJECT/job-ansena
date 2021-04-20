import {combineReducers} from 'redux';

import AuthReducer from './auth';
import JobReducers from './job';
import DetailReducer from './detailjob';
import ProgressReportReducer from './progressReport';

const reducers = combineReducers({
  auth: AuthReducer,
  job: JobReducers,
  detailjob: DetailReducer,
  progressreport: ProgressReportReducer,
});

export default reducers;

import {combineReducers} from 'redux';

import AuthReducer from './auth';
import JobReducers from './job';
import DetailReducer from './detailjob';
import ProgressReportReducer from './progressReport';
import {ViewJobReducer} from './viewJob';

const reducers = combineReducers({
  auth: AuthReducer,
  job: JobReducers,
  detailjob: DetailReducer,
  progressreport: ProgressReportReducer,
  viewjob: ViewJobReducer,
});

export default reducers;

import {all} from 'redux-saga/effects';
import watchTasks from './tasks/saga';
import watchLogs from './logs/saga';

export default function* rootSaga() {
  yield all([watchTasks(), watchLogs()]);
}

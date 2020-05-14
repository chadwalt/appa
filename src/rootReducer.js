import {combineReducers} from 'redux';
import tasks from './tasks/model/reducer';
import projects from './projects/model/reducer';
import onboard from './onboarding/model/reducer';
import {applicationId, token, eventCount} from './reducers';
import logs from './logs/model/reducer';

const rootReducer = combineReducers({
  tasks,
  onboard,
  projects,
  applicationId,
  token,
  eventCount,
  logs,
});

export default rootReducer;

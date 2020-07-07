import {put, call, takeLatest, select} from 'redux-saga/effects';
import axios from 'axios';
import {AUTHORIZE_URL} from 'react-native-dotenv';
import moment from 'moment';
import {
  ADD_TASK,
  UPDATE_TASK,
  REMOVE_TASK,
  START_TASK,
} from '../tasks/model/commandTypes';

export function* task(action) {
  try {
    const token = yield select((state) => state.weos.token);

    if (!token) {
      throw new Error('Missing auth token, not connect to WeOs');
    }

    action.meta = {
      ...action.meta.event,
      created: moment().format(),
    };

    const response = yield call(() =>
      axios.post(`${AUTHORIZE_URL}/events/add`, action, {
        headers: {
          Authorization: `${token.token_type} ${token.access_token}`,
        },
      }),
    );
    return response.data;
  } catch (error) {
    // TODO queue event incase of failure
    console.log('An error occurred', error);
  }
}

export default function* watchTasks() {
  yield takeLatest([ADD_TASK, UPDATE_TASK, REMOVE_TASK, START_TASK], task);
}

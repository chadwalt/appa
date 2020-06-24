import {put, call, takeLatest} from 'redux-saga/effects';
// import * as api from './api'; // TODO import api functionality
import {
  ADD_TASK,
  UPDATE_TASK,
  REMOVE_TASK,
  START_TASK,
} from '../tasks/model/commandTypes';

export function* task(action) {
  try {
    // TODO add api call to save event
  } catch (error) {
    // TODO queue event incase of failure
    console.log('An error occurred please try again');
  }
}

export default function* watchTasks() {
  yield takeLatest([ADD_TASK, UPDATE_TASK, REMOVE_TASK, START_TASK], task);
}

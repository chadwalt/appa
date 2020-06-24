import {put, call, takeLatest} from 'redux-saga/effects';
// import * as api from './api'; // TODO import api functionality
import {ADD_LOG, UPDATE_LOG, REMOVE_LOG} from '../logs/model/commandTypes';

export function* log(action) {
  try {
    // TODO add api call to save event
  } catch (error) {
    // TODO queue event incase of failure
    console.log('An error occurred please try again');
  }
}

export default function* watchTasks() {
  yield takeLatest([ADD_LOG, UPDATE_LOG, REMOVE_LOG], log);
}

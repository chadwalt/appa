import {v4 as uuidv4} from 'uuid';
import {
  ADD_TASK,
  UPDATE_TASK,
  REMOVE_TASK,
  START_TASK,
} from '../../tasks/model/commandTypes';
import {ADD_LOG, UPDATE_LOG, REMOVE_LOG} from '../../logs/model/commandTypes';

const eventMiddleware = (store) => (next) => (action) => {
  action.meta = action.meta || {};

  if ([ADD_TASK, ADD_LOG].includes(action.type)) {
    action.meta = {
      ...action.meta,
      event: {
        eventId: uuidv4(),
        sequenceNo: 0,
      },
    };
  } else if ([UPDATE_TASK, REMOVE_TASK, START_TASK].includes(action.type)) {
    let task = store.getState().tasks.getById[action.meta.id];
    action.meta = {
      ...action.meta,
      event: {
        eventId: task?.meta?.eventId || uuidv4(),
        sequenceNo: task?.meta?.sequenceNo + 1 || 0,
      },
    };
  } else if ([UPDATE_LOG, REMOVE_LOG].includes(action.type)) {
    let log = store.getState().logs.getById.get(action.meta.id);
    action.meta = {
      ...action.meta,
      event: {
        eventId: log?.meta?.eventId || uuidv4(),
        sequenceNo: log?.meta?.sequenceNo + 1 || 0,
      },
    };
  }

  return next(action);
};

export default eventMiddleware;

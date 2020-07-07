import moment from 'moment';
import eventMiddleware from '../event-middleware';
import {addTask, updateTask} from '../../../tasks/model/commands';
import {updateTimeLog} from '../../../logs/model/commands';
import {mockTasks} from '../../../tasks/__tests__/fixtures';
import {mockLogs} from '../../../logs/__tests__/fixtures';

describe('Event Middleware', () => {
  let next = jest.fn((action) => action);
  let store = {
    getState: jest.fn(() => ({
      tasks: mockTasks,
      logs: mockLogs,
    })),
  };

  it('Should attach event details to action meta', () => {
    let action = eventMiddleware(store)(next)(addTask({title: 'Test'}));
    expect(next).toHaveBeenCalled();
    expect(action.meta).toHaveProperty('event');
    expect(action.meta.event).toHaveProperty('id');
    expect(action.meta.event).toHaveProperty('sequenceNo', 0);
  });

  it('Should update sequenceNo for a task', () => {
    const task = {
      title: 'Today Task',
      description:
        "This is an example of a task that will be on the current day's agenda",
      complete: false,
      dueDate: '2030-12-11',
      project: '32ebd0dd-8c83-4acf-a8d3-3f88c686c742',
      billable: false,
    };

    let action = eventMiddleware(store)(next)(
      updateTask('36212c03-040b-4139-867f-bd76485f4084', task),
    );

    expect(next).toHaveBeenCalled();
    expect(action.meta).toHaveProperty('event');
    expect(action.meta.event).toHaveProperty('id');
    expect(action.meta.event).toHaveProperty('sequenceNo', 1);
  });

  it('Should update sequenceNo for a log', () => {
    let action = eventMiddleware(store)(next)(
      updateTimeLog(
        'f4cb9236-2df7-4abd-8c06-cb836865a1c3',
        '36212c03-040b-4139-867f-bd76485f4084',
        moment().format(),
      ),
    );

    console.log(action);
    expect(next).toHaveBeenCalled();
    expect(action.meta).toHaveProperty('event');
    expect(action.meta.event).toHaveProperty('id');
    expect(action.meta.event).toHaveProperty('sequenceNo', 1);
  });
});

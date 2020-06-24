import eventMiddleware from '../event-middleware';
import {addTask} from '../../../tasks/model/commands';

describe('Event Middleware', () => {
  let next = jest.fn();
  let store = jest.fn();

  it('Should attach event object to action meta', () => {
    eventMiddleware(store)(next)(addTask({title: 'Test'}));
    expect(next).toHaveBeenCalled();
  });

  it('Should update sequenceNo for exisiting task', () => {});

  it('Should update sequenceNO for existing log', () => {});
});

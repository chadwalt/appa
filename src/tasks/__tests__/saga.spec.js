import {runSaga} from 'redux-saga';
import axios from 'axios';
import {task} from '../saga';

jest.mock('axios');

describe('Application Sagas', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const action = {
    type: 'ADD_TASK',
    payload: {
      title: 'Complete Redux tutoral',
      description: 'Finish effects, state, reducers',
    },
    meta: {
      id: '56268018-3057-4a75-80f2-281df7221c9a',
      seqeuenceNo: 0,
    },
  };

  it('Should save event to weos', async () => {
    const dispatchedActions = [];
    axios.post = jest.fn().mockResolvedValue({
      data: {
        message: 'Ok',
        sequenceNo: 0,
      },
    });
    const fakeStore = {
      getState: () => ({
        weos: {
          token: 'token',
        },
      }),
      dispatch: (dispatchedAction) => dispatchedActions.push(dispatchedAction),
    };

    const result = await runSaga(fakeStore, task, action).toPromise();
    expect(axios.post).toHaveBeenCalled();
    expect(result).toEqual({
      message: 'Ok',
      sequenceNo: 0,
    });
  });
});

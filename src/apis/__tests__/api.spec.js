import * as api from '../eventApi';
import events from '../../events/__tests__/events';
import {eventsApi} from '../calls';

describe('API', () => {
  it('Should fetch events', async () => {
    eventsApi.get = jest.fn().mockResolvedValue({data: events});
    let fetchedEvents = await api.fetchEvents();
    expect(fetchedEvents).toEqual(events);
  });

  it('Should throw errors on request failure', async () => {
    eventsApi.get = jest.fn().mockRejectedValue(new Error('Fetch Failed'));
    await expect(api.fetchEvents()).rejects.toThrow('Fetch Failed');
  });
});

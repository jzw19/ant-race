import { axios, api } from './api';
import { AVAILABLE_COLORS } from './constants';

describe('api', () => {
  // beforeEach(() => {
  //   jest.spyOn(axios, 'get');
  // });
  
  describe('fetchAnts', () => {
    // Skipping this test now because the endpoint response is now being mocked with a Promise.
    // Leaving it here in case I set up an API to call later
    it.skip('should make a GET request to the ants endpoint', () => {
      api.fetchAnts();
      expect(axios.get).toHaveBeenCalledWith('/ants');
    });

    it('should generate a random number of ants with the expected object properties', async () => {
      const randomAnts = await api.fetchAnts();
      const randomAntsData = randomAnts.data.ants;
      expect(randomAntsData.length).toBeTruthy();
      expect(randomAntsData[0].name).toEqual('ANT-0');
      expect(AVAILABLE_COLORS).toContain(randomAntsData[0].color);
      expect(randomAntsData[0].length > 0).toBe(true);
      expect(randomAntsData[0].weight > 0).toBe(true);
    });
  });
});
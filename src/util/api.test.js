import { axios, api } from './api';

describe('api', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get');
  });
  
  describe('fetchAnts', () => {
    it.skip('should make a GET request to the ants endpoint', () => {
      api.fetchAnts();
      expect(axios.get).toHaveBeenCalledWith('/ants');
    });
  });
});
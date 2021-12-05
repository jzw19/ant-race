import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'https://sg-ants-server.herokuapp.com'
});

export const api = {
  fetchAnts: () => axios.get('/ants')
};

export default api;
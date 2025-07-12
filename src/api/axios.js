import axios from 'axios';
import conf from '../conf/conf.js';

const api = axios.create({
  baseURL: conf.baseUrl,
  withCredentials: true
});

api.interceptors.response.use(
  (response) => (response.data),
  (error) => (Promise.reject(error.response.data))
)

export default api;
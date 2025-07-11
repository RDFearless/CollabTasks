import axios from 'axios';
import conf from '../conf/conf.js';

const api = axios.create({
  baseURL: conf.baseUrl,
  withCredentials: true
});

export default api;
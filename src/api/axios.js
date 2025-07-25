import axios from 'axios';
import conf from '../conf/conf.js';

const api = axios.create({
  baseURL: conf.baseUrl,
  withCredentials: true
});

api.interceptors.response.use(
  (response) => (response.data),
  (error) => {
    if(error.message === "Unauthorized" && error.status === 401) {
      api.post("/users/refresh-token")
      .then((response) => response.data)
      .catch((error) => Promise.reject(error));
    }
  }
)

export default api;
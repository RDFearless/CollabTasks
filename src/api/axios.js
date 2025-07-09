import axios from 'axios';
import conf from '../conf/conf.js';

const api = axios.create({
  baseURL: conf.VITE_APP_BASEURL,
  withCredentials: true, // Enable cookies(tokens)
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      // Network or CORS error
      return Promise.reject({ message: "Network error. Please check your internet connection." });
    }

    const { status, data } = error.response;

    return Promise.reject({
      message: data?.message || "Something went wrong",
      status,
      errors: data?.errors || [],
    });
  }
);

export default api;
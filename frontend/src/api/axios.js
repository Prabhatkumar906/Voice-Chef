import axios from 'axios';

// Create a new Axios instance with a base URL
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// We can also add the auth token interceptor here for cleanliness
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
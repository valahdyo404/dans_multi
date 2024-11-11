import axios from 'axios';
import store from '../config/store';
import { selectAuthToken } from '../config/slices/authSlice';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
});
const getToken = () => {
  // First try to get token from localStorage
  const localToken = localStorage.getItem('token');
  if (localToken) {
    return localToken;
  }
  
  // Fallback to Redux store if no token in localStorage
  return selectAuthToken(store.getState());
};
// Set Authorization header if token exists in Redux store
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => api.post('/auth/login', credentials);
export const fetchJobs = (params) => api.get('/jobs', { params });
export const fetchJobDetail = (id) => api.get(`/jobs/${id}`);

export default api;

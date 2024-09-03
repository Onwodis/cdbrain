// axiosInstance.js
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { useUser } from './usercontext';


function setItemWithExpiry(key, value, ttl) {
  const now = new Date();

  // `ttl` is time to live in milliseconds (5 minutes = 5 * 60 * 1000)
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
}
// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://example.com/api', // Replace with your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // const { user, setUser } = useUser();
    const navigate = useNavigate();
        // Retrieve data from local storage
    const userid = localStorage.getItem('userid');

    // If the id exists, include it in the Authorization header
    if (userid) {
      config.headers['Authorization'] = `Bearer ${userid}`;
      setItemWithExpiry('userid', '123456789', 5 * 60 * 1000);

    }
    return config;

    

  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

export default axiosInstance;

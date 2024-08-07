import axios from 'axios';

// Add authorization token to headers

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // Your backend base URL
  headers: {
    'Content-Type': `application/json`,
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage or other storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

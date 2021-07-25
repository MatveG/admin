import axios from 'axios';
import router from '@/router';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('_utoken') || sessionStorage.getItem('_utoken');

    if (userToken) {
      config.headers['Authorization'] = userToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use((response) => response, (error) => {
  if (error.response && error.response.status === 401 && router.currentRoute.name !== 'login') {
    return router.push({ name: 'login' });
  }
  console.error('Axios request error', error);

  return Promise.reject(error);
});

export default axios;

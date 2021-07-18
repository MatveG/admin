import axios from 'axios'
import router from '@/router'

axios.defaults.baseURL = 'http://velohub.lndo.site/api/admin';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('_utoken') || sessionStorage.getItem('_utoken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use((response) => response, (error) => {
  if (error.response && error.response.status === 401 && router.currentRoute.name !== 'login') {
    return router.push({ name: 'login' });
  }
  console.error('Axios request error', error);

  return Promise.reject(error);
});

export default axios;

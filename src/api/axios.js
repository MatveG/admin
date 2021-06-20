import axios from 'axios'
import router from '@/router'

axios.defaults.baseURL = 'http://velohub.lndo.site';
axios.defaults.withCredentials = true;

if (localStorage.getItem('_utoken')) {
  axios.defaults.headers.common = { 'Authorization': localStorage.getItem('_utoken') };
}

axios.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401 && router.currentRoute.name !== 'login') {
    return router.push({ name: 'login' });
  }
  return error;
});

export default axios;

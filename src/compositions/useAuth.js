import { ref } from '@vue/composition-api';
import axios from '@/loaders/axios';
import api from '@/api';

export default () => {
  const isLoading = ref(false);

  async function authLogin (formData) {
    try {
      isLoading.value = true;
      await axios(api.authCsrf());
      const response = await axios(api.authLogin(formData));
      isLoading.value = false;

      if (response.status === 200) {
        const storage = formData.remember ? localStorage : sessionStorage;
        const token = `${response.data.type} ${response.data.token}`;
        const rights = response.data.rights;

        storage.setItem('_utoken', token);
        storage.setItem('_urights', rights);
        storage.setItem('_utime', +new Date());
      }
      return response.status === 200;
    } catch (error) {
      throw error;
    }
  }

  async function authLogout () {
    localStorage.removeItem('_utoken');
    sessionStorage.removeItem('_utoken');
    localStorage.removeItem('_urights');
    sessionStorage.removeItem('_urights');
  }

  async function authRemind (formData) {
    try {
      isLoading.value = true;
      const response = await axios(api.authRemind(formData));
      isLoading.value = false;

      return response.status === 200;
    } catch (error) {
      throw error;
    }
  }

  async function authSignup (formData) {
    try {
      isLoading.value = true;
      const response = await axios(api.authSignup(formData));
      isLoading.value = false;

      return response.status === 200;
    } catch (error) {
      throw error;
    }
  }

  return {
    isLoading,
    authLogin,
    authLogout,
    authRemind,
    authSignup
  };
};

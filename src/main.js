import axios from 'axios'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Buefy from 'buefy'
import '@/scss/main.scss'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'
import store from './store'
import AsideMenuList from '@/components/AsideMenuList'

Vue.use(Buefy);
Vue.use(Vuelidate);
Vue.component('AsideMenuList', AsideMenuList);

router.afterEach(() => {
  store.commit('overlayToggle', false)
  store.commit('asideMobileStateToggle', false)
  store.commit('asideActiveForcedKeyToggle', null)
})

axios.defaults.baseURL = 'http://velohub.lndo.site/api/admin';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

// axios.get('/settings')
//   .then(({ data }) => {
//     const settings = data.reduce((acc, el) => {
//       acc[el.key] = el.value;
//       return acc;
//     }, {});
//
//     Vue.prototype.$settings = (key, prop) => {
//       const value = prop && settings[key] ? settings[key][prop] : settings[key];
//       return value || null;
//     }

new Vue({
  router,
  store,
  mounted () {
    document.documentElement.classList.remove('has-spinner-active')
  },
  render: (h) => h(App)
}).$mount('#app');
//
// })
// .catch((error) => {
//   console.error('Failed to load app config', error);
// });

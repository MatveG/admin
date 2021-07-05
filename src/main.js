import '@/scss/main.scss'
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import Vuelidate from 'vuelidate'
import Buefy from 'buefy'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/api/axios'
import AsideMenuList from '@/components/AsideMenuList'

Vue.use(VueCompositionAPI)
Vue.use(Buefy);
Vue.use(Vuelidate);
Vue.component('AsideMenuList', AsideMenuList);

router.afterEach(() => {
  store.commit('overlayToggle', false)
  store.commit('asideMobileStateToggle', false)
  store.commit('asideActiveForcedKeyToggle', null)
})

axios.get('/settings')
  .then(({ data }) => {
    const settings = data.reduce((acc, el) => {
      if (!acc[el.group]) {
        acc[el.group] = {};
      }
      acc[el.group][el.key] = el.value;

      return acc;
    }, {});

    Vue.prototype.$settings = (group, key) => {
      return key ? settings[group][key] ?? null : settings[group] ?? null;
    }

    new Vue({
      router,
      store,
      mounted () {
        document.documentElement.classList.remove('has-spinner-active')
      },
      render: (h) => h(App)
    }).$mount('#app');
  })
  .catch((error) => {
    console.error('Failed to load app config', error);
  });

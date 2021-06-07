import '@/scss/main.scss'
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Buefy from 'buefy'
import router from './router'
import store from './store'
import App from './App.vue'
import AsideMenuList from '@/components/AsideMenuList'

/* These components are used in recursion algorithm */
Vue.component('AsideMenuList', AsideMenuList);
Vue.use(Buefy);
Vue.use(Vuelidate);

/* Collapse mobile aside menu on route change */
router.afterEach(() => {
  store.commit('asideMobileStateToggle', false)
  store.commit('overlayToggle', false)
  store.commit('asideActiveForcedKeyToggle', null)
})

new Vue({
  router,
  store,
  render: (h) => h(App),
  // beforeMount () {
  //   this.$store.dispatch('setSettings', this.$el.getAttribute('settings'));
  // },
  mounted () {
    document.documentElement.classList.remove('has-spinner-active')
  }
}).$mount('#app')

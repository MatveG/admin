import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const fullPageHasAside = 'has-aside-left';
const fullPageHasFixed = 'has-navbar-fixed-top';
const asideExpandedClass = 'has-aside-expanded';
const asideMobileExpanded = 'has-aside-mobile-expanded';
const asideRightAsideClass = 'has-aside-right';
const htmlDarkModeClass = 'is-dark-mode-active';

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {
    asideActiveForcedKey: null,
    isAsideVisible: true,
    isAsideExpanded: false,
    isAsideMobileExpanded: false,
    isNavbarVisible: true,
    isFooterBarVisible: true,
    isAsideRightVisible: false,
    isOverlayVisible: false,
    isDarkModeActive: false
  },
  mutations: {
    fullPage (state, payload) {
      state.isAsideVisible = !payload;
      state.isNavbarVisible = !payload;
      state.isFooterBarVisible = !payload;

      [fullPageHasAside, fullPageHasFixed].forEach((htmlClass) => {
        document.documentElement.classList[payload ? 'remove' : 'add'](htmlClass);
      });
    },

    asideStateToggle (state, payload = null) {
      const isExpand = payload !== null ? payload : !state.isAsideExpanded;
      state.isAsideExpanded = isExpand;
      document.documentElement
        .classList[isExpand ? 'add' : 'remove'](asideExpandedClass);
    },

    asideMobileStateToggle (state, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideMobileExpanded;
      state.isAsideMobileExpanded = isShow;
      document.documentElement
        .classList[isShow ? 'add' : 'remove'](asideMobileExpanded);
    },

    asideRightToggle (state, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideRightVisible;
      state.isAsideRightVisible = isShow;
      document.documentElement
        .classList[isShow ? 'add' : 'remove'](asideRightAsideClass);
    },

    asideActiveForcedKeyToggle (state, payload) {
      state.asideActiveForcedKey = payload && payload.menuSecondaryKey
        ? payload.menuSecondaryKey : null;
    },

    overlayToggle (state, payload = null) {
      if (payload === null) {
        payload = !state.isOverlayVisible;
      }
      state.isOverlayVisible = !!payload;
    },

    darkModeToggle (state) {
      state.isDarkModeActive = !state.isDarkModeActive;
      document.documentElement
        .classList[state.isDarkModeActive ? 'add' : 'remove'](htmlDarkModeClass);
    }
  }
});

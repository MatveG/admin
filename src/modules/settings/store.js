import axios from 'axios';

const fetchSettingsQuery = `{
  settings {
    id
    key
    value
  }
}`;

export default {
  state: {
    settings: {
      currency: {
        sign: '$'
      }
    }
  },
  getters: {
    settings: (state) => state.settings,
    getSetting: (state) => (key, prop) => {
      const setting = prop && state.settings[key] ? state.settings[key][prop] : state.settings[key];
      return setting || null;
    }
  },
  mutations: {
    SETTINGS_MAP (state, payload) {
      state.settings = payload.reduce((acc, el) => {
        acc[el.key] = el.value.startsWith('{') ? JSON.parse(el.value) : el.value;
        return acc;
      }, {});
    }
  },
  actions: {
    async fetchSettings (context) {
      try {
        const { data } = await axios.post('http://velohub.lndo.site/admin/api', { query: fetchSettingsQuery });
        context.commit('SETTINGS_MAP', data.data.settings);
      } catch (err) {
        console.error('Axios api error', err);
      }
    }
  }
};

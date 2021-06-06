import { mapGetters } from 'vuex';

export default {
  computed: mapGetters(['settings']),
  methods: {
    setting (key, prop) {
      const setting = prop && this.settings[key] ? this.settings[key][prop] : this.settings[key];
      return setting || null;
    }
  }
};

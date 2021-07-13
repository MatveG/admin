import * as api from './api'

export default {
  state: {
    parameters: []
  },

  getters: {
    getParameters: (state) => JSON.parse(JSON.stringify(state.parameters))
  },

  mutations: {
    PARAMETERS_SET (state, payload) {
      state.parameters = payload;
    },
    PARAMETER_PUSH (state, payload) {
      state.parameters.push(payload);
    },
    PARAMETER_UPDATE (state, payload) {
      state.parameters = state.parameters.map((el) => {
        return el.id === payload.id ? Object.assign(el, payload) : el
      });
    },
    PARAMETER_REMOVE (state, id) {
      state.parameters = state.parameters.filter((el) => el.id !== id);
    }
  },

  actions: {
    async fetchParameters ({ commit }, categoryId) {
      commit('PARAMETERS_SET', await api.fetchParameters(categoryId));
    },
    async storeParameter ({ commit }, payload) {
      commit('PARAMETER_PUSH', await api.storeParameter(payload));
    },
    async updateParameter ({ commit }, payload) {
      commit('PARAMETER_UPDATE', await api.updateParameter(payload));
    },
    async deleteParameter ({ commit }, id) {
      commit('PARAMETER_REMOVE', await api.deleteParameter(id));
    }
  }
};

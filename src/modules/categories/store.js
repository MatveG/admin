import * as api from './api'

const rootCategory = { id: 0, parent_id: 0, title: '[отсувствует]' };

export default {
  state: {
    categories: [],
    category: {}
  },

  getters: {
    getCategories: (state) => state.categories,
    getCategory: (state) => state.category,
    getParentCategories: (state) => [
      rootCategory,
      ...state.categories.filter((category) => category.is_parent)
    ]
  },

  mutations: {
    CATEGORIES_SET (state, payload) {
      state.categories = payload;
    },
    CATEGORIES_UPDATE (state, payload) {
      state.categories = state.categories.map((el) => {
        return el.id === payload.id ? Object.assign(el, payload) : el
      });
    },
    CATEGORIES_REMOVE (state, id) {
      state.categories = state.categories.filter((el) => el.id !== id);
    },
    CATEGORY_SET (state, payload) {
      state.category = payload;
    },
    CATEGORY_ASSIGN (state, payload) {
      Object.assign(state.category, payload);
    }
  },

  actions: {
    async fetchCategories ({ commit }) {
      commit('CATEGORIES_SET', await api.fetchCategories());
    },
    async updateInCategories ({ commit }, payload) {
      commit('CATEGORIES_UPDATE', Object.assign(payload, await api.updateCategory(payload)));
    },
    async removeFromCategories ({ commit }, id) {
      commit('CATEGORIES_REMOVE', await api.deleteCategory(id));
    },
    async fetchCategory ({ commit }, id) {
      commit('CATEGORY_SET', await api.fetchCategory(id));
    },
    async storeCategory ({ commit }, payload) {
      commit('CATEGORY_ASSIGN', await api.storeCategory(payload));
    },
    async updateCategory ({ commit }, payload) {
      commit('CATEGORY_ASSIGN', await api.updateCategory(payload));
    }
  }
};

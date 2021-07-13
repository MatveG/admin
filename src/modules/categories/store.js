import * as api from './api'

const rootCategory = { id: 0, parent_id: 0, title: '[нет]' };

export default {
  state: {
    category: {},
    categories: []
  },

  getters: {
    // getCategory: (state) => JSON.parse(JSON.stringify(state.category)),
    getCategory: (state) => state.category,
    getCategories: (state) => JSON.parse(JSON.stringify(state.categories)),
    getParentCategories: (state) => [
      rootCategory,
      ...state.categories.filter((category) => category.is_parent)
    ]
  },

  mutations: {
    CATEGORIES_SET (state, payload) {
      if (payload) {
        state.categories = payload;
      }
    },
    CATEGORY_SET (state, payload) {
      if (payload) {
        state.category = payload;
      }
    },
    CATEGORY_ASSIGN (state, payload) {
      if (payload) {
        Object.assign(state.category, payload);
      }
    },
    CATEGORY_DELETE (state, id) {
      if (id) {
        state.categories = state.categories.filter((el) => el.id !== id);
      }
    }
  },

  actions: {
    async fetchCategories ({ commit }) {
      commit('CATEGORIES_SET', await api.fetchCategories());
    },
    async fetchCategory ({ commit }, id) {
      commit('CATEGORY_SET', await api.fetchCategory(id));
    },
    async storeCategory ({ commit }, payload) {
      commit('CATEGORY_ASSIGN', await api.storeCategory(payload));
    },
    async updateCategory ({ commit }, payload) {
      commit('CATEGORY_ASSIGN', await api.updateCategory(payload));
    },
    async deleteCategory ({ commit }, id) {
      commit('CATEGORY_DELETE', await api.deleteCategory(id));
    },
    resetCategory ({ commit }) {
      commit('CATEGORY_SET', {});
    }
  }
};

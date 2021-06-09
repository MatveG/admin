import axios from 'axios';

export default {
  state: {
    category: {},
    categories: []
  },
  getters: {
    getCategory: (state) => state.category,
    getCategories: (state) => state.categories
  },
  mutations: {
    CATEGORIES_SET (state, payload) {
      state.categories = payload;
    },
    CATEGORY_SET (state, payload) {
      state.category = payload;
    },
    CATEGORY_ASSIGN (state, payload) {
      Object.assign(state.category, payload);
    },
    CATEGORY_DELETE (state, id) {
      state.categories = state.categories.filter((el) => el.id !== id);
    }
  },
  actions: {
    async fetchCategories (context) {
      try {
        const { data } = await axios.get('/categories');
        context.commit('CATEGORIES_SET', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async fetchCategory (context, id) {
      try {
        const { data } = await axios.get(`/categories/${id}`);
        context.commit('CATEGORY_SET', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async storeCategory (context, payload) {
      try {
        const { data } = await axios.post('/categories', payload);
        context.commit('CATEGORY_ASSIGN', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async updateCategory (context, payload) {
      try {
        const { data } = await axios.patch(`/categories/${payload.id}`, payload);
        context.commit('CATEGORY_ASSIGN', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async deleteCategory (context, id) {
      try {
        await axios.delete(`/categories/${id}`);
        context.commit('CATEGORY_DELETE', id);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async resetCategory (context) {
      context.commit('CATEGORY_SET', {});
    }
  }
};

import axios from 'axios';

const fetchAllQuery = () => `{
  categories {
    id
    parent_id
    is_active
    is_parent
    title
    title_short
    slug
    seo_title
    seo_description
    seo_keywords
    description
    images
    settings
  }
}`;
const CATEGORY_BLANK = {
  parent_id: 0,
  images: [],
  features: [],
  parameters: []
};

export default {
  state: {
    category: CATEGORY_BLANK,
    categories: []
  },

  getters: {
    getCategory: (state) => state.category,
    getCategories: (state) => state.categories,

    getCategoryById: (state) => (id) => state.categories.find((el) => el.id === id) || {},

    getParentCategories: (state) => [
      { id: 0, title: '[root]' },
      ...state.categories.filter((el) => el.is_parent)
    ]
  },

  mutations: {
    resetCategory (state) {
      state.category = { ...CATEGORY_BLANK };
    },

    assignCategory (state, payload) {
      state.category = payload;
    },

    updateCategory (state, payload) {
      Object.assign(state.category, payload);
    },

    CATEGORIES_SET (state, payload) {
      state.categories = payload;
    }
  },

  actions: {
    async fetchCategories (context) {
      try {
        const { data } = await axios.post('http://velohub.lndo.site/admin/api', { query: fetchAllQuery() });
        context.commit('CATEGORIES_SET', data.data.categories);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async fetchCategory (context, id) {
      const res = await axios.get(`/admin/categories/${id}`);
      context.commit('assignCategory', res.data);
    },

    async storeCategory (context, payload) {
      const res = await axios.post(`/admin/categories`, payload);
      context.commit('updateCategory', res.data);
    },

    async patchCategory (context, payload) {
      const res = await axios.patch(`/admin/categories/${payload.id}`, payload);
      context.commit('updateCategory', res.data);
    },

    async destroyCategory (context, payload) {
      await axios.delete(`/admin/categories/${payload.id}`);
      const res = await axios.get(`/admin/categories`);
      context.commit('assignCategories', res.data);
    }
  }
};

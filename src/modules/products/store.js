import * as api from './api'

export default {
  state: {
    product: {},
    products: []
  },

  getters: {
    getProduct: (state) => JSON.parse(JSON.stringify(state.product)),
    getProducts: (state) => JSON.parse(JSON.stringify(state.products))
  },

  mutations: {
    PRODUCTS_SET (state, payload) {
      if (payload) {
        state.products = payload;
      }
    },
    PRODUCT_SET (state, payload) {
      if (payload) {
        state.product = payload;
      }
    },
    PRODUCT_ASSIGN (state, payload) {
      if (payload) {
        Object.assign(state.product, payload);
      }
    },
    PRODUCT_DELETE (state, id) {
      if (id) {
        state.products = state.products.filter((el) => el.id !== id);
      }
    }
  },

  actions: {
    async fetchProducts (context) {
      context.commit('PRODUCTS_SET', await api.fetchProducts());
    },
    async fetchProduct (context, id) {
      context.commit('PRODUCT_SET', await api.fetchProduct(id));
    },
    async storeProduct (context, payload) {
      context.commit('PRODUCT_ASSIGN', await api.storeProduct(payload));
    },
    async updateProduct (context, payload) {
      context.commit('PRODUCT_ASSIGN', await api.updateProduct(payload));
    },
    async deleteProduct (context, id) {
      context.commit('PRODUCT_DELETE', await api.deleteProduct(id));
    }
  }
};

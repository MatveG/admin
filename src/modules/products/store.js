import * as api from './api'

export default {
  state: {
    products: [],
    product: {}
  },

  getters: {
    getProducts: (state) => state.products,
    getProduct: (state) => state.product
  },

  mutations: {
    PRODUCTS_SET (state, payload) {
      if (payload) {
        state.products = payload;
      }
    },
    PRODUCTS_UPDATE (state, payload) {
      state.products = state.products.map((el) => {
        return el.id === payload.id ? Object.assign(el, payload) : el
      });
    },
    PRODUCTS_REMOVE (state, id) {
      state.products = state.products.filter((el) => el.id !== id);
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
    }
  },

  actions: {
    async fetchProducts ({ commit }) {
      commit('PRODUCTS_SET', await api.fetchProducts());
    },
    async updateInProducts ({ commit }, payload) {
      commit('PRODUCTS_UPDATE', Object.assign(payload, await api.updateProduct(payload)));
    },
    async removeFromProducts ({ commit }, id) {
      commit('PRODUCTS_REMOVE', await api.deleteProduct(id));
    },
    async fetchProduct ({ commit }, id) {
      commit('PRODUCT_SET', await api.fetchProduct(id));
    },
    async storeProduct ({ commit }, payload) {
      commit('PRODUCT_ASSIGN', await api.storeProduct(payload));
    },
    async updateProduct ({ commit }, payload) {
      commit('PRODUCT_ASSIGN', await api.updateProduct(payload));
    }
  }
};

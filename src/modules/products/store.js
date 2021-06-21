import axios from '@/api/axios';

export default {
  state: {
    product: {},
    products: []
  },
  getters: {
    getProduct: (state) => state.product,
    getProducts: (state) => state.products
  },
  mutations: {
    PRODUCTS_SET (state, payload) {
      state.products = payload;
    },
    PRODUCT_SET (state, payload) {
      state.product = payload;
    },
    PRODUCT_ASSIGN (state, payload) {
      Object.assign(state.product, payload);
    },
    PRODUCT_DELETE (state, id) {
      state.products = state.products.filter((el) => el.id !== id);
    }
  },
  actions: {
    async fetchProducts (context) {
      try {
        const { data } = await axios.get('/products');
        context.commit('PRODUCTS_SET', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async fetchProduct (context, id) {
      try {
        const { data } = await axios.get(`/products/${id}`);
        context.commit('PRODUCT_SET', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async storeProduct (context, payload) {
      try {
        const { data } = await axios.post('/products', payload);
        context.commit('PRODUCT_ASSIGN', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async updateProduct (context, payload) {
      try {
        const { data } = await axios.patch(`/products/${payload.id}`, payload);
        context.commit('PRODUCT_ASSIGN', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async deleteProduct (context, id) {
      try {
        await axios.delete(`/products/${id}`);
        context.commit('PRODUCT_DELETE', id);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async resetProduct (context) {
      context.commit('PRODUCT_SET', {});
    }
  }
};

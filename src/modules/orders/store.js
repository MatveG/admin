import axios from 'axios';

export default {
  state: {
    order: {},
    orders: []
  },
  getters: {
    getOrder: (state) => state.order,
    getOrders: (state) => state.orders
  },
  mutations: {
    ORDERS_SET (state, payload) {
      state.orders = payload;
    },
    ORDER_SET (state, payload) {
      state.order = payload;
    },
    ORDER_ASSIGN (state, payload) {
      Object.assign(state.order, payload);
    },
    ORDER_DELETE (state, id) {
      state.orders = state.orders.filter((el) => el.id !== id);
    }
  },
  actions: {
    async fetchOrders (context) {
      try {
        const { data } = await axios.get('/orders');
        context.commit('ORDERS_SET', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async fetchOrder (context, id) {
      try {
        const { data } = await axios.get(`/orders/${id}`);
        context.commit('ORDER_SET', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async storeOrder (context, payload) {
      try {
        const { data } = await axios.post('/orders', payload);
        context.commit('ORDER_ASSIGN', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async updateOrder (context, payload) {
      try {
        const { data } = await axios.patch(`/orders/${payload.id}`, payload);
        context.commit('ORDER_ASSIGN', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async deleteOrder (context, id) {
      try {
        await axios.delete(`/orders/${id}`);
        context.commit('ORDER_DELETE', id);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async resetOrder (context) {
      context.commit('ORDER_SET', {});
    }
  }
};

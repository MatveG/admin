import { ref, computed } from '@vue/composition-api';
import '@/loaders/composition';
import axios from '@/loaders/axios';
import api from '@/api';

const order = ref({
  address: {}
});
const orders = ref([]);
const error = ref(null);
const isLoading = ref(false);
const isSaved = ref(true);

export default function () {
  async function fetchOrder (id) {
    setLoading(true);
    try {
      const { data } = await axios(api.fetchOrder(id));
      order.value = data;
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function storeOrder (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.storeOrder(payload));
      Object.assign(order.value, data);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function updateOrder (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.updateOrder(payload.id, payload));
      Object.assign(order.value, data);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function fetchOrders () {
    setLoading(true);
    try {
      const { data } = await axios(api.fetchOrders());
      orders.value = data;
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function updateOrdersRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.updateOrder(payload.id, payload));
      orders.value = orders.value.map((el) => {
        return el.id === payload.id ? Object.assign(el, data) : el;
      });
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function removeOrdersRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.deleteOrder(payload.id));
      orders.value = orders.value.filter((el) => el.id !== data.id);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  return {
    order: computed(() => order.value),
    orders: computed(() => orders.value),
    error,
    isLoading,
    isSaved,
    fetchOrder,
    storeOrder,
    updateOrder,
    fetchOrders,
    updateOrdersRow,
    removeOrdersRow
  };
}

function setLoading (value) {
  isLoading.value = value;
  isSaved.value = !value;
}

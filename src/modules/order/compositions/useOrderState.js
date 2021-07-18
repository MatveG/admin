import { ref, computed } from '@vue/composition-api'
import '@/loaders/composition'
import axios from '@/loaders/axios'

const order = ref({});
const orders = ref([]);
const error = ref(null);
const isLoading = ref(false);
const isSaved = ref(true);

export default function () {
  async function fetchOrder (id) {
    setLoading(true);
    const { data } = await axios.get(`/orders/${id}`);
    order.value = data;
    setLoading(false);
  }

  async function storeOrder (payload) {
    setLoading(true);
    const { data } = await axios.post('/orders', payload);
    Object.assign(order.value, data);
    setLoading(false);
  }

  async function updateOrder (payload) {
    setLoading(true);
    const { data } = await axios.patch(`/orders/${payload.id}`, payload);
    Object.assign(order.value, data);
    setLoading(false);
  }

  async function fetchOrders () {
    setLoading(true);
    const { data } = await axios.get('/orders');
    orders.value = data;
    setLoading(false);
  }

  async function updateOrdersRow (payload) {
    setLoading(true);
    const { data } = await axios.patch(`/orders/${payload.id}`, payload);
    orders.value = orders.value.map((el) => {
      return el.id === payload.id ? Object.assign(el, data) : el;
    });
    setLoading(false);
  }

  async function removeOrdersRow (payload) {
    setLoading(true);
    const { data } = await axios.delete(`/orders/${payload.id}`);
    orders.value = orders.value.filter((el) => el.id !== data.id);
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
  }
}

function setLoading (value) {
  isLoading.value = value;
  isSaved.value = !value;
}

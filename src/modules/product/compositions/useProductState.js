import { ref, computed } from '@vue/composition-api';
import '@/loaders/composition';
import axios from '@/loaders/axios';
import api from '@/api';

const product = ref({
  category: {},
  images: []
});
const products = ref([]);
const error = ref(null);
const isLoading = ref(false);
const isSaved = ref(true);

export default function () {
  async function fetchProduct (id) {
    setLoading(true);
    try {
      const { data } = await axios(api.fetchProduct(id));
      product.value = data;
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function storeProduct (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.storeProduct(payload));
      Object.assign(product.value, data);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function updateProduct (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.updateProduct(payload));
      Object.assign(product.value, data);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function fetchProducts () {
    setLoading(true);
    try {
      const { data } = await axios(api.fetchProducts());
      products.value = data;
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function updateProductsRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.updateProduct(payload.id, payload));
      products.value = products.value.map((el) => {
        return el.id === payload.id ? Object.assign(el, data) : el;
      });
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function removeProductsRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.deleteProduct(payload.id));
      products.value = products.value.filter((el) => el.id !== data.id);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  return {
    product: computed(() => product.value),
    products: computed(() => products.value),
    error,
    isLoading,
    isSaved,
    fetchProduct,
    storeProduct,
    updateProduct,
    fetchProducts,
    updateProductsRow,
    removeProductsRow
  };
}

function setLoading (value) {
  isLoading.value = value;
  isSaved.value = !value;
}

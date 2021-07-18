import { ref, computed } from '@vue/composition-api'
import '@/loaders/composition'
import axios from '@/loaders/axios'

const parameters = ref([]);
const error = ref(null);
const isLoading = ref(false);
const isSaved = ref(true);

export default function () {
  async function fetchParameters (categoryId) {
    setLoading(true);
    try {
      const { data } = await axios.get(`/parameters/${categoryId}`);
      parameters.value = data;
    } catch (error) {
      error.value = error;
    }
    setLoading(false);
  }

  async function storeParametersRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios.post('/parameters', payload);
      parameters.value.push(data);
    } catch (error) {
      error.value = error;
    }
    setLoading(false);
  }

  async function updateParametersRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios.patch(`/parameters/${payload.id}`, payload);
      parameters.value = parameters.value.map((el) => {
        return el.id === payload.id ? Object.assign(el, data) : el;
      });
    } catch (error) {
      error.value = error;
    }
    setLoading(false);
  }

  async function removeParametersRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/parameters/${payload.id}`);
      parameters.value = parameters.value
        .filter((el) => el.id !== data.id)
        .map((el) => {
          if (el.parent_id === payload.parent_id && el.ord > payload.ord) {
            el.ord--;
          }
          return el;
        });
    } catch (error) {
      error.value = error;
    }
    setLoading(false);
  }

  return {
    parameters: computed(() => parameters.value),
    error,
    isLoading,
    isSaved,
    fetchParameters,
    storeParametersRow,
    updateParametersRow,
    removeParametersRow
  }
}

function setLoading (value) {
  isLoading.value = value;
  isSaved.value = !value;
}

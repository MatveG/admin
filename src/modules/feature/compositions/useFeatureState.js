import { ref, computed } from '@vue/composition-api'
import '@/loaders/composition'
import axios from '@/loaders/axios'

const features = ref([]);
const error = ref(null);
const isLoading = ref(false);
const isSaved = ref(true);

export default function () {
  async function fetchFeatures (categoryId) {
    setLoading(true);
    try {
      const { data } = await axios.get(`/features/${categoryId}`);
      features.value = data;
    } catch (error) {
      error.value = error;
    }
    setLoading(false);
  }

  async function storeFeaturesRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios.post('/features', payload);
      features.value.push(data);
    } catch (error) {
      error.value = error;
    }
    setLoading(false);
  }

  async function updateFeaturesRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios.patch(`/features/${payload.id}`, payload);
      features.value = features.value.map((el) => {
        return el.id === payload.id ? Object.assign(el, data) : el;
      });
    } catch (error) {
      error.value = error;
    }
    setLoading(false);
  }

  async function removeFeaturesRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/features/${payload.id}`);
      features.value = features.value
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
    features: computed(() => features.value),
    error,
    isLoading,
    isSaved,
    fetchFeatures,
    storeFeaturesRow,
    updateFeaturesRow,
    removeFeaturesRow
  }
}

function setLoading (value) {
  isLoading.value = value;
  isSaved.value = !value;
}

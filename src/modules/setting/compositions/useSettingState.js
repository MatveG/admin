import { ref, computed } from '@vue/composition-api';
import '@/loaders/composition';
import axios from '@/loaders/axios';
import api from '@/api';

const settings = ref([]);
const error = ref(null);
const isLoading = ref(false);
const isSaved = ref(true);

export default function () {
  async function fetchSettings () {
    setLoading(true);
    try {
      const { data } = await axios(api.fetchSettings());
      settings.value = data;
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function updateSettingsRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.updateSetting(payload.id, payload));
      settings.value = settings.value.map((el) => {
        return el.id === payload.id ? Object.assign(el, data) : el;
      });
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  return {
    settings: computed(() => settings.value),
    error,
    isLoading,
    isSaved,
    fetchSettings,
    updateSettingsRow
  };
}

function setLoading (value) {
  isLoading.value = value;
  isSaved.value = !value;
}

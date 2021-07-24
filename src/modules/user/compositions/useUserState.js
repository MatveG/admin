import { ref, computed } from '@vue/composition-api';
import '@/loaders/composition';
import axios from '@/loaders/axios';
import api from '@/api';

const user = ref({
  rights: {}
});
const users = ref([]);
const error = ref(null);
const isLoading = ref(false);
const isSaved = ref(true);

export default function () {
  async function fetchUser (id) {
    setLoading(true);
    try {
      const { data } = await axios(api.fetchUser(id));
      user.value = data;
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function storeUser (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.storeUser(payload));
      Object.assign(user.value, data);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function updateUser (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.updateUser(payload.id, payload));
      Object.assign(user.value, data);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function fetchUsers () {
    setLoading(true);
    try {
      const { data } = await axios(api.fetchUsers());
      users.value = data;
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function updateUsersRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.updateUser(payload.id, payload));
      users.value = users.value.map((el) => {
        return el.id === payload.id ? Object.assign(el, data) : el;
      });
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function removeUsersRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.deleteUser(payload.id));
      users.value = users.value.filter((el) => el.id !== data.id);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  return {
    user: computed(() => user.value),
    users: computed(() => users.value),
    error,
    isLoading,
    isSaved,
    fetchUser,
    storeUser,
    updateUser,
    fetchUsers,
    updateUsersRow,
    removeUsersRow
  };
}

function setLoading (value) {
  isLoading.value = value;
  isSaved.value = !value;
}

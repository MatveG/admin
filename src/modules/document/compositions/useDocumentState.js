import { ref, computed } from '@vue/composition-api';
import '@/loaders/composition';
import axios from '@/loaders/axios';
import api from '@/api';

const document = ref({
  category: {},
  images: []
});
const documents = ref([]);
const error = ref(null);
const isLoading = ref(false);
const isSaved = ref(true);

export default function () {
  async function fetchDocument (id) {
    setLoading(true);
    try {
      const { data } = await axios(api.fetchDocument(id));
      document.value = data;
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function storeDocument (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.storeDocument(payload));
      Object.assign(document.value, data);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function updateDocument (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.updateDocument(payload.id, payload));
      Object.assign(document.value, data);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function fetchDocuments () {
    setLoading(true);
    try {
      const { data } = await axios(api.fetchDocuments());
      documents.value = data;
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function updateDocumentsRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.updateDocument(payload.id, payload));
      documents.value = documents.value.map((el) => {
        return el.id === payload.id ? Object.assign(el, data) : el;
      });
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function removeDocumentsRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.deleteDocument(payload.id));
      documents.value = documents.value.filter((el) => el.id !== data.id);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  return {
    document: computed(() => document.value),
    documents: computed(() => documents.value),
    error,
    isLoading,
    isSaved,
    fetchDocument,
    storeDocument,
    updateDocument,
    fetchDocuments,
    updateDocumentsRow,
    removeDocumentsRow
  };
}

function setLoading (value) {
  isLoading.value = value;
  isSaved.value = !value;
}

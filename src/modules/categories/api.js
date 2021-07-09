import axios from '@/api/axios'

export const fetchCategories = async () => {
  const { data } = await axios.get('/categories');
  return data;
};

export const fetchCategory = async (id) => {
  const { data } = await axios.get(`/categories/${id}`);
  return data;
};

export const storeCategory = async (payload) => {
  const { data } = await axios.post('/categories', payload);
  return data;
};

export const updateCategory = async (payload) => {
  const { data } = await axios.patch(`/categories/${payload.id}`, payload);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await axios.delete(`/categories/${id}`);
  return data;
};

export const storeFeature = async (payload) => {
  const { data } = await axios.post('/features', payload);
  return data;
};

export const updateFeature = async (payload) => {
  const { data } = await axios.patch(`/features/${payload.id}`, payload);
  return data;
};

export const deleteFeature = async (id) => {
  const { data } = await axios.delete(`/features/${id}`);
  return data;
};

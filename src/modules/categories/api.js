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

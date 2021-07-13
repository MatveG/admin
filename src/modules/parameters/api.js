import axios from '@/api/axios'

export const fetchParameters = async (categoryId) => {
  const { data } = await axios.get(`/parameters/${categoryId}`);
  return data;
};

export const storeParameter = async (payload) => {
  const { data } = await axios.post('/parameters', payload);
  return data;
};

export const updateParameter = async (payload) => {
  const { data } = await axios.patch(`/parameters/${payload.id}`, payload);
  return data;
};

export const deleteParameter = async (id) => {
  const { data } = await axios.delete(`/parameters/${id}`);
  return data;
};

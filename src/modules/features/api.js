import axios from '@/api/axios'

export const fetchFeatures = async (categoryId) => {
  const { data } = await axios.get(`/features/${categoryId}`);
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

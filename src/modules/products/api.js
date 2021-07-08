import axios from '@/api/axios'

export const fetchProducts = async () => {
  const { data } = await axios.get('/products');
  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(`/products/${id}`);
  return data;
};

export const storeProduct = async (payload) => {
  const { data } = await axios.post('/products', payload);
  return data;
};

export const updateProduct = async (payload) => {
  const { data } = await axios.patch(`/products/${payload.id}`, payload);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`/products/${id}`);
  return data;
};

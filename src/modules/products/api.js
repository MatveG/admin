import axios from '@/api/axios'

export async function fetchProducts () {
  const { data } = await axios.get('/products');
  return data;
}

export async function fetchProduct (id) {
  const { data } = await axios.get(`/products/${id}`);
  return data;
}

export async function storeProduct (payload) {
  const { data } = await axios.post('/products', payload);
  return data;
}

export async function updateProduct (payload) {
  const { data } = await axios.patch(`/products/${payload.id}`, payload);
  return data;
}

export async function deleteProduct (id) {
  const { data } = await axios.delete(`/products/${id}`);
  return data;
}

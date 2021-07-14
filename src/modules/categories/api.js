import axios from '@/api/axios'

export async function fetchCategories () {
  const { data } = await axios.get('/categories');
  return data;
}

export async function fetchCategory (id) {
  const { data } = await axios.get(`/categories/${id}`);
  return data;
}

export async function storeCategory (payload) {
  const { data } = await axios.post('/categories', payload);
  return data;
}

export async function updateCategory (payload) {
  const { data } = await axios.patch(`/categories/${payload.id}`, payload);
  return data;
}

export async function deleteCategory (id) {
  const { data } = await axios.delete(`/categories/${id}`);
  return data;
}

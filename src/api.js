const baseURL = 'http://velohub.lndo.site/api/admin';

export default {
  fetchRoot: () => ({ method: 'get', url: `/root`, baseURL }),

  // Categories
  fetchCategories: () => ({ method: 'get', url: `/categories`, baseURL }),
  fetchCategory: (id) => ({ method: 'get', url: `/categories/${id}`, baseURL }),
  storeCategory: (data) => ({ method: 'post', url: `/categories`, data, baseURL }),
  updateCategory: (id, data) => ({ method: 'patch', url: `/categories/${id}`, data, baseURL }),
  deleteCategory: (id) => ({ method: 'delete', url: `/categories/${id}`, baseURL }),

  // Documents
  fetchDocuments: () => ({ method: 'get', url: `/documents`, baseURL }),
  fetchDocument: (id) => ({ method: 'get', url: `/documents/${id}`, baseURL }),
  storeDocument: (data) => ({ method: 'post', url: `/documents`, data, baseURL }),
  updateDocument: (id, data) => ({ method: 'patch', url: `/documents/${id}`, data, baseURL }),
  deleteDocument: (id) => ({ method: 'delete', url: `/documents/${id}`, baseURL }),

  // Features
  fetchFeatures: (id) => ({ method: 'get', url: `/features/${id}`, baseURL }),
  storeFeature: (data) => ({ method: 'post', url: `/features`, data, baseURL }),
  updateFeature: (id, data) => ({ method: 'patch', url: `/features/${id}`, data, baseURL }),
  deleteFeature: (id) => ({ method: 'delete', url: `/features/${id}`, baseURL }),

  // Orders
  fetchOrders: () => ({ method: 'get', url: `/orders`, baseURL }),
  fetchOrder: (id) => ({ method: 'get', url: `/orders/${id}`, baseURL }),
  storeOrder: (data) => ({ method: 'post', url: `/orders`, data, baseURL }),
  updateOrder: (id, data) => ({ method: 'patch', url: `/orders/${id}`, data, baseURL }),
  deleteOrder: (id) => ({ method: 'delete', url: `/orders/${id}`, baseURL }),

  // Parameters
  fetchParameters: (id) => ({ method: 'get', url: `/parameters/${id}`, baseURL }),
  storeParameter: (data) => ({ method: 'post', url: `/parameters`, data, baseURL }),
  updateParameter: (id, data) => ({ method: 'patch', url: `/parameters/${id}`, data, baseURL }),
  deleteParameter: (id) => ({ method: 'delete', url: `/parameters/${id}`, baseURL }),

  // Products
  fetchProducts: () => ({ method: 'get', url: `/products`, baseURL }),
  fetchProduct: (id) => ({ method: 'get', url: `/products/${id}`, baseURL }),
  storeProduct: (data) => ({ method: 'post', url: `/products`, data, baseURL }),
  updateProduct: (id, data) => ({ method: 'patch', url: `/products/${id}`, data, baseURL }),
  deleteProduct: (id) => ({ method: 'delete', url: `/products/${id}`, baseURL }),

  // Users
  fetchUsers: () => ({ method: 'get', url: `/users`, baseURL }),
  fetchUser: (id) => ({ method: 'get', url: `/users/${id}`, baseURL }),
  storeUser: (data) => ({ method: 'post', url: `/users`, data, baseURL }),
  updateUser: (id, data) => ({ method: 'patch', url: `/users/${id}`, data, baseURL }),
  deleteUser: (id) => ({ method: 'delete', url: `/users/${id}`, baseURL }),

  // Images
  uploadImages: (module, id, data, config) => ({
    method: 'post',
    url: `/images/upload/${module}/${id}`,
    data,
    config,
    baseURL
  }),
  updateImages: (module, id, data) => ({
    method: 'post',
    url: `/images/update/${module}/${id}`,
    data,
    baseURL
  }),

  // Settings
  fetchAppSettings: () => ({ method: 'get', url: `/settings`, baseURL }),
  fetchSettings: () => ({ method: 'get', url: `/settings`, baseURL }),
  updateSetting: (id, data) => ({ method: 'patch', url: `/settings/${id}`, data, baseURL }),

  // Login
  authCsrf: () => ({ method: 'get', url: `/csrf-cookie`, baseURL }),
  authLogin: (data) => ({ method: 'post', url: `/login`, data, baseURL }),
  authSignup: (data) => ({ method: 'post', url: `/signup`, data, baseURL }),
  authRemind: (data) => ({ method: 'post', url: `/remind`, data, baseURL })
};

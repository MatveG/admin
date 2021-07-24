export default {
  fetchRoot: () => ({ method: 'get', url: `/root` }),

  // Categories
  fetchCategories: () => ({ method: 'get', url: `/categories` }),
  fetchCategory: (id) => ({ method: 'get', url: `/categories/${id}` }),
  storeCategory: (data) => ({ method: 'post', url: `/categories`, data }),
  updateCategory: (id, data) => ({ method: 'patch', url: `/categories/${id}`, data }),
  deleteCategory: (id) => ({ method: 'delete', url: `/categories/${id}` }),

  // Documents
  fetchDocuments: () => ({ method: 'get', url: `/documents` }),
  fetchDocument: (id) => ({ method: 'get', url: `/documents/${id}` }),
  storeDocument: (data) => ({ method: 'post', url: `/documents`, data }),
  updateDocument: (id, data) => ({ method: 'patch', url: `/documents/${id}`, data }),
  deleteDocument: (id) => ({ method: 'delete', url: `/documents/${id}` }),

  // Features
  fetchFeatures: (id) => ({ method: 'get', url: `/features/${id}` }),
  storeFeature: (data) => ({ method: 'post', url: `/features`, data }),
  updateFeature: (id, data) => ({ method: 'patch', url: `/features/${id}`, data }),
  deleteFeature: (id) => ({ method: 'delete', url: `/features/${id}` }),

  // Orders
  fetchOrders: () => ({ method: 'get', url: `/orders` }),
  fetchOrder: (id) => ({ method: 'get', url: `/orders/${id}` }),
  storeOrder: (data) => ({ method: 'post', url: `/orders`, data }),
  updateOrder: (id, data) => ({ method: 'patch', url: `/orders/${id}`, data }),
  deleteOrder: (id) => ({ method: 'delete', url: `/orders/${id}` }),

  // Parameters
  fetchParameters: (id) => ({ method: 'get', url: `/parameters/${id}` }),
  storeParameter: (data) => ({ method: 'post', url: `/parameters`, data }),
  updateParameter: (id, data) => ({ method: 'patch', url: `/parameters/${id}`, data }),
  deleteParameter: (id) => ({ method: 'delete', url: `/parameters/${id}` }),

  // Products
  fetchProducts: () => ({ method: 'get', url: `/products` }),
  fetchProduct: (id) => ({ method: 'get', url: `/products/${id}` }),
  storeProduct: (data) => ({ method: 'post', url: `/products`, data }),
  updateProduct: (id, data) => ({ method: 'patch', url: `/products/${id}`, data }),
  deleteProduct: (id) => ({ method: 'delete', url: `/products/${id}` }),

  // Users
  fetchUsers: () => ({ method: 'get', url: `/users` }),
  fetchUser: (id) => ({ method: 'get', url: `/users/${id}` }),
  storeUser: (data) => ({ method: 'post', url: `/users`, data }),
  updateUser: (id, data) => ({ method: 'patch', url: `/users/${id}`, data }),
  deleteUser: (id) => ({ method: 'delete', url: `/users/${id}` }),

  // Images

  // Settings
  fetchAppSettings: () => ({ method: 'get', url: `/settings` }),
  fetchSettings: () => ({ method: 'get', url: `/settings` }),
  updateSetting: (id, data) => ({ method: 'patch', url: `/settings/${id}`, data })
};

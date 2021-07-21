export default {
  // Categories
  fetchCategories: () => ({ method: 'get', url: `/categories` }),
  fetchCategory: (id) => ({ method: 'get', url: `/categories/${id}` }),
  storeCategory: (data) => ({ method: 'post', url: `/categories`, data }),
  updateCategory: (id, data) => ({ method: 'patch', url: `/categories/${id}`, data }),
  deleteCategory: (id) => ({ method: 'delete', url: `/categories/${id}` }),

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

  // Images

  // Settings
  fetchSettings: () => ({ method: 'get', url: `/settings` })
};

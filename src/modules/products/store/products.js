import axios from 'axios';

const fetchAllQuery = () => `{
  products {
    category {
      title
    }
    id
    is_active
    is_stock
    code
    title
    brand
    model
    slug
    thumb
    features
  }
}`;
const fetchOneQuery = (id) => `{
  product(id: ${id}) {
    category {
      id
      title
    }
    variants {
      id
      product_id
      category_id
      is_active
      is_stock
      is_sale
      price
      surcharge
      weight
      code
      barcode
      images
      parameters
      stocks
    }
    id
    category_id
    is_active
    is_stock
    is_sale
    warranty
    price
    price_old
    weight
    code
    barcode
    slug
    title
    brand
    model
    seo_title
    seo_description
    seo_keywords
    sale_text
    summary
    description
    link
    thumb
    created_at
    updated_at
    stocks
    features
    settings
  }
}`;
const BLANK_PRODUCT = {
  category: {},
  variants: [],
  features: {},
  images: []
};

export default {
  state: {
    product: BLANK_PRODUCT,
    products: []
  },
  getters: {
    product: (state) => state.product,
    products: (state) => state.products
  },
  mutations: {
    PRODUCTS_SET (state, payload) {
      state.products = payload;
    },
    PRODUCT_SET (state, payload) {
      state.product = payload;
    },
    PRODUCT_ASSIGN (state, payload) {
      Object.assign(state.product, payload);
    },
    PRODUCT_DELETE (state, id) {
      state.products = state.products.filter((el) => el.id !== id);
    }
  },
  actions: {
    async fetchProducts (context) {
      try {
        const { data } = await axios.post('http://velohub.lndo.site/admin/api', { query: fetchAllQuery() });
        context.commit('PRODUCTS_SET', data.data.products);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async fetchProduct (context, id) {
      try {
        const { data } = await axios.post('http://velohub.lndo.site/admin/api', { query: fetchOneQuery(id) });
        context.commit('PRODUCT_SET', data.data.product);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async storeProduct (context, payload) {
      try {
        const { data } = await axios.post('http://velohub.lndo.site/api/products', payload);
        context.commit('PRODUCT_ASSIGN', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async updateProduct (context, payload) {
      try {
        const { data } = await axios.patch(`http://velohub.lndo.site/api/products/${payload.id}`, payload);
        context.commit('PRODUCT_ASSIGN', data);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async deleteProduct (context, id) {
      try {
        await axios.delete(`http://velohub.lndo.site/api/products/${id}`);
        context.commit('PRODUCT_DELETE', id);
      } catch (err) {
        console.error('Axios api error', err);
      }
    },

    async resetProduct (context) {
      context.commit('PRODUCT_SET', { ...BLANK_PRODUCT });
    }
  }
};

import Products from './views/ProductsMain';
import ProductEdit from './views/ProductsEdit';

export default [
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/products/create',
    name: 'products.create',
    component: ProductEdit
  },
  {
    path: '/products/edit/:propId',
    name: 'products.edit',
    component: ProductEdit,
    props: true
  }
];

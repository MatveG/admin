import ProductMain from './views/ProductMain';
import ProductEdit from './views/ProductEdit';

export default [
  {
    path: '/products',
    name: 'products',
    component: ProductMain
  },
  {
    path: '/product/create',
    name: 'product.create',
    component: ProductEdit
  },
  {
    path: '/product/edit/:propId',
    name: 'product.edit',
    component: ProductEdit,
    props: true
  }
];

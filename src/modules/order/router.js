import OrderMain from './views/OrderMain';
// import OrderEdit from './views/OrderEdit';

export default [
  {
    path: '/orders',
    name: 'orders',
    component: OrderMain
  }
  // {
  //   path: '/orders/create',
  //   name: 'orders.create',
  //   component: OrderEdit
  // },
  // {
  //   path: '/orders/edit/:propId',
  //   name: 'orders.edit',
  //   component: OrderEdit,
  //   props: true
  // }
];

import OrderMain from './views/OrderMain';
import OrderEdit from './views/OrderEdit';

export default [
  {
    path: '/orders',
    name: 'orders',
    component: OrderMain
  },
  {
    path: '/order/create',
    name: 'order.create',
    component: OrderEdit
  },
  {
    path: '/order/edit/:propId',
    name: 'order.edit',
    component: OrderEdit,
    props: true
  }
];

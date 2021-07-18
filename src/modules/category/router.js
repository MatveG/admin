import CategoryMain from './views/CategoryMain';
import CategoryEdit from './views/CategoryEdit';

export default [
  {
    path: '/categories',
    name: 'categories',
    component: CategoryMain
  },
  {
    path: '/category/create',
    name: 'category.create',
    component: CategoryEdit
  },
  {
    path: '/category/edit/:propId',
    name: 'category.edit',
    component: CategoryEdit,
    props: true
  }
];

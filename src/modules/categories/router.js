import Categories from './views/Categories';
// import CategoryEdit from './views/CategoryEdit';

export default [
  {
    path: '/categories',
    name: 'categories',
    component: Categories
  }
  // {
  //   path: '/categories-create',
  //   name: 'categories.create',
  //   component: CategoryEdit
  // },
  // {
  //   path: '/categories-create-child/:propParent',
  //   name: 'category-create-child',
  //   component: CategoryEdit,
  //   props: true
  // },
  // {
  //   path: '/categories-edit/:propId',
  //   name: 'categories.edit',
  //   component: CategoryEdit,
  //   props: true
  // }
];

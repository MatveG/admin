import UserMain from './views/UserMain';
import UserEdit from './views/UserEdit';

export default [
  {
    path: '/users',
    name: 'users',
    component: UserMain
  },
  {
    path: '/user/create',
    name: 'user.create',
    component: UserEdit
  },
  {
    path: '/user/edit/:propId',
    name: 'user.edit',
    component: UserEdit,
    props: true
  }
];

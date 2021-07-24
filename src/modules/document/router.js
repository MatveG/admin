import DocumentMain from './views/DocumentMain';
import DocumentEdit from './views/DocumentEdit';

export default [
  {
    path: '/documents',
    name: 'documents',
    component: DocumentMain
  },
  {
    path: '/document/create',
    name: 'document.create',
    component: DocumentEdit
  },
  {
    path: '/document/edit/:propId',
    name: 'document.edit',
    component: DocumentEdit,
    props: true
  }
];

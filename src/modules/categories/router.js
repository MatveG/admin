
import CategoryIndex from "./views/CategoryIndex";
import CategoryEdit from "./views/CategoryEdit";

export default [
    {
        path: '/categories',
        name: 'category',
        component: CategoryIndex
    },
    {
        path: '/categories-create',
        name: 'category-create',
        component: CategoryEdit
    },
    {
        path: '/categories-create-child/:propParent',
        name: 'category-create-child',
        component: CategoryEdit,
        props: true
    },
    {
        path: '/categories-edit/:propId',
        name: 'category-edit',
        component: CategoryEdit,
        props: true
    },
];

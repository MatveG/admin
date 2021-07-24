import SettingMain from './views/SettingMain';
import SettingEdit from './views/SettingEdit';

export default [
  {
    path: '/settings',
    name: 'settings',
    component: SettingMain
  },
  {
    path: '/setting/create',
    name: 'setting.create',
    component: SettingEdit
  },
  {
    path: '/setting/edit/:propId',
    name: 'setting.edit',
    component: SettingEdit,
    props: true
  }
];

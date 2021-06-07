<template>
  <div id="app">
    <nav-bar/>
    <aside-menu :menu="menu"/>
    <router-view/>
    <aside-right/>
    <footer-bar/>
    <overlay/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
import Overlay from '@/components/Overlay'
import AsideRight from '@/components/AsideRight'

const menu = [
  [
    {
      to: '/',
      icon: 'desktop-mac',
      label: 'Dashboard'
    }
  ],
  'Магазин',
  [
    {
      to: '/products',
      label: 'Товары',
      icon: 'basket'
    },
    {
      to: '/categories',
      label: 'Категории',
      icon: 'shape-outline'
    },
    {
      to: '/tables',
      label: 'Tables',
      icon: 'table'
    },
    {
      to: '/forms',
      label: 'Forms',
      icon: 'square-edit-outline'
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: 'account-circle'
    }
  ]
]

export default {
  name: 'App',
  components: {
    AsideRight,
    Overlay,
    FooterBar,
    AsideMenu,
    NavBar
  },
  data () {
    return {
      menu,
      menuSecondary: null,
      menuSecondaryLabel: null,
      menuSecondaryIcon: null
    }
  },
  beforeMount () {
    this.$store.dispatch('fetchSettings');
  }
}
</script>

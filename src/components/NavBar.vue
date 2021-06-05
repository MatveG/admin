<template>
  <nav id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand">
      <a @click.prevent="menuToggle" :title="toggleTooltip" class="navbar-item is-desktop-icon-only is-hidden-touch">
        <b-icon :icon="menuToggleIcon"/>
      </a>
      <a class="navbar-item is-hidden-desktop" @click.prevent="menuToggleMobile">
        <b-icon :icon="menuToggleMobileIcon"/>
      </a>
      <div class="navbar-item no-left-space">
        <div class="control">
          <input class="input" placeholder="Поиск по всем разделам...">
        </div>
      </div>
    </div>

    <div class="navbar-brand is-right">
      <a class="navbar-item navbar-item-menu-toggle is-hidden-desktop" @click.prevent="updatesToggle">
        <b-icon icon="bell" custom-size="default"/>
      </a>
      <a class="navbar-item navbar-item-menu-toggle is-hidden-desktop" @click.prevent="menuNavBarToggle">
        <b-icon :icon="menuNavBarToggleIcon" custom-size="default"/>
      </a>
    </div>

    <div class="navbar-menu fadeIn animated faster" :class="{'is-active':isMenuNavBarActive}">
      <div class="navbar-end">
        <a class="navbar-item has-divider is-desktop-icon-only" title="Темная тема"
           @click="darkModeToggle">
          <b-icon :icon="darkModeToggleIcon" custom-size="default"/>
          <span>Темная тема</span>
        </a>
        <a href="/" class="navbar-item has-divider is-desktop-icon-only" title="Настройки">
          <b-icon icon="cog" custom-size="default"/>
          <span>Настройки</span>
        </a>
        <a class="navbar-item is-desktop-icon-only" title="Выход"
           @click="logout">
          <b-icon icon="logout" custom-size="default"/>
          <span>Выход</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavBar',
  data () {
    return {
      isMenuNavBarActive: false
    }
  },
  computed: {
    menuNavBarToggleIcon () {
      return (this.isMenuNavBarActive) ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon () {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },
    menuToggleIcon () {
      return this.isAsideExpanded ? 'backburger' : 'forwardburger'
    },
    toggleTooltip () {
      return this.isAsideExpanded ? 'Collapse' : 'Expand'
    },
    darkModeToggleIcon () {
      return this.isDarkModeActive ? 'white-balance-sunny' : 'weather-night'
    },
    ...mapState([
      'isAsideExpanded',
      'isAsideMobileExpanded',
      'isAsideRightVisible',
      'isDarkModeActive',
      'userName',
      'hasUpdates'
    ])
  },
  methods: {
    menuToggle () {
      this.$store.commit('asideStateToggle')
    },
    menuToggleMobile () {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle () {
      this.isMenuNavBarActive = (!this.isMenuNavBarActive)
    },
    updatesToggle () {
      this.$store.commit('asideRightToggle')
    },
    darkModeToggle () {
      this.$store.commit('darkModeToggle')
    },
    logout () {
      this.$buefy.snackbar.open({
        message: 'Log out clicked',
        queue: false
      })
    }
  }
}
</script>

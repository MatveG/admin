<template>
  <nav v-show="isNavbarVisible" class="navbar is-fixed-top">
    <div class="navbar-brand">
      <a
          @click.prevent="asideStateToggle()"
          :title="isAsideExpanded ? 'Collapse' : 'Expand'"
          class="navbar-item is-desktop-icon-only is-hidden-touch">
        <b-icon :icon="isAsideExpanded ? 'backburger' : 'forwardburger'"/>
      </a>
      <a class="navbar-item is-hidden-desktop" @click.prevent="asideMobileStateToggle">
        <b-icon :icon="isAsideMobileExpanded ? 'backburger' : 'forwardburger'"/>
      </a>
<!--      <div class="navbar-item no-left-space">-->
<!--        <div class="control">-->
<!--          <input class="input" placeholder="Поиск по разделам...">-->
<!--        </div>-->
<!--      </div>-->
    </div>

    <div class="navbar-brand is-right">
      <a @click.prevent="asideRightToggle()"
         class="navbar-item navbar-item-menu-toggle is-hidden-desktop">
        <b-icon icon="bell" custom-size="default"/>
      </a>
      <a @click.prevent="menuNavBarToggle()"
         class="navbar-item navbar-item-menu-toggle is-hidden-desktop">
        <b-icon :icon="isMenuNavBarActive ? 'close' : 'dots-vertical'" custom-size="default"/>
      </a>
    </div>

    <div class="navbar-menu fadeIn animated faster" :class="{'is-active':isMenuNavBarActive}">
      <div class="navbar-end">
        <a @click="darkModeToggle()"
           class="navbar-item has-divider is-desktop-icon-only" title="Темная тема">
          <b-icon :icon="isDarkModeActive ? 'white-balance-sunny' : 'weather-night'"
                  custom-size="default"/>
          <span>Темная тема</span>
        </a>
        <router-link :to="{name: 'home'}" class="navbar-item has-divider is-desktop-icon-only">
          <b-icon icon="cog" custom-size="default"/>
          <span>Настройки</span>
        </router-link>
        <a @click="logout" class="navbar-item has-divider is-desktop-icon-only" title="Выход">
          <b-icon icon="logout" custom-size="default"/>
          <span>Выход</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import useAuth from '@/compositions/useAuth';

export default {
  name: 'HeaderBar',
  data () {
    return {
      isMenuNavBarActive: false
    };
  },
  computed: mapState([
    'isNavbarVisible',
    'isAsideExpanded',
    'isAsideMobileExpanded',
    'isAsideRightVisible',
    'isDarkModeActive'
  ]),
  methods: {
    logout () {
      this.authLogout();
      this.$router.push({ name: 'login' });
      this.$buefy.snackbar.open({ message: 'Logged out' });
    },

    menuNavBarToggle () {
      this.isMenuNavBarActive = !this.isMenuNavBarActive;
    },

    ...mapMutations([
      'asideStateToggle',
      'asideMobileStateToggle',
      'asideRightToggle',
      'darkModeToggle'
    ])
  },
  setup () {
    const { authLogout } = useAuth();

    return {
      authLogout
    };
  }
};
</script>

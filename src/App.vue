<template>
  <div>
    <header-bar/>
    <aside-left
        :menu="menu"
        :is-visible="isAsideVisible"
        :is-expanded="isAsideExpanded"
        :is-mobile-expanded="isAsideMobileExpanded"
        icon="gamepad-circle-up"/>
    <div>
      <router-view/>
    </div>
    <aside-right/>
    <footer-bar :is-visible="isFooterBarVisible"/>
    <page-overlay :is-visible="isOverlayVisible" @click="overlayClick"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import menu from '@/menu';
import AsideLeft from '@/components/AsideLeft';
import AsideRight from '@/components/AsideRight';
import FooterBar from '@/components/FooterBar';
import HeaderBar from '@/containers/HeaderBar';
import PageOverlay from '@/components/PageOverlay';

export default {
  name: 'App',
  components: {
    AsideLeft,
    AsideRight,
    FooterBar,
    HeaderBar,
    PageOverlay
  },
  computed: mapState([
    'isAsideVisible',
    'isAsideExpanded',
    'isAsideMobileExpanded',
    'isFooterBarVisible',
    'isOverlayVisible'
  ]),
  data () {
    return {
      menu
    };
  },
  methods: {
    overlayClick () {
      this.$store.commit('overlayToggle', false);
    }
  }
};
</script>

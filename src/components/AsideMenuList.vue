<template>
  <ul :class="{'menu-list':!isSubmenuList}">
    <template v-for="(item,index) in menu">
      <aside-menu-item
          @menu-click="menuClick"
          :is-secondary="isSecondary"
          :item="item"
          :key="index"/>
    </template>
  </ul>
</template>

<script>
import AsideMenuItem from '@/components/AsideMenuItem';

export default {
  name: 'AsideMenuList',
  components: {
    AsideMenuItem
  },
  props: {
    isSubmenuList: {
      type: Boolean,
      default: false
    },
    isSecondary: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    menuClick (item) {
      this.$emit('menu-click', item);
    }
  }
};
</script>

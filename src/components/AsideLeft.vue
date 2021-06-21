<template>
  <aside
      v-show="isVisible"
      :class="{'is-expanded': isExpanded || isSecondary, 'is-secondary': isSecondary}"
      class="aside is-placed-left">
    <aside-tools :has-close="isSecondary" :icon="icon" @close="$emit('close')">
      <span v-if="!isSecondary">
        <b v-if="isExpanded || isMobileExpanded">
          Admin
        </b>
      </span>
      <span v-else-if="label">
        {{ label }}
      </span>
    </aside-tools>

    <div ref="menuContainer" @mouseenter="scrollUpdate" class="menu-container">
      <div class="menu is-menu-main" >
        <template v-for="(element, idx) in menu" >
          <p v-if="typeof element === 'string'" :key="idx" class="menu-label">
            {{ element }}
          </p>
          <aside-menu-list
            v-else
            :key="idx"
            :is-secondary="isSecondary"
            :menu="element"
            @menu-click="$emit('menu-click', $event)"/>
        </template>
      </div>
    </div>
  </aside>
</template>

<script>
import AsideTools from '@/components/AsideTools'
import scrollHandle from '@/mixins/scrollHandle'

export default {
  name: 'AsideLeft',
  mixins: [
    scrollHandle
  ],
  components: {
    AsideTools
  },
  props: {
    isVisible: Boolean,
    isExpanded: Boolean,
    isMobileExpanded: Boolean,
    menu: {
      type: Array,
      default: () => []
    },
    isSecondary: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    }
  },
  mounted () {
    this.scrollInit(this.$refs.menuContainer);
  }
}
</script>

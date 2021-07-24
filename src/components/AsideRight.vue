<template>
  <aside class="aside is-placed-right">
    <div ref="container" @mouseenter="scrollUpdate" class="aside-container">
      <aside-updates @data-updated="scrollInit($refs.container)"/>
    </div>
  </aside>
</template>

<script>
import AsideUpdates from '@/components/AsideUpdates';
import useScrollbar from '@/compositions/useScrollbar';

export default {
  name: 'AsideRight',
  components: {
    AsideUpdates
  },
  setup () {
    return {
      ...useScrollbar()
    };
  }
};
</script>

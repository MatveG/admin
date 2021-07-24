<template>
  <card-toolbar slot="toolbar" class="is-upper">

  </card-toolbar>
</template>

<script>
import CardToolbar from '@/components/CardToolbar';

export default {
  name: 'SettingsToolbar',
  components: {
    CardToolbar
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>

</style>

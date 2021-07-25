<template>
  <card-toolbar slot="toolbar" class="is-upper">
    <div slot="left" class="buttons has-addons">
      <b-button :type="{'is-info is-light' : !!toggled.is_active}" @click="toggle('is_active')">
        Активные
      </b-button>
    </div>
    <div slot="right">
      <b-button
          v-if="canCreate"
          :to="{ name: 'document.create' }"
          tag="router-link"
          type="is-primary"
          icon-right="plus-circle"
          target="_blank"/>
    </div>
  </card-toolbar>
</template>

<script>
import CardToolbar from '@/components/CardToolbar';

export default {
  name: 'DocumentsToolbar',
  components: {
    CardToolbar
  },
  props: {
    canCreate: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      toggled: {
        is_active: false
      }
    };
  },
  methods: {
    toggle (name) {
      this.toggled[name] = !this.toggled[name];
      this.$emit('toggle', name);
    }
  }
};
</script>

<style scoped>

</style>

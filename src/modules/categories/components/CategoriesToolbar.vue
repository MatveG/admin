<template>
  <card-toolbar slot="toolbar" class="is-upper">
    <div slot="left" class="buttons has-addons">
      <b-button :type="{'is-info is-light' : !!toggled.is_active}" @click="toggle('is_active')">
        Активные
      </b-button>
    </div>
    <div slot="right">
      <b-button type="is-primary" icon-right="plus-circle"
                tag="router-link" :to="{ name: 'categories.create' }" target="_blank"/>
    </div>
  </card-toolbar>
</template>

<script>
import CardToolbar from '@/components/CardToolbar'

export default {
  name: 'CategoriesToolbar',
  components: {
    CardToolbar
  },
  data () {
    return {
      toggled: {
        is_active: false,
        is_stock: false
      }
    }
  },
  methods: {
    toggle (name) {
      this.toggled[name] = !this.toggled[name];
      this.$emit('toggle', name);
    }
  }
}
</script>

<style scoped>

</style>

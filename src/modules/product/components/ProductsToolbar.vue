<template>
  <card-toolbar slot="toolbar" class="is-upper">
    <div slot="left" class="buttons has-addons">
      <b-button :type="{'is-info is-light' : !!toggled.is_active}" @click="toggle('is_active')">
        Активные
      </b-button>
      <b-button :type="{'is-info is-light' : !!toggled.is_stock}" @click="toggle('is_stock')">
        В наличии
      </b-button>
    </div>
    <div slot="right">
      <b-button :to="{ name: 'product.create' }" tag="router-link"
                type="is-primary" icon-right="plus-circle" target="_blank"/>
    </div>
  </card-toolbar>
</template>

<script>
import CardToolbar from '@/components/CardToolbar'

export default {
  name: 'ProductsToolbar',
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

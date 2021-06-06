<template>
  <card-toolbar slot="toolbar" class="is-upper">
    <div slot="left" class="buttons has-addons">
      <b-button :type="{'is-info is-light' : toggled.is_active}" @click="toggle('is_active')">
        Активные
      </b-button>

      <b-button :type="{'is-info is-light' : toggled.is_stock}" @click="toggle('is_stock')">
        В наличии
      </b-button>
    </div>
    <div slot="right">
      <b-button type="is-primary" icon-right="plus-circle" @click="goCreate"/>
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
  props: {
    toggled: Object,
    toggle: Function,
    goCreate: Function
  }
}
</script>

<style scoped>

</style>

<template>
  <card-component title="Реквизиты доставки" icon="map-marker-outline">
    <template v-for="(address, idx) in Object.entries(order.address)">
      <b-field  :key="idx" :label="address[0]" label-position="on-border">
        <b-input v-model="order.address[address[0]]"></b-input>
      </b-field>
    </template>
    <div class="has-text-centered">
      <b-button @click="$emit('clickAdd')" type="is-primary" size="is-small" label="Добавить"/>
    </div>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'OrderAddress',
  components: {
    CardComponent
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="control has-icons-right">
    <b-input v-model.number="product.features[feature.key]" type="number" step="any"/>
    <span class="icon is-right is-bold has-text-black">{{ feature.units }}</span>
  </div>
</template>

<script>
export default {
  name: 'FeatureNumber',
  props: {
    product: {
      type: Object,
      required: true
    },
    feature: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>

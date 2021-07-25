<template>
  <b-input v-model="product.features[feature.key]"/>
</template>

<script>
export default {
  name: 'FeatureString',
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
};
</script>

<style scoped>

</style>

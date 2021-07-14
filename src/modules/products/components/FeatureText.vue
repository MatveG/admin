<template>
  <b-input v-model="product.features[feature.key]" type="textarea" maxlength="15000"/>
</template>

<script>
export default {
  name: 'FeatureText',
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

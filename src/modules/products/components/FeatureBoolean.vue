<template>
  <b-select v-model="product.features[feature.key]" expanded>
    <option :value="null">выберите</option>
    <option :value="1">есть</option>
    <option :value="0">нет</option>
  </b-select>
</template>

<script>
export default {
  name: 'FeatureBoolean',
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

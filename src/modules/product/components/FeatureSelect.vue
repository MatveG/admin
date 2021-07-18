<template>
  <b-select v-model="product.features[feature.key]" expanded>
    <option :value="null">выберите</option>
    <option v-for="(value, idx) in feature.values" :key="idx">
      {{ value }}
    </option>
  </b-select>
</template>

<script>
export default {
  name: 'FeatureSelect',
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

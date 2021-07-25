<template>
  <b-select
      multiple expanded
      v-model="product.features[feature.key]"
      :init="!product.features[feature.key] ? product.features[feature.key] = [] : true"
      :native-size="feature.values.length > 5 ? 5 : feature.values.length">
    <option v-for="(value, idx) in feature.values" :key="idx">
      {{ value }}
    </option>
  </b-select>
</template>

<script>
export default {
  name: 'FeatureMultiple',
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

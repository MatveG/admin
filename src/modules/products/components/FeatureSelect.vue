<template>
  <b-select v-model="model.features[feature.key]" expanded>
    <option :value="null">выберите</option>
    <option v-for="(value, idx) in feature.values" :key="idx">
      {{ value }}
    </option>
  </b-select>
</template>

<script>
import useModelBinding from '@/hooks/useModelBinding'

export default {
  name: 'FeatureSelect',
  props: {
    value: {
      type: Object,
      required: true
    },
    feature: {
      type: Object,
      required: true
    }
  },
  setup (props, context) {
    const { model } = useModelBinding(props, context);
    return { model };
  }
}
</script>

<style scoped>

</style>

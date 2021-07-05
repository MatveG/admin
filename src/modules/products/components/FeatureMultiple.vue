<template>
  <b-select
      multiple expanded
      v-model="model.features[feature.key]"
      :init="!model.features[feature.key] ? model.features[feature.key] = [] : true"
      :native-size="feature.values.length > 5 ? 5 : feature.values.length">
    <option v-for="(value, idx) in feature.values" :key="idx">
      {{ value }}
    </option>
  </b-select>
</template>

<script>
import useModelBinding from '@/hooks/useModelBinding'

export default {
  name: 'FeatureMultiple',
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

<template>
  <b-select v-model="model.features[feature.key]" expanded>
    <option :value="null">выберите</option>
    <option :value="1">есть</option>
    <option :value="0">нет</option>
  </b-select>
</template>

<script>
import useModelBinding from '@/hooks/useModelBinding'

export default {
  name: 'FeatureBoolean',
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
